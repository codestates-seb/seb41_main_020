package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.mapper.ShowReservationMapper;
import codestates.frogroup.indiego.domain.show.mapper.ShowReservationMapperImpl;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.repository.ShowReservationRepository;
import codestates.frogroup.indiego.domain.show.service.ShowReservationService;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/shows/reservations")
@Valid
@RequiredArgsConstructor
public class ShowReservationController {
    private final ShowReservationRepository showReservationRepository;

    private final ShowReservationMapper mapper;
    private final ShowReservationService showReservationService;
    private final ShowService showService;


    @PostMapping("/{show-id}")
    public ResponseEntity postReservation(@Valid @RequestBody ShowReservationDto.Post post,
                                          @PathVariable("show-id") long showId){
        Show show = showService.findShow(showId);
        Member member = showReservationService.getCurrentMember();

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
        return LocalDate.now().isAfter(date);
    }


    @DeleteMapping("/{reservation-id}")
    public ResponseEntity deleteReservation(@PathVariable("reservation-id") long reservationId){
        showReservationRepository.deleteById(reservationId);
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
