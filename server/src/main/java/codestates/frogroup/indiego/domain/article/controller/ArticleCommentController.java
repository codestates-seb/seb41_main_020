package codestates.frogroup.indiego.domain.article.controller;

import codestates.frogroup.indiego.domain.article.entity.dto.ArticleCommentDto;
import codestates.frogroup.indiego.domain.article.service.ArticleCommentService;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/articles/{article-id}/comments")
@RequiredArgsConstructor
public class ArticleCommentController {

    private final ArticleCommentService articleCommentService;
    // TODO: 임시용 추후 삭제
    private final MemberRepository memberRepository;

    /**
     * 댓글 작성
     */
    @PostMapping
    public ResponseEntity postArticleComment(@PathVariable("article-id") Long articleId,
                                             @LoginMemberId Long memberId,
                                             @Valid @RequestBody ArticleCommentDto.Post articleCommentPostDto) {


        ArticleCommentDto.Response response =
                articleCommentService.createArticleComment(articleId, memberId, articleCommentPostDto);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 댓글 수정
     */
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchArticleComment(@PathVariable("article-id") Long articleId,
                                              @PathVariable("comment-id") Long commentId,
                                              @LoginMemberId Long memberId,
                                              @Valid @RequestBody ArticleCommentDto.Patch articleCommentPatchDto) {


        ArticleCommentDto.Response response =
                articleCommentService.updateArticleComment(articleId, commentId, memberId, articleCommentPatchDto);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteArticleComment(@PathVariable("article-id") Long articleId,
                                               @PathVariable("comment-id") Long commentId,
                                               @LoginMemberId Long memberId) {

        articleCommentService.deleteArticleComment(articleId, commentId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 댓글 좋아요
     */
    @PutMapping("/{comment-id}")
    public ResponseEntity articleCommentLike(@PathVariable("article-id") Long articleId,
                                             @PathVariable("comment-id") Long commentId,
                                             @LoginMemberId Long memberId) {


        articleCommentService.articleCommentLike(articleId, commentId, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
