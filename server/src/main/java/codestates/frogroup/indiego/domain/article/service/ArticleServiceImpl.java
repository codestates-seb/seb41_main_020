package codestates.frogroup.indiego.domain.article.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.repository.ArticleRepository;
import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final CustomBeanUtils utils;

    @Transactional
    public Article createArticle(Article article, Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        article.setMember(member);

        return articleRepository.save(article);
    }

//    @Transactional
//    public Article updateArticle(Article article, Long id) {
//
//
//
//        return Article;
//    }

    @Transactional
    public void deleteArticle(Long id) {

        Article findArticle = findVerifiedArticle(id);
        articleRepository.delete(findArticle);

    }

    /**
     * 게시글 전체 조회
     */
    public Page<Article> findArticles(Pageable pageable) {
        return null;
    }

    /**
     * 게시글 조회 검증
     */
    private Article findVerifiedArticle(Long id) {

        return articleRepository.findById(id).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

}
