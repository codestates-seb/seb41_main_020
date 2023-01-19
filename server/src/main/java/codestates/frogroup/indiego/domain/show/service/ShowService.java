package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.dto.ShowListResponseDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.Show.ShowStatus;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Show> utils;



    @Transactional
    public Show createShow(Show show, long memberId) {

        // ToDo security 적용 시 수정 -> getCurrentMember
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        show.setMember(member);

        return showRepository.save(show);
    }

    @Transactional
    public Show updateShow(Show show, long memberId) {
        Show findShow = findVerifiedShow(show.getId());

        // ToDo security 적용 시 수정 -> getCurrentMember
        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

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

    public Show findShow(long showId){
        return findVerifiedShow(showId);
    }

    public Page<ShowListResponseDto> findShows(String search, String category, String address, String filter,
                                               String start, String end, Pageable pageable){

        pageable = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize());

        return showRepository.findAllByShowSearch(search, category, address, filter, start, end, pageable);
    }

    public List<ShowListResponseDto> findSortShows(String address, String status) {

        return showRepository.findShowScoreOrCreatedAtDesc(address, status);
    }

    private void findVerifiedShows(List<Show> shows) {
        if(shows == null){
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
