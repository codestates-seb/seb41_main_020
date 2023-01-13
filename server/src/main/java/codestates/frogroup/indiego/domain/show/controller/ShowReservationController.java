package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
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

import java.util.List;


@RestController
@RequestMapping("/shows/reservations")
@Valid
@RequiredArgsConstructor
public class ShowReservationController {
    private final ShowReservationRepository showReservationRepository;

    private final ShowReservationMapperImpl mapper;
    private final ShowReservationService showReservationService;
    private final ShowService showService;
    @PostMapping("/{show-id}")
    public ResponseEntity postReservation(@Valid @RequestBody ShowReservationDto.Post post,
                                          @PathVariable("show-id") long showId){
        Show show = showService.findShow(showId);
        ShowReservation showReservation = mapper.showReservationPostToShowReservation(post);
        showReservation.setShow(show);
        ShowReservation created = showReservationService.createReservation(showReservation);
        return new ResponseEntity<>(
                mapper.showToShowReservationResponse(created), HttpStatus.CREATED
        );
    }

//    @PatchMapping
//    public ResponseEntity patchReservation(@Valid @RequestBody ShowReservationDto.Post post,
//                                          @PathVariable("show-id") long showId){
//        Show show = showService.findShow(showId);
//        ShowReservation showReservation = mapper.show(post);
//        showReservation.setShow(show);
//        ShowReservation created = showReservationService.createReservation(showReservation);
//        return new ResponseEntity<>(
//                stubData.getPatchShowReservationResponse(), HttpStatus.OK
//        );
//    }

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
        return new ResponseEntity(
                new SingleResponseDto<>(mapper.showsReservationsToShowResvationResponses(showReservationList)),
                HttpStatus.OK);

    }
}
