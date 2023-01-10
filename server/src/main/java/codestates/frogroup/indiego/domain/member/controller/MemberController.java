package codestates.frogroup.indiego.domain.member.controller;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.mapper.MemberMapper;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.dto.SingleResponseDto;
import codestates.frogroup.indiego.global.security.auth.loginresolver.LoginMemberId;
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

        // StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(postResponse), HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("member-id") Long memberId){

        Member verifiedMember = memberService.findVerifiedMember(memberId);
        MemberDto.GetResponse getResponse = memberMapper.memberToGetResponse(verifiedMember);

        // StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(getResponse), HttpStatus.CREATED);
    }

    @GetMapping("/{member-id}/mypage") // TODO: 배포판 프로젝트 StubData 넣어서 추가할것
    public ResponseEntity getMyMember(@Positive @PathVariable("member-id") Long memberId,
                                      @LoginMemberId Long loginMemberId){

        Member verifiedMember = memberService.verifiedMemberId(memberId, loginMemberId);
        MemberDto.GetResponse getResponse = memberMapper.memberToGetResponse(verifiedMember);

        // StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(getResponse), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@RequestBody MemberDto.Patch memberPatchDto,
                                      @Positive @PathVariable("member-id") Long memberId ){

        Member member = memberMapper.memberPatchDtoToMember(memberPatchDto);

        Member updateMember = memberService.updateMember(member,memberId);
        MemberDto.PatchResponse patchResponse = memberMapper.memberToPatchResponse(updateMember);

        // StubData stubData = new StubData();
        return new ResponseEntity<>(new SingleResponseDto<>(patchResponse), HttpStatus.CREATED);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId){
//        memberService.deleteMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>("회원탈퇴가 완료되었습니다"), HttpStatus.CREATED);
    }
}
