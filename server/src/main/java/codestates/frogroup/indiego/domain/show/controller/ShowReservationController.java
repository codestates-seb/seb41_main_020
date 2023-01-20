package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.mapper.ShowReservationMapper;
import codestates.frogroup.indiego.domain.show.repository.ShowReservationRepository;
import codestates.frogroup.indiego.domain.show.service.ShowReservationService;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/shows/reservations")
@Valid
@RequiredArgsConstructor
public class ShowReservationController {
    private final ShowReservationRepository showReservationRepository;
    private final ShowReservationMapper mapper;
    private final ShowReservationService showReservationService;
    private final ShowService showService;
    private final MemberService memberService;


    @PostMapping("/{show-id}")
    public ResponseEntity postReservation(@Valid @RequestBody ShowReservationDto.Post post,
                                          @PathVariable("show-id") Long showId,
                                          @LoginMemberId Long memberId){
        Show show = showService.findShow(showId);
        Member member = memberService.findVerifiedMember(memberId);

        //ToDo 리팩토링
        ShowReservation showReservation = new ShowReservation();
        showReservation.setDate(post.getDate());
        showReservation.setMember(member);
        showReservation.setShow(show);
        showReservation.setTicketCount(post.getTicketCount());
        ShowReservation created = showReservationService.createReservation(showReservation);

        ShowReservationDto.Response response = mapper.showReservationToShowReservationResponse(created);
        response.setExpired(isExpired(post.getDate()));
        return new ResponseEntity<>(
                response
                , HttpStatus.CREATED
        );
    }

    public boolean isExpired(LocalDate date){
        LocalDate now = LocalDate.now();
        return now.isBefore(date);
    }


    @DeleteMapping("/{reservation-id}")
    public ResponseEntity deleteReservation(@PathVariable("reservation-id") long reservationId){
        showReservationService.deleteShow(reservationId);
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }


    @GetMapping
    public ResponseEntity getShows(){
        java.util.List<ShowReservation> showReservationList =showReservationRepository.findAll();
        List<ShowReservationDto.Response> responses = mapper.showsReservationsToShowResvationResponses(showReservationList);
        return new ResponseEntity(
                new SingleResponseDto<>(setExpireds(showReservationList, responses)),
                HttpStatus.OK);

    }

    private List<ShowReservationDto.Response> setExpireds(List<ShowReservation> showReservationList, List<ShowReservationDto.Response> responses) {
        for(int i = 0; i< responses.size(); i++){
            responses.get(i)
                    .setExpired(isExpired(
                            showReservationList.get(i).getDate()));
        }
        return responses;
    }
}
