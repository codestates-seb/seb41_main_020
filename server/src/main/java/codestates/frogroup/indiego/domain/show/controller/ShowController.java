package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.entity.Member;
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
import codestates.frogroup.indiego.global.redis.RedisDao;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/seller")
    public ResponseEntity getShowsOfSeller(@PageableDefault(page = 1, size = 3) Pageable pageable,
                                           @AuthenticationPrincipal Member member){
        Page<Show> showPage = showService.findShowOfSeller(member.getId(), pageable);
        List<Show> shows = showPage.getContent();

        //Rssponse List생성해서 맵퍼 사용해서 데이터넣기
        //세터로 잔여좌석수, 현재 수익, 만료 여부 셋팅
        List<ShowDto.showListToShowListResponseOfSeller> response= new ArrayList<>();
        for(int i=0; i<shows.size(); i++){
            ShowDto.showListToShowListResponseOfSeller responseOfSeller =
                    ShowDto.showListToShowListResponseOfSeller.builder()
                        .id(shows.get(i).getId())
                        .title(shows.get(i).getShowBoard().getBoard().getTitle())
                        .nickname(shows.get(i).getMember().getProfile().getNickname())
                        .image(shows.get(i).getShowBoard().getBoard().getImage())
                        .detailAddress(shows.get(i).getShowBoard().getDetailAddress())
                        .showAt(shows.get(i).getShowBoard().getShowAt())
                        .expiredAt(shows.get(i).getShowBoard().getExpiredAt())
                    .build();

            responseOfSeller.setEmptySeats(showService.getEmptySeats(shows.get(i).getId()));
            responseOfSeller.setRevenue(showService.getRevenue(shows.get(i).getId()));

            if(responseOfSeller.getEmptySeats().equals(0)){
                responseOfSeller.setExpired(true);
            }else{
                responseOfSeller.setExpired(false);
            }

            response.add(responseOfSeller);
        }

        return new ResponseEntity(
                new SingleResponseDto<>(response), HttpStatus.OK);
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

    @GetMapping("/maps")
    public ResponseEntity getMaps(){

        List<ShowDto.ShowMapsResponse> showMapsResponses = new ArrayList<>();
        ShowDto.ShowMapsResponse sr1 = new ShowDto.ShowMapsResponse();
        sr1.setTitle("공연 1입니다.");
        sr1.setAddress("서울특별시 중구 소공동 세종대로18길 2");
        sr1.setLatitude(37.556D);
        sr1.setLongitude(126.9723D);
        sr1.setDate(LocalDate.now());
        sr1.setImg("https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286");

        ShowDto.ShowMapsResponse sr2 = new ShowDto.ShowMapsResponse();
        sr2.setTitle("공연 2입니다.");
        sr2.setAddress("서울특별시 용산구 한강대로23길");
        sr2.setLatitude(37.52985D);
        sr2.setLongitude(126.96481D);
        sr2.setDate(LocalDate.now());
        sr2.setImg("https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286");

        ShowDto.ShowMapsResponse sr3 = new ShowDto.ShowMapsResponse();
        sr3.setTitle("공연 3입니다.");
        sr3.setAddress("서울 구로구 구로중앙로 174 구로역");
        sr3.setLatitude(37.503408D);
        sr3.setLongitude(126.88391D);
        sr3.setDate(LocalDate.now());
        sr3.setImg("https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286");

        ShowDto.ShowMapsResponse sr4 = new ShowDto.ShowMapsResponse();
        sr4.setTitle("공연 4입니다.");
        sr4.setAddress("서울 강남구 강남대로 396");
        sr4.setLatitude(37.398132D);
        sr4.setLongitude(127.027805D);
        sr4.setDate(LocalDate.now());
        sr4.setImg("https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286");

        ShowDto.ShowMapsResponse sr5 = new ShowDto.ShowMapsResponse();
        sr5.setTitle("공연 5입니다.");
        sr5.setAddress("서울 마포구 양화로 160 홍대입구역");
        sr5.setLatitude(37.557239D);
        sr5.setLongitude(126.9245D);
        sr5.setDate(LocalDate.now());
        sr5.setImg("https://dictionary.cambridge.org/ko/images/thumb/poster_noun_002_28550.jpg?version=5.0.286");

        showMapsResponses.add(sr1);
        showMapsResponses.add(sr2);
        showMapsResponses.add(sr3);
        showMapsResponses.add(sr4);
        showMapsResponses.add(sr5);

        return new ResponseEntity(new SingleResponseDto<>(showMapsResponses), HttpStatus.OK);
    }
}
