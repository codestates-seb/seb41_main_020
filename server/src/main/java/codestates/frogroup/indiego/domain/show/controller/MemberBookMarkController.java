package codestates.frogroup.indiego.domain.show.controller;

import codestates.frogroup.indiego.domain.member.entity.MemberBookMark;
import codestates.frogroup.indiego.domain.show.service.MemberBookMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/shows")
@Valid
@RequiredArgsConstructor
public class MemberBookMarkController {
    private final MemberBookMarkService bookMarkService;
    @PutMapping("/{show-id}")
    public ResponseEntity putBookMark(@PathVariable("show-id") long showId){
        HttpStatus httpStatus = bookMarkService.manageBookMark(showId);
        return new ResponseEntity<>(
                httpStatus
        );
    }
}
