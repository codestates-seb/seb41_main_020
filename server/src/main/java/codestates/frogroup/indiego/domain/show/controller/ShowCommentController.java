package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.show.dto.ShowCommentDto;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowCommentController {

    StubData stubData = new StubData();

    @PostMapping("/{show-id}/comments")
    public ResponseEntity postComment(){
        return new ResponseEntity<>(
                stubData.getShowCommentResponse(), HttpStatus.CREATED
        );
    }

    @PatchMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity patchComments(){
        return new ResponseEntity<>(
                stubData.getPatchShowCommentResponse(), HttpStatus.OK
        );
    }

    @DeleteMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity deleteREservation(){
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("{show-id}/comments")
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("show-id") long showId
    ){
        StubData stubData = new StubData();

        return new ResponseEntity<>(
                stubData.getShowCommentsResponse(), HttpStatus.OK);
    }


}
