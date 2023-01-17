package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowListResponseDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.mapper.ShowMapper;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

    private final ShowService showService;
    private final ShowMapper mapper;


    @PostMapping
    public ResponseEntity postShow(@Valid @RequestBody ShowDto.Post showPostDto,
                                   @LoginMemberId Long memberId){

        Show show = mapper.showPostDtoToShow(showPostDto);
        Show createdShow = showService.createShow(show, memberId);
        ShowDto.postResponse response = mapper.showToShowPostResponse(createdShow);

        return new ResponseEntity<>(
                new SingleResponseDto(response)
                , HttpStatus.CREATED
        );
    }

    @PatchMapping ("/{show-id}")
    public ResponseEntity patchShow(@PathVariable("show-id") long showId,
                                    @Valid @RequestBody ShowDto.Patch showPatchDto,
                                    @LoginMemberId Long memberId){
        Show show = mapper.showPatchDtoToShow(showPatchDto);
        show.setId(showId);
        Show updatedShow = showService.updateShow(show, memberId);
        ShowDto.Response response = mapper.showToShowResponse(updatedShow);

        return new ResponseEntity<>(
                response, HttpStatus.OK
        );
    }

    @DeleteMapping("/{show-id}")
    public ResponseEntity deleteShow(@PathVariable("show-id") long showId){
        showService.deleteShow(showId);
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }


    @GetMapping
    public ResponseEntity getShow(@RequestParam(required = false) String search,
                                  @RequestParam(required = false) String category,
                                  @RequestParam(required = false) String address,
                                  @RequestParam(required = false) String filter,
                                  @RequestParam(required = false) LocalDate start,
                                  @RequestParam(required = false) LocalDate end,
                                  @PageableDefault(page = 1, size = 5) Pageable pageable){

        Page<ShowListResponseDto> responses = showService.findShows(search, category, address, filter, start, end, pageable);

        return new ResponseEntity<>(new MultiResponseDto<>(responses.getContent(), responses), HttpStatus.OK
        );
    }

    @GetMapping("/{show-id}")
    public ResponseEntity getShow(@PathVariable("show-id") long showId){
        Show findedShow = showService.findShow(showId);
        ShowDto.Response response = mapper.showToShowResponse(findedShow);
        return new ResponseEntity(
                new SingleResponseDto<>(response),
                HttpStatus.OK);

    }


}
