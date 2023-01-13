package codestates.frogroup.indiego.global.security.auth.filter;


import codestates.frogroup.indiego.global.redis.RedisDao;
import codestates.frogroup.indiego.global.security.auth.dto.LoginDto;
import codestates.frogroup.indiego.global.security.auth.dto.TokenDto;
import codestates.frogroup.indiego.global.security.auth.jwt.TokenProvider;
import codestates.frogroup.indiego.global.security.auth.userdetails.AuthMember;
import codestates.frogroup.indiego.global.security.auth.utils.Responder;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final RedisDao redisDao;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, TokenProvider tokenProvider, RedisDao redisDao) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.redisDao = redisDao;
    }

    /*
     * Spring Security의 인증처리에서 토큰 생성부분을 가로채서 만듬.
     * 인증 위임을 해당 메서드가 오버라이딩해서 대신 객체를 전달해줌
     * */
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class); // ServletInputSteam을 LoginDto 클래스 객체로 역직렬화 (즉, JSON 객체꺼냄)
        log.info("# attemptAuthentication : loginDto.getEmail={}, login.getPassword={}",loginDto.getEmail(),loginDto.getPassword());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws ServletException, IOException {

        AuthMember authMember = (AuthMember) authResult.getPrincipal();
        TokenDto tokenDto = tokenProvider.generateTokenDto(authMember);
        String accessToken = tokenDto.getAccessToken(); // accessToken 만들기
        String refreshToken = tokenDto.getRefreshToken(); // refreshToken 만들기

        tokenProvider.accessTokenSetHeader(accessToken,response); // AccessToken Header response 생성
        //tokenProvider.refreshTokenSetHeader(refreshToken,response); // RefreshToken Header response 생성
        tokenProvider.refreshTokenSetCookie(refreshToken,response); // RefreshToken Cookie로 설정
        Responder.loginSuccessResponse(response,authMember); // login 완료시 Response 응답 만들기

        // 로그인 성공시 Refresh Token Redis 저장 ( key = Refresh Token / value = Access Token )
        int refreshTokenExpirationMinutes = tokenProvider.getRefreshTokenExpirationMinutes();
        redisDao.setValues(refreshToken,accessToken, Duration.ofMinutes(refreshTokenExpirationMinutes));

        this.getSuccessHandler().onAuthenticationSuccess(request,response,authResult);
    }
}
