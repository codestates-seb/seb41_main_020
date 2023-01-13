package codestates.frogroup.indiego.domain.member.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.enums.ProfileImage;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.redis.RedisDao;
import codestates.frogroup.indiego.global.security.auth.dto.TokenDto;
import codestates.frogroup.indiego.global.security.auth.jwt.TokenProvider;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthUserProfile;
import codestates.frogroup.indiego.global.security.auth.userdetails.AuthMember;
import codestates.frogroup.indiego.global.security.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
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
    private final TokenProvider tokenProvider;
    private final RedisDao redisDao;

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

    public void reissueAccessToken(String refreshToken, HttpServletRequest request, HttpServletResponse response){

        if(refreshToken == null){
            throw new BusinessLogicException(ExceptionCode.COOKIE_REFRESH_TOKEN_NOT_FOUND);
        }

        String accessToken = tokenProvider.resolveToken(request);
        String redisAccessToken = redisDao.getValues(refreshToken);

        // Refresh Token이 Redis에 존재할 경우 Access Token 생성
        if(redisDao.validateValue(redisAccessToken) && accessToken.equals(redisAccessToken)){
            log.info("# RefreshToken을 통한 AccessToken 재발급 시작");
            Claims claims = tokenProvider.parseClaims(refreshToken); // Refresh Token 복호화
            String email = claims.get("sub", String.class); // Refresh Token에서 email정보 가져오기
            Member member = findVerifiedMember(email); // DB에서 사용자 정보 찾기
            AuthMember authMember = AuthMember.of(member.getId(), member.getEmail(), member.getRoles());
            TokenDto tokenDto = tokenProvider.generateTokenDto(authMember); // Token 만들기
            int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
            redisDao.setValues(refreshToken, tokenDto.getAccessToken(), Duration.ofMinutes(refreshTokenExpirationMinutes));
            tokenProvider.accessTokenSetHeader(tokenDto.getAccessToken(),response);

        } else if(!redisDao.validateValue(redisAccessToken)){
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_FOUND);
        } else {
            throw new BusinessLogicException(ExceptionCode.TOKEN_IS_NOT_SAME);
        }
    }
}
