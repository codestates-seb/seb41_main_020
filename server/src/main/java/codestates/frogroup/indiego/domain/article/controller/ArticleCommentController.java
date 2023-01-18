package codestates.frogroup.indiego.domain.article.controller;

import codestates.frogroup.indiego.domain.article.entity.dto.ArticleCommentDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/articles/{article-id}/comments")
@RequiredArgsConstructor
public class ArticleCommentController {


    /**
     * 댓글 작성
     */
    @PostMapping
    public ResponseEntity postArticleComment() {

        StubData stubData = new StubData();
        ArticleCommentDto.Response response = stubData.getArticleCommentResponse();

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * 댓글 수정
     */
    @PatchMapping("/{id}")
    public ResponseEntity patchArticleComment() {

        StubData stubData = new StubData();
        ArticleCommentDto.Response response = stubData.getArticleCommentResponse();

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity deleteArticleComment() {

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 댓글 좋아요
     */
    @PutMapping("/{id}")
    public ResponseEntity articleCommentLike() {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
