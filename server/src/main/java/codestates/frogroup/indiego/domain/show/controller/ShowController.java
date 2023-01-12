package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.common.embedding.Board;
import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.Profile;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowBoard;
import codestates.frogroup.indiego.domain.show.mapper.ShowMapperImpl;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;


@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowController {

    private final ShowRepository showRepository;
    private final ShowService showService;
    private final ShowMapperImpl mapper;

    StubData stubData = new StubData();

    @PostMapping
    public ResponseEntity postShow(@Valid @RequestBody ShowDto.Post showPostDto){

        Show show = mapper.showPostDtoToShow(showPostDto);
        Show createdShow = showService.createShow(show, stubData.member.getId());
        ShowDto.postResponse response = mapper.showToShowPostResponse(createdShow);

        return new ResponseEntity<>(
                new SingleResponseDto(response)
                , HttpStatus.CREATED
        );
    }

    @PatchMapping ("/{show-id}")
    public ResponseEntity patchShow(@PathVariable("show-id") long showId,
    @Valid @RequestBody ShowDto.Patch showPatchDto){
        Show show = mapper.showPatchDtoToShow(showPatchDto);
        show.setId(showId);
        Show updatedShow = showService.updateShow(show, stubData.member.getId());
        ShowDto.Response response = mapper.showToShowResponse(updatedShow);

        return new ResponseEntity<>(
                response, HttpStatus.OK
        );
    }

    @DeleteMapping("/{show-id}")
    public ResponseEntity deleteShow(@PathVariable("show-id") long showId){
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/{show-id}")
    public ResponseEntity getShow(@PathVariable("location") String address,
                                  @PathVariable("date") String date,
                                  @PathVariable("title") String title,
                                  @PathVariable("page") int page,
                                  @PathVariable("size") int size){
        return new ResponseEntity<>(
                stubData.getShowResponse(), HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity getShows(){
        return new ResponseEntity(
                new SingleResponseDto<>(stubData.getShowResponse()),
                HttpStatus.OK);

    }
}
