package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.common.embedding.Board;
import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.Profile;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowBoard;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.global.dto.MultiResponseDto;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

@CrossOrigin
@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class ShowController {

    private final ShowRepository showRepository;

    //private final ShowService showService;

    StubData stubData = new StubData();

    @PostMapping
    public ResponseEntity postShow(){
//        ShowDto.Response response = new ShowDto.Response(showPostDto.getId(), showPostDto.getTitle(), showPostDto.getContent(),
//                showPostDto.getImage(), showPostDto.getCategory(),showPostDto.getPrice(),
//                showPostDto.getAddress(), showPostDto.getExpiredAt(), showPostDto.getShowAt(),
//                showPostDto.getDetailImage(), showPostDto.getLatitude(), showPostDto.getLongitude(),
//                showPostDto.getStatus(), showPostDto.getScoreAverage(), showPostDto.getTotal());

        return new ResponseEntity<>(
                stubData.postShowResponse(), HttpStatus.CREATED
        );
    }

    @PatchMapping ("/{show-id}")
    public ResponseEntity patchShow(){
        return new ResponseEntity<>(
                stubData.getPatchResponse(), HttpStatus.OK
        );
    }

    @DeleteMapping("/{show-id}")
    public ResponseEntity deleteShow(){
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }

    @GetMapping("/{show-id}")
    public ResponseEntity getShow(){
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
