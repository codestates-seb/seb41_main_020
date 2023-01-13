package codestates.frogroup.indiego.domain.article.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.ArticleLike;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleMapper;
import codestates.frogroup.indiego.domain.article.repository.ArticleLikeRepository;
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

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleLikeRepository articleLikeRepository;
    private final ArticleMapper mapper;
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Article> beanUtils;

    /**
     * 게시글 작성
     */
    @Transactional
    public ArticleDto.Response createArticle(Article article, Long memberId) {

        Member member = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        article.setMember(member);

        Article savedArticle = articleRepository.save(article);

        return getResponse(savedArticle);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public ArticleDto.Response updateArticle(Article article, Long articleId, Long memberId) {

        Article findArticle = findVerifiedArticle(articleId);

        if (findArticle.getMember().getId().equals(memberId)) {

            changeArticle(article, findArticle);
//            Article updateArticle = beanUtils.copyNonNullProperties(article, findArticle);

            Article savedArticle = articleRepository.save(findArticle);
            return getResponse(savedArticle);
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }

    /**
     * 게시글 전체 조회
     */
    public Page<Article> findArticles(Pageable pageable) {
        return null;
    }

    /**
     * 게시글 단일 조회
     * TODO: 게시글 조회는 읽기만 하고 조회수를 증가시키는 방법은 없을까?
     */
    public ArticleDto.Response findArticle(Long articleId) {
        Article findArticle = findVerifiedArticle(articleId);
//        updateView(articleId);
//        findArticle.updateView();

        return getResponse(findArticle);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteArticle(Long articleId, Long memberId) {
        Long findMemberId = findVerifiedArticle(articleId).getMember().getId();

        if (findMemberId.equals(memberId)) {

            articleRepository.delete(findVerifiedArticle(articleId));
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }

    /**
     * 게시글 좋아요
     */
    @Transactional
    public void articleLike(Long articleId, Long memberId) {
        Article findArticle = findVerifiedArticle(articleId);
        Member findMember = memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        ArticleLike findArticleLike = articleLikeRepository.findByMemberId(findArticle.getId());

        if (findArticleLike == null) {
            articleLikeRepository.save(
                    ArticleLike.builder()
                            .article(findArticle)
                            .member(findMember)
                            .build());
        } else {
            articleLikeRepository.delete(findArticleLike);
        }
    }

    /**
     * Response 처리 메서드
     */
    private ArticleDto.Response getResponse(Article article) {

        log.info("nickname = {}, image = {}", article.getMember().getProfile().getNickname(),
                article.getMember().getProfile().getImage());

        ArticleDto.Response response = mapper.articleToArticleResponse(article);
        List<ArticleLike> articleLikes = articleLikeRepository.findAllByArticleId(article.getId());

        if (articleLikes.isEmpty()) {
            response.setLikeCount(0);
        } else {
            response.setLikeCount(articleLikes.size());
        }

        return response;
    }

    /**
     * 조회수 증가
     */
    @Transactional
    public void updateView(Long articleId) {
        findVerifiedArticle(articleId).updateView();
//        return articleRepository.updateView(articleId);
    }

    /**
     * 게시글 조회 검증
     */
    private Article findVerifiedArticle(Long articleId) {

        return articleRepository.findById(articleId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    /**
     * 게시글 수정 메서드
     */
    private static void changeArticle(Article article, Article findArticle) {

        Optional.ofNullable(article.getBoard().getTitle())
                .ifPresent(title -> findArticle.getBoard().setTitle(title));

        Optional.ofNullable(article.getBoard().getContent())
                .ifPresent(content -> findArticle.getBoard().setContent(content));

        Optional.ofNullable(article.getBoard().getImage())
                .ifPresent(image -> findArticle.getBoard().setImage(image));

        Optional.ofNullable(article.getBoard().getCategory())
                .ifPresent(category -> findArticle.getBoard().setCategory(category));

    }

}
