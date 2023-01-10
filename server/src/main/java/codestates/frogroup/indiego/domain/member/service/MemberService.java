package codestates.frogroup.indiego.domain.member.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.enums.ProfileImage;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthUserProfile;
import codestates.frogroup.indiego.global.security.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword); // TODO: Security 활성화시 주석해제

        List<String> roles = authorityUtils.createRoles(member.getRoles().get(0));
        member.setRoles(roles);
        // member.setRoles(member.getRoles()); // TODO: Security 활성화시 삭제 포인트
        createProfileImage(member);

        return memberRepository.save(member);
    }

    // OAuth2 인증 완료후 회원가입 및 업데이트
    public Member createOauth2Member(OAuthUserProfile userProfile, List<String> roles) {
        Member member = memberRepository.findByEmail(userProfile.getEmail())
                .map(m -> m.oauthUpdate(userProfile.getName(), userProfile.getEmail(), roles)) // 변경감지 Update
                .orElse(userProfile.createOauth2Member(userProfile.getName(), userProfile.getEmail(),roles));
        return memberRepository.save(member);
    }

    public Member updateMember(Member member, Long memberId) {
        Member findMember = findVerifiedMember(memberId);

        return beanUtils.copyNonNullProperties(member, findMember); // TODO: 사용 방법 알 필요가있음
    }

    public void deleteMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member verifiedMemberId(Long memberId, Long loginMemberId){

        log.info("memberId = {}, loginMemberId = {}",memberId,loginMemberId);
        if(memberId.longValue() != loginMemberId.longValue()){
            log.info("너 왜안들어와?");
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_NOT_SAME);
        }
        return findVerifiedMember(memberId);
    }

    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Member findVerifiedMember(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }


    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    public ProfileImage createProfileImage(Member member){
        ProfileImage[] randomImageList = ProfileImage.values();
        Long profileImageIndex = Long.valueOf((int) (Math.random()*10)+1 % randomImageList.length);

        List<ProfileImage> profileImageList = Arrays.stream(randomImageList)
                .filter(image -> image.getIndex() == profileImageIndex)
                .collect(Collectors.toList());

        ProfileImage profileImage = profileImageList.get(0);
        member.getProfile().setImage(profileImage.getUrl());
        return profileImage;
    }
}
