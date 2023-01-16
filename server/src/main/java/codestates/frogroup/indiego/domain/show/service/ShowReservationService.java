package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.repository.ShowReservationRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowReservationService {
    private final ShowReservationRepository showReservationRepository;
    private final MemberService memberService;

    private final MemberRepository memberRepository;
    private final CustomBeanUtils<ShowReservation> utils;


    @Transactional
    public ShowReservation createReservation(ShowReservation reservation) {
        return showReservationRepository.save(reservation);
    }

    @Transactional
    public void deleteShow(Long id) {

        ShowReservation reservation = findVerifiedReservation(id);
        showReservationRepository.delete(reservation);

    }
//
//    public Page<Article> findShow(Pageable pageable) {
//        return null;
//    }
//
    private ShowReservation findVerifiedReservation(Long id) {
        Optional<ShowReservation> optionalShow = showReservationRepository.findById(id);

        ShowReservation findShow =
                optionalShow.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND));
        return findShow;

    }

}
