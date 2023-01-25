package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowListResponseDto;
import codestates.frogroup.indiego.domain.show.dto.ShowMapsResponse;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.Show.ShowStatus;
import codestates.frogroup.indiego.domain.show.repository.ScoreRepository;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.redis.RedisDao;
import codestates.frogroup.indiego.global.redis.RedisKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.*;

//테스트해보고 페이지네이션 마저 작성
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowService {
    private final ShowRepository showRepository;
    private final MemberService memberService;
    private final CustomBeanUtils<Show> utils;
    private final ShowReservationService reservationService;
    private final ScoreRepository scoreRepository;
    private final RedisKey redisKey;

    @Transactional
    public Show createShow(Show show, long memberId) {

        Member member = memberService.findVerifiedMember(memberId);

        show.setMember(member);
        Show savedShow = showRepository.save(show);

        String key = redisKey.getScoreAvergeKey(show.getId());
        scoreRepository.setValues(key,"0");

        return savedShow;
    }

    @Transactional
    public Show updateShow(Show show, long memberId) {
        Show findShow = findVerifiedShow(show.getId());

        // ToDo security 적용 시 수정 -> getCurrentMember
        Member member = memberService.findVerifiedMember(memberId);

        Show updatedShow = utils.copyNonNullProperties(show, findShow);

        return updatedShow;
    }

    @Transactional
    public void deleteShow(Long id) {

        Show findShow = findVerifiedShow(id);
        showRepository.delete(findShow);

    }

    public List<Show> findShows(String address){
        List<Show> shows = showRepository.findByShowBoardAddressAndStatus(address, ShowStatus.SALE,
                Sort.by(Sort.Order.desc("createdAt")));
        findVerifiedShows(shows);
        return shows;
    }

    public int[] findMarkerShows(Integer year, Integer month){

        Integer day = getCalendarTotalDay(year, month);
        LocalDate startTime = LocalDate.of(year, month, 1);
        LocalDate endTime = LocalDate.of(year, month, day);

        List<Show> shows = showRepository.findAllByShowBoardShowAtBetweenAndStatus(startTime, endTime, ShowStatus.SALE,
                Sort.by(Sort.Order.asc("showBoard.showAt")));
        findVerifiedShows(shows);

        int[] hasShow = new int[shows.size()];
        for (int i=0; i<shows.size(); i++){
            String showAt = shows.get(i).getShowBoard().getShowAt().toString();
            hasShow[i] = Integer.parseInt(showAt.substring(showAt.length() - 2));
        }
        return Arrays.stream(hasShow).distinct().toArray();
    }

    public List<Show> findCalendarShows(Integer year, Integer month, Integer day){

        LocalDate startTime = LocalDate.of(year, month, day);
        LocalDate endTime = LocalDate.of(year, month, day);

        List<Show> shows = showRepository.findAllByShowBoardShowAtBetweenAndStatus(startTime, endTime, ShowStatus.SALE,
                Sort.by(Sort.Order.desc("createdAt")));
        findVerifiedShows(shows);
        return shows;
    }

    public List<ShowMapsResponse> findMapShows(Double x1, Double x2, Double y1, Double y2){
        List<ShowMapsResponse> showMapsResponse = showRepository.findAllByShowMapsSearch(x1, x2, y1, y2);
        findVerifiedMapShows(showMapsResponse);
        return showMapsResponse;
    }

    public List<ShowMapsResponse> findMapShows(String search, String filter){
        List<ShowMapsResponse> showMapsResponse = showRepository.findAllByShowMapsSearch(search, filter);
        findVerifiedMapShows(showMapsResponse);
        return showMapsResponse;
    }


    //판매자용 공연 조회
    public Page<Show> findShowOfSeller(Long memberId, Pageable pageable){

        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());

        return showRepository.findByMember_IdOrderByCreatedAtDesc(memberId, pageable);
    }

    public Integer getEmptySeats(Long showId){
        return (findShow(showId).getTotal() - reservationService.countReservation(showId));
    }

    public Integer getRevenue(Long showId){
        return reservationService.countReservation(showId) * findShow(showId).getShowBoard().getPrice();
    }

    public Show findShow(long showId){
        Show show = findVerifiedShow(showId);
        String key = redisKey.getScoreAvergeKey(showId);
        if(scoreRepository.getValues(key).equals("false")){
            scoreRepository.setValues(key, String.valueOf(show.getScoreAverage()));
        }else{
            Show show1 = new Show(showId,
                    show.getMember(),
                    show.getShowBoard(),
                    show.getCoordinate(),
                    show.getStatus(),
                    Double.valueOf(scoreRepository.getValues(key)),
                    show.getTotal()
                    );
            //show.setScoreAverage(); // 변경감지
            return show1;
        }

        return show;
    }

    @Transactional
    public Double setScoreAverage(long showId) {

        String key = redisKey.getScoreAvergeKey(showId);
        Show show = findShow(showId);
        scoreRepository.setValues(key, String.valueOf(show.getScoreAverage()));

        return Double.valueOf(Double.valueOf(scoreRepository.getValues(key)));
    }

    public Page<ShowListResponseDto> findShows(String search, String category, String address, String filter,
                                               String start, String end, Pageable pageable){

        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());

        Page<ShowListResponseDto> allByShowSearch = showRepository.findAllByShowSearch(search, category, address, filter, start, end, pageable);
        for(int i =0; i<allByShowSearch.getContent().size(); i++){
            ShowListResponseDto responseDto = allByShowSearch.getContent().get(i);
            responseDto.setScoreAverage(setScoreAverage(responseDto.getId()));
        }


        return allByShowSearch;

    }

    public List<ShowListResponseDto> findSortShows(String address, String status) {

        return showRepository.findShowScoreOrCreatedAtDesc(address, status);
    }

    private void findVerifiedShows(List<Show> shows) {
        if(shows == null){
            throw new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND);
        }
    }

    private void findVerifiedMapShows(List<ShowMapsResponse> showMapsResponse) {
        if(showMapsResponse == null){
            throw new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND);
        }
    }

    private Show findVerifiedShow(Long id) {
        Optional<Show> optionalShow = showRepository.findById(id);

        Show findShow =
                optionalShow.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND));
                return findShow;

    }

    private Integer getCalendarTotalDay(Integer year, Integer month){

        Integer day = null;

        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            day = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            day = 30;
        } else {
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                day = 29;
            } else {
                day = 28;
            }
        }
        return day;
    }


}
