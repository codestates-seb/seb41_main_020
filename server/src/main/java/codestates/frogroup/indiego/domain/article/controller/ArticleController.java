package codestates.frogroup.indiego.domain.article.controller;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.mapper.ArticleMapper;
import codestates.frogroup.indiego.domain.article.service.ArticleService;
import codestates.frogroup.indiego.domain.article.service.ArticleServiceImpl;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.PageInfo;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleServiceImpl articleService;
    private final ArticleMapper mapper;
    // TODO: 임시용 추후 삭제
    private final MemberRepository memberRepository;

    /**
     * 게시글 작성
     */
    @PostMapping
    public ResponseEntity postArticle() {

        // TODO: 임시용 추후 삭제
        StubData stubData = new StubData();
        ArticleDto.Response response = stubData.getArticlePostResponse();


        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 게시글 수정
     */
    @PatchMapping("/{id}")
    public ResponseEntity patchArticle() {

        // TODO: 임시용 추후 삭제
        StubData stubData = new StubData();

        ArticleDto.Response response = stubData.getArticleResponse();

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
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
     * 게시글 상세 조회
     */
    @GetMapping("/{id}")
    public ResponseEntity getArticle() {

        StubData stubData = new StubData();

        ArticleDto.Response response = stubData.getArticleResponse();

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity deleteArticle() {

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 게시글 좋아요
     */
    @PutMapping("/{id}")
    public ResponseEntity articleLike() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
