package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/shows/reservations/{show-id}")
@Valid
@RequiredArgsConstructor
public class ShowReservationController {
    private final ShowRepository showRepository;

    //private final ShowService showService;

    StubData stubData = new StubData();

    @PostMapping
    public ResponseEntity postReservation(){
        return new ResponseEntity<>(
                stubData.getShowReservationResponse(), HttpStatus.CREATED
        );
    }

    @PatchMapping
    public ResponseEntity patchReservation(){
        return new ResponseEntity<>(
                stubData.getPatchShowReservationResponse(), HttpStatus.OK
        );
    }

    @DeleteMapping
    public ResponseEntity deleteREservation(){
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }


    @GetMapping
    public ResponseEntity getShows(){
        return new ResponseEntity(
                new SingleResponseDto<>(stubData.getShowReservationResponse()),
                HttpStatus.OK);

    }
}
