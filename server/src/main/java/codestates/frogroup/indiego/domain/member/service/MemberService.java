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
        makeSecretPassword(member);
        createRoles(member);
        return memberRepository.save(member);
    }

    // OAuth2 인증 완료후 회원가입 및 업데이트
    public Member createOauth2Member(OAuthUserProfile userProfile, List<String> roles) {
        Member member = memberRepository.findByEmail(userProfile.getEmail())
                .map(m -> m.oauthUpdate(userProfile.getName(), userProfile.getEmail(),
                        userProfile.getImage(), roles)) // DB에 회원이 있을때
                .orElse(userProfile.createOauth2Member(userProfile.getName(),
                        userProfile.getEmail(), userProfile.getImage(), roles)); // DB에 회원이 없을때
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

    public void verifiedMemberId(Long memberId, Long loginMemberId){
        if(memberId.longValue() != loginMemberId.longValue()){
            log.info("memberId = {}, loginMemberId = {}",memberId,loginMemberId);
            throw new BusinessLogicException(ExceptionCode.MEMBER_IS_NOT_SAME);
        }
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

    public void makeSecretPassword(Member member){
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
    }
    public void createRoles(Member member){
        List<String> roles = authorityUtils.createRoles(member.getRoles().get(0));
        if(roles == null){
            throw new BusinessLogicException(ExceptionCode.MEMBER_ROLE_DOES_NOT_HAVE);
        }
        member.setRoles(roles);
        createProfileImage(member);
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
