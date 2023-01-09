package codestates.frogroup.indiego.domain.member.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.enums.ProfileImage;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    // private final PasswordEncoder passwordEncoder; // TODO: Security 활성화시 주석해제

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        // String encryptedPassword = passwordEncoder.encode(member.getPassword()); // TODO: Security 활성화시 주석해제
        // member.setPassword(encryptedPassword); // TODO: Security 활성화시 주석해제

        // List<String> roles = authorityUtils.createRoles(member.getEmail()); // TODO: Security 활성화시 주석해제
        // member.setRoles(roles); // TODO: Security 활성화시 주석해제
        member.setRoles(member.getRoles()); // TODO: Security 활성화시 삭제 포인트
        createProfileImage(member);

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getId());
        Member updatedMember = beanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
    }

    public void deleteMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
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
