package codestates.frogroup.indiego.domain.member.controller;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.mapper.MemberMapper;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto){

        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
        Member saveMember = memberService.createMember(member);
        MemberDto.PostResponse postResponse = memberMapper.memberToPostResponse(saveMember);

        return new ResponseEntity<>(new SingleResponseDto<>(postResponse), HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("member-id") Long memberId){

        return new ResponseEntity<>(new SingleResponseDto<>("임시"), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@RequestBody MemberDto.Patch memberPatchDto,
                                      @Positive @PathVariable("member-id") Long memberId ){

        return new ResponseEntity<>(new SingleResponseDto<>("임시"), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId){

        return new ResponseEntity<>(new SingleResponseDto<>("회원탈퇴가 완료되었습니다"), HttpStatus.CREATED);
    }


}
