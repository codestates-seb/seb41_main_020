package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowListResponseDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.mapper.ShowMapper;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.PagelessMultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.fileupload.AwsS3Path;
import codestates.frogroup.indiego.global.fileupload.AwsS3Service;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.util.*;

@Slf4j
@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowController {

    private final ShowService showService;
    private final MemberService memberService;
    private final ShowMapper mapper;
    private final AwsS3Service awsS3Service;


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

    @PostMapping("/uploads")
    public ResponseEntity uploadProfileImage(@RequestParam MultipartFile file,
                                             @LoginMemberId Long loginMemberId){
        memberService.findVerifiedMember(loginMemberId);
        String url = awsS3Service.StoreImage(file, AwsS3Path.SHOWS);
        return new ResponseEntity<>(new SingleResponseDto<>(url), HttpStatus.CREATED);
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
                                  @RequestParam(required = false) String start,
                                  @RequestParam(required = false) String end,
                                  @PageableDefault(page = 1, size = 12) Pageable pageable){

        Page<ShowListResponseDto> responses = showService.findShows(search, category, address, filter, start, end, pageable);

        return new ResponseEntity<>(new MultiResponseDto<>(responses.getContent(), responses), HttpStatus.OK);
    }

    @GetMapping("/{show-id}")
    public ResponseEntity getShow(@PathVariable("show-id") long showId){
        Show findedShow = showService.findShow(showId);
        ShowDto.Response response = mapper.showToShowResponse(findedShow);
        return new ResponseEntity(
                new SingleResponseDto<>(response),
                HttpStatus.OK);

    }

    @GetMapping("/sorts")
    public ResponseEntity getSortShows(@RequestParam(required = false) String address,
                                       @RequestParam String status) {

        List<ShowListResponseDto> responses = showService.findSortShows(address, status);

        return new ResponseEntity<>(new PagelessMultiResponseDto<>(responses), HttpStatus.OK);
    }

    @GetMapping("/location")
    public ResponseEntity getLocationShows(@RequestParam("address") String address){
        List<Show> shows = showService.findShows(address);
        List<ShowDto.ShowsResponse> showsResponses = mapper.showsToShowsResponse(shows);
        int total = showsResponses.size();
        return new ResponseEntity(new SingleResponseDto<>(new ShowDto.LocationResponse(total,showsResponses)),
                HttpStatus.OK);
    }

    @GetMapping("/marker")
    public ResponseEntity getMonthMarker(@Positive @RequestParam("year") Integer year,
                                         @Positive @RequestParam("month") Integer month){

       int[] hasShow = showService.findMarkerShows(year, month);

        return new ResponseEntity(new SingleResponseDto<>(hasShow), HttpStatus.OK);
    }

    @GetMapping("/dates")
    public ResponseEntity getCalendarList(@Positive @RequestParam("year") Integer year,
                                          @Positive @RequestParam("month") Integer month,
                                          @Positive @RequestParam("day") Integer day){
        List<Show> shows = showService.findCalendarShows(year, month, day);
        List<ShowDto.ShowsResponse> showsResponses = mapper.showsToShowsResponse(shows);

        return new ResponseEntity(new SingleResponseDto<>(showsResponses), HttpStatus.OK);
    }

}
