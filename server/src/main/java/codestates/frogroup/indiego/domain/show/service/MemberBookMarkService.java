package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.MemberBookMark;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.repository.MemberBookMarkRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberBookMarkService {
    private final MemberRepository memberRepository;
    private final ShowService showService;
    private final MemberBookMarkRepository memberBookMarkRepository;
    public HttpStatus manageBookMark(Long showId){
        Member member = getCurrentMember();

        if( memberBookMarkRepository.findByShowIdAndMemberId(showId, member.getId()) != null){
            return deleteBookMark(showId, member.getId());
        }else{
            return createMemberBookMark(showId, member);
        }
    }

    public HttpStatus createMemberBookMark(Long showId, Member member){
        Show show = showService.findShow(showId);
        MemberBookMark memberBookMark = MemberBookMark.builder()
                .member(member)
                .show(show)
                .build();
        memberBookMarkRepository.save(memberBookMark);
        return HttpStatus.CREATED;
    }

    public HttpStatus deleteBookMark(Long showId, Long memberId){
        MemberBookMark memberBookMark = findVerifiedBookMark(showId, memberId);
        memberBookMarkRepository.delete(memberBookMark);
        return HttpStatus.NO_CONTENT;
    }


    public Member getCurrentMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("GUEST"))
            throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);

        Optional<Member> optionalMember = memberRepository.findByEmail(authentication.getName());
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return member;
    }

    private MemberBookMark findVerifiedBookMark(Long showId, Long memberId) {
        Optional<MemberBookMark> optionalBookMark = Optional.ofNullable(memberBookMarkRepository.findByShowIdAndMemberId(showId, memberId));

        MemberBookMark findBookMark =
                optionalBookMark.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.BOOKMARK_NOT_FOUND));
        return findBookMark;

    }
}
