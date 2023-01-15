package codestates.frogroup.indiego.domain.article.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.ArticleComment;
import codestates.frogroup.indiego.domain.article.entity.ArticleCommentLike;
import codestates.frogroup.indiego.domain.article.dto.ArticleCommentDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleCommentMapper;
import codestates.frogroup.indiego.domain.article.repository.ArticleCommentLikeRepository;
import codestates.frogroup.indiego.domain.article.repository.ArticleCommentRepository;
import codestates.frogroup.indiego.domain.article.repository.ArticleRepository;
import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleCommentService {

    private final ArticleCommentRepository articleCommentRepository;
    private final ArticleRepository articleRepository;
    private final MemberRepository memberRepository;
    private final ArticleCommentLikeRepository articleCommentLikeRepository;
    private final ArticleCommentMapper mapper;
    private final CustomBeanUtils<ArticleComment> beanUtils;

    /**
     * 게시글 댓글 작성
     */
    @Transactional
    public ArticleCommentDto.Response createArticleComment(Long articleId,
                                               Long memberId,
                                               ArticleCommentDto.Post articleCommentPostDto) {
        Article findArticle = findVerifiedArticle(articleId);
        Member findMember = findVerifiedMember(memberId);

        // mapper 활용 방법
        ArticleComment articleComment = mapper.articleCommentPostToArticleComment(articleCommentPostDto);
        articleComment.setArticle(findArticle);
        articleComment.setMember(findMember);

//      // builder 활용 방법
//        ArticleComment articleComment = ArticleComment.builder()
//                .member(findMember)
//                .article(findArticle)
//                .comment(articleCommentPostDto.getComment())
//                .build();

        ArticleComment savedArticleComment = articleCommentRepository.save(articleComment);

        return mapper.articleCommentToArticleCommentResponse(savedArticleComment);
    }

    /**
     * 게시글 댓글 수정
     */
    @Transactional
    public ArticleCommentDto.Response updateArticleComment(Long articleId,
                                                           Long articleCommentId,
                                                           Long memberId,
                                                           ArticleCommentDto.Patch articleCommentPatchDto) {

        findVerifiedArticle(articleId);
        ArticleComment findArticleComment = findVerifiedArticleComment(articleCommentId);

        if (findArticleComment.getMember().getId().equals(memberId)) {

            ArticleComment articleComment = mapper.articleCommentPatchToArticleComment(articleCommentPatchDto);
            ArticleComment updateArticleComment = beanUtils.copyNonNullProperties(articleComment, findArticleComment);
            ArticleComment savedArticleComment = articleCommentRepository.save(updateArticleComment);

            return mapper.articleCommentToArticleCommentResponse(savedArticleComment);
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }


    /**
     * 게시글 댓글 삭제
     */
    @Transactional
    public void deleteArticleComment(Long articleId, Long commentId, Long memberId) {
        findVerifiedArticle(articleId);
        ArticleComment findArticleComment = findVerifiedArticleComment(commentId);

        if (findArticleComment.getMember().getId().equals(memberId)) {

            articleCommentRepository.delete(findArticleComment);
        }

        throw new BusinessLogicException(ExceptionCode.MEMBER_NO_PERMISSION);
    }

    /**
     * 게시글 댓글 좋아요
     */
    @Transactional
    public void articleCommentLike(Long articleId, Long commentId, Long memberId) {

        findVerifiedArticle(articleId);
        ArticleComment findArticleComment = findVerifiedArticleComment(commentId);
        Member findMember = findVerifiedMember(memberId);

        ArticleCommentLike articleCommentLike = articleCommentLikeRepository.findByMemberId(findArticleComment.getId());

        if (articleCommentLike == null) {
            articleCommentLikeRepository.save(
                    ArticleCommentLike.builder()
                            .articleComment(findArticleComment)
                            .member(findMember)
                            .build());
        } else {
            articleCommentLikeRepository.delete(articleCommentLike);
        }

    }

    private ArticleComment findVerifiedArticleComment(Long articleCommentId) {
        return articleCommentRepository.findById(articleCommentId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private Member findVerifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private Article findVerifiedArticle(Long articleId) {

        return articleRepository.findById(articleId).orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

//    private ArticleCommentDto.Response getResponse(ArticleComment articleComment) {
//
//        ArticleCommentDto.Response response = mapper.articleCommentToArticleCommentResponse(articleComment);
//        List<ArticleCommentLike> articleCommentLikes =
//                articleCommentLikeRepository.findAllByArticleCommentId(articleComment.getId());
//
//        log.info("list<ArticleCommentLike> = {}", articleCommentLikes.toString());
//
//        if (articleCommentLikes.isEmpty()) {
//            response.setLikeCount(0);
//        } else {
//            response.setLikeCount(articleCommentLikes.size());
//        }
//
//        return response;
//    }

}
