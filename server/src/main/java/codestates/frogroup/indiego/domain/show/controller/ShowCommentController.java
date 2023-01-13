package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.dto.ShowCommentDto;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.mapper.ShowCommentMapperImpl;
import codestates.frogroup.indiego.domain.show.repository.ShowCommentRepository;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.service.ShowCommentService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowCommentController {

    private final ShowCommentRepository showCommentRepository;
    private final ShowCommentService showCommentService;
    private final ShowCommentMapperImpl mapper;


    @PostMapping("/{show-id}/comments")
    public ResponseEntity postComment(@PathVariable("show-id") Long ShowId,
                                      @Valid @RequestBody ShowCommentDto.Post showPostDto){
        StubData stubData = new StubData();
        return new ResponseEntity<>(
                stubData.getShowCommentResponse(), HttpStatus.CREATED
        );
    }

    @PatchMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity patchComments(@PathVariable("show-id") Long showId,
                                        @PathVariable("coment-id") Long commentId,
                                        @Valid @RequestBody ShowCommentDto.Response response){
        StubData stubData = new StubData();
        return new ResponseEntity<>(
                stubData.getPatchShowCommentResponse(), HttpStatus.OK
        );
    }

    @DeleteMapping("/{show-id}/comments/{comment-id}")
    public ResponseEntity deleteREservation(@PathVariable("show-id") long showId){
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
