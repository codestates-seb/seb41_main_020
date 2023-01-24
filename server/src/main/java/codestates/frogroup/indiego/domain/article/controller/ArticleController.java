package codestates.frogroup.indiego.domain.article.controller;

import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleMapper;
import codestates.frogroup.indiego.domain.article.service.ArticleService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.PagelessMultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Objects;

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
                                      @LoginMemberId Long memberId) {

        Article article = mapper.articlePostToArticle(articlePostDto);
        ArticleDto.Response response = articleService.createArticle(article, memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 게시글 수정
     */
    @PatchMapping("/{article-id}")
    public ResponseEntity patchArticle(@Positive @PathVariable("article-id") Long articleId,
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
    public ResponseEntity getArticles(@RequestParam(required = false) String category,
                                      @RequestParam(required = false) String search,
                                      @RequestParam(required = false) String status,
                                      @PageableDefault(page = 1) Pageable pageable) {

        log.info("conditionIsNull?={}", Objects.isNull(category));
        Page<ArticleListResponseDto> responses = articleService.findArticles(category, search, status, pageable);

        return new ResponseEntity<>(new MultiResponseDto<>(responses.getContent(), responses), HttpStatus.OK);
    }

    /**
     * 인기 게시글 조회
     */
    @GetMapping("/populars")
    public ResponseEntity getPopularArticles(@RequestParam String category) {

        List<ArticleListResponseDto> responses = articleService.findPopularArticles(category);

        return new ResponseEntity<>(new PagelessMultiResponseDto<>(responses), HttpStatus.OK);
    }

    /**
     * 게시글 단일 조회
     */
    @GetMapping("/{article-id}")
    public ResponseEntity getArticle(@Positive @PathVariable("article-id") Long articleId) {

//        articleService.updateView(articleId);
        ArticleDto.Response response = articleService.findArticle(articleId);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{article-id}")
    public ResponseEntity deleteArticle(@Positive @PathVariable("article-id") Long articleId,
                                        @LoginMemberId Long memberId) {

        articleService.deleteArticle(articleId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 게시글 좋아요
     */
    @PutMapping("/{article-id}")
    public ResponseEntity articleLike(@Positive @PathVariable("article-id") Long articleId,
                                      @LoginMemberId Long memberId) {

        HttpStatus httpStatus = articleService.articleLike(articleId, memberId);

        return new ResponseEntity<>(httpStatus);
    }

    /**
     * 이미지 업로드
     */
    @PostMapping("/uploads")
    public ResponseEntity postArticleImage(@RequestParam MultipartFile file, @LoginMemberId Long memberId) {

        String url = articleService.uploadArticleImage(file, memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(url), HttpStatus.OK);
    }

}
