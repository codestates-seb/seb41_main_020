package codestates.frogroup.indiego.domain.member.controller;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.mapper.MemberMapper;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.stub.StubData;
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
    public ResponseEntity postMember(){

//        Member member = memberMapper.memberPostDtoToMember(memberPostDto);
//        Member saveMember = memberService.createMember(member);
//        MemberDto.PostResponse postResponse = memberMapper.memberToPostResponse(saveMember);

        StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(stubData.getMemberPostResponse()), HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(){

//        Member verifiedMember = memberService.findVerifiedMember(memberId);
//        MemberDto.GetResponse getResponse = memberMapper.memberToGetResponse(verifiedMember);

        StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(stubData.getMemberPostResponse()), HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}/mypage")
    public ResponseEntity getMyMember(@Positive @PathVariable("member-id") Long memberId){

         StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(stubData.getMemberPostResponse()), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(){
//        memberPatchDto.setMemberId(memberId); // TODO: 리펙토링하기 좋은 위치를 선별하고싶다!
//        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto);
//
//        Member updateMember = memberService.updateMember(member,memberId);
//        MemberDto.PatchResponse patchResponse = memberMapper.memberToPatchResponse(updateMember);

        StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(stubData.getMemberPatchResponse()), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(){
//        memberService.deleteMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>("회원탈퇴가 완료되었습니다"), HttpStatus.CREATED);
    }


}
