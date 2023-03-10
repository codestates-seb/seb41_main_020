package codestates.frogroup.indiego.global.security.auth.handler;

import codestates.frogroup.indiego.config.AES128Config;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.redis.RedisDao;
import codestates.frogroup.indiego.global.security.auth.dto.TokenDto;
import codestates.frogroup.indiego.global.security.auth.jwt.TokenProvider;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthAttributes;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthCustomUser;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthUserProfile;
import codestates.frogroup.indiego.global.security.auth.userdetails.AuthMember;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StreamUtils;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@AllArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final MemberService memberService;
    private final RedisDao redisDao;
    private final AES128Config aes128Config;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authResult) throws IOException, ServletException {

        // OAuth2User oAuth2User = (DefaultOAuth2User) authResult.getPrincipal(); // ?????? ????????? ???????????????!!
        OAuthCustomUser oAuthCustomUser = (OAuthCustomUser) authResult.getPrincipal();
        Map<String, Object> attributes = oAuthCustomUser.getAttributes();
        String registrationId = oAuthCustomUser.getName();
        List<GrantedAuthority> authorities = (List<GrantedAuthority>) oAuthCustomUser.getAuthorities();

        List<String> roles = authorities.stream()
                .map(authority -> {
                    return authority.getAuthority().substring(5);
                })
                .collect(Collectors.toList());

        OAuthUserProfile oAuthUserProfile = OAuthAttributes.extract(registrationId, attributes); // OAuth2Profile ??????
        Member member = memberService.createOauth2Member(oAuthUserProfile, roles); // DB??? ????????? ?????? ?????? (????????? 1:N ???????????? ??????)
        AuthMember authMember = AuthMember.of(member);

        log.info("# OAuth2.0 AuthenticationSuccess !");

        TokenDto tokenDto = tokenProvider.generateTokenDto(authMember);
        String accessToken = tokenDto.getAccessToken(); // accessToken ?????????
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken ?????????

        log.info("# OAuth2.0 Token generated complete!");

        // ?????????????????? ???????????? ???????????? ?????????
        redirect(request,response,accessToken,refreshToken);
    }

    private void redirect(HttpServletRequest request,
                          HttpServletResponse response,
                          String accessToken,
                          String refreshToken) throws IOException {

        // ?????? ????????? ????????? AccessToken, Refresh Token??? ??????
        // Token??? ????????? URI??? ???????????? String?????? ??????
        String secretRefreshToken = aes128Config.encryptAes(refreshToken);
        String uri = createURI(request, accessToken, secretRefreshToken).toString();

        // tokenProvider.accessTokenSetHeader(accessToken, response); // Access Token ????????? ??????
        // tokenProvider.refreshTokenSetHeader(secretRefreshToken,response); // Refresh Token ????????? ??????
        int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
        redisDao.setValues(refreshToken,accessToken, Duration.ofMinutes(refreshTokenExpirationMinutes)); // redis ??????

        // ?????? URI??? ??????????????? ??????
        getRedirectStrategy().sendRedirect(request,response,uri);
    }

    private URI createURI(HttpServletRequest request, String accessToken, String secretRefreshToken){
        // ?????????????????? JWT??? URI??? ????????? ??????
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", secretRefreshToken);

        // String serverName = request.getServerName();
        // log.info("# serverName = {}",serverName);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("indiego.site")
                //.host("localhost")
                .port(80) // ?????? ????????? 80?????? ????????? ?????????
                .path("/token")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
