package codestates.frogroup.indiego.domain.article.controller;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleMapper;
import codestates.frogroup.indiego.domain.article.service.ArticleService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.PageInfo;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import codestates.frogroup.indiego.global.security.auth.userdetails.AuthMember;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final ArticleMapper mapper;

    /**
     * 게시글 작성
     */
    @PostMapping
    public ResponseEntity postArticle(@Valid @RequestBody ArticleDto.Post articlePostDto,
                                      @LoginMemberId Long memberId,
                                      @AuthenticationPrincipal AuthMember authMember) {

        Article article = mapper.articlePostToArticle(articlePostDto);
        ArticleDto.Response response = articleService.createArticle(article, memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 게시글 수정
     */
    @PatchMapping("/{article-id}")
    public ResponseEntity patchArticle(@PathVariable("article-id") Long articleId,
                                       @LoginMemberId Long memberId,
                                       @Valid @RequestBody ArticleDto.Patch articlePatchDto) {

        Article article = mapper.articlePatchToArticle(articlePatchDto);
        ArticleDto.Response response = articleService.updateArticle(article, articleId, memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 게시글 전체 조회
     */
    @GetMapping
    public ResponseEntity getArticles() {

        StubData stubData = new StubData();

        List<ArticleDto.Response> responses = List.of(
                stubData.getArticleResponse(),
                stubData.getArticleResponse(),
                stubData.getArticleResponse()
                );

        PageInfo pageInfo = new PageInfo(1, 15, 3L, 1);

        return new ResponseEntity<>(new MultiResponseDto<>(responses, (Page) pageInfo), HttpStatus.OK);
    }

    /**
     * 게시글 단일 조회
     */
    @GetMapping("/{article-id}")
    public ResponseEntity getArticle(@PathVariable("article-id") Long articleId) {

        articleService.updateView(articleId);
        ArticleDto.Response response = articleService.findArticle(articleId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{article-id}")
    public ResponseEntity deleteArticle(@PathVariable("article-id") Long articleId,
                                        @LoginMemberId Long memberId) {

        articleService.deleteArticle(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 게시글 좋아요
     */
    @PutMapping("/{article-id}")
    public ResponseEntity articleLike(@PathVariable("article-id") Long articleId,
                                      @LoginMemberId Long memberId) {

        articleService.articleLike(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
