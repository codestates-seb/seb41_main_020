package codestates.frogroup.indiego.global.security.config;

import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.global.security.auth.filter.JwtAuthenticationFilter;
import codestates.frogroup.indiego.global.security.auth.filter.JwtVerificationFilter;
import codestates.frogroup.indiego.global.security.auth.handler.*;
import codestates.frogroup.indiego.global.security.auth.jwt.TokenProvider;
import codestates.frogroup.indiego.global.security.auth.oauth.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
//@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
	private final TokenProvider tokenProvider;
	private final OAuthService oAuthService;
	private final MemberService memberService;

	//private final RefreshTokenRepository refreshTokenRepository;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.headers().frameOptions().sameOrigin()
				.and()
				.csrf().disable()
				.cors().configurationSource(corsConfigurationSource())
				.and()
				.formLogin().disable()
				.httpBasic().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
				.exceptionHandling()
				.authenticationEntryPoint(new MemberAuthenticationEntryPoint())
				.accessDeniedHandler(new MemberAccessDeniedHandler())
				.and()
				.apply(new CustomFilterConfigurer())
				.and()
				.authorizeHttpRequests(authorize -> authorize
						// .antMatchers(HttpMethod.GET, "/api/**").permitAll()
						// .antMatchers(HttpMethod.POST, "/api/user").hasRole("USER")
						// .antMatchers(HttpMethod.POST, "/api/admin").hasRole("ADMIN")
						.anyRequest().permitAll())
				.oauth2Login(oauth2 -> oauth2
						.successHandler(new OAuth2MemberSuccessHandler(tokenProvider,memberService))
						.userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정 담당
						.userService(oAuthService)
				); // OAuth2 로그인 설정 시작점
		return http.build();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000","http://localhost:8080"));
		configuration.setAllowCredentials(true);
		configuration.addExposedHeader("Authorization");
		configuration.addAllowedHeader("*");
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	private class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

		@Override
		public void configure(HttpSecurity builder) throws Exception {
			AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

			JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, tokenProvider);
			jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
			jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler()); // 추후 refreshTokenRepository 넣기
			jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

			JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(tokenProvider);

			builder
					.addFilter(jwtAuthenticationFilter)
					.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
		}
	}
}