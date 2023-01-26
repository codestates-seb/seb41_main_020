package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.repository.ShowReservationRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowReservationService {
    private final ShowReservationRepository showReservationRepository;
    private final CustomBeanUtils<ShowReservation> utils;



    @Transactional
    public ShowReservation createReservation(ShowReservation reservation) {
        Show show = reservation.getShow();
        int numEmptySeats = getEmptySeats(show, show.getId());
        if(reservation.getTicketCount() > numEmptySeats){
            throw new BusinessLogicException(ExceptionCode.SHOW_RESERVATION_CREATE_FAIL);
        }
        return showReservationRepository.save(reservation);
    }

    public Integer getEmptySeats(Show show, Long showId){
        return (show.getTotal() - countReservation(showId));
    }

    @Transactional
    public void deleteShow(Long id) {

        ShowReservation reservation = findVerifiedReservation(id);
        showReservationRepository.delete(reservation);

    }

    public Optional<ShowReservation> findShowReservation(Long showId, Long memberId){
        return showReservationRepository.findByShowIdAndMemberId(showId, memberId);
    }

    public Integer countReservation(Long showId){
        List<ShowReservation> reservations = showReservationRepository.findByShowId(showId);
        Integer cnt = 0;
        for(int i=0; i<reservations.size(); i++){
            cnt += reservations.get(i).getTicketCount();
        }
        return cnt;
    }

    private ShowReservation findVerifiedReservation(Long id) {
        Optional<ShowReservation> optionalShow = showReservationRepository.findById(id);

        ShowReservation findShow =
                optionalShow.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND));
        return findShow;

    }

    public ShowReservation getShowReservation(ShowReservationDto.Post post, Show show, Member member) {
        ShowReservation showReservation = new ShowReservation();
        showReservation.setDate(post.getDate());
        showReservation.setMember(member);
        showReservation.setShow(show);
        showReservation.setTicketCount(post.getTicketCount());
        ShowReservation created = createReservation(showReservation);
        return created;
    }

}
