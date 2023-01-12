package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.repository.ArticleRepository;
import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
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
    public Show createShow(Show show, Long memberId) {

        // ToDo security 적용 시 수정 -> getCurrentMember
        //Member member = memberRepository.findById(memberId).orElseThrow(
        //        () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        StubData stubData = new StubData();
        Member member = stubData.member;
        memberRepository.save(member);
        show.setMember(member);

        return showRepository.save(show);
    }

    @Transactional
    public Show updateShow(Show show, Long memberId) {
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

    public Page<Article> findShow(Pageable pageable) {
        return null;
    }

    private Show findVerifiedShow(Long id) {
        Optional<Show> optionalShow = showRepository.findById(id);

        Show findShow =
                optionalShow.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.SHOW_NOT_FOUND));
                return findShow;

    }
}
