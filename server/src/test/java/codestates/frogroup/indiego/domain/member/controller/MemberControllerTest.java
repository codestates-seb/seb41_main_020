package codestates.frogroup.indiego.domain.member.controller;


import codestates.frogroup.indiego.domain.member.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.global.security.auth.dto.LoginDto;
import codestates.frogroup.indiego.helper.MemberTestHelper;
import codestates.frogroup.indiego.helper.StubData;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Commit;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.util.UriComponentsBuilder;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;

@Slf4j
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
//@Commit // DB에 데이터를 남기려고할떄
public class MemberControllerTest implements MemberTestHelper {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("회원가입 API : postMember")
    void signUpMemberTest() throws Exception {

        MemberDto.Post post = StubData.MockMember.getMemberPost();
        String content = gson.toJson(post);

        ResultActions actions = mockMvc.perform(
                post(getResourceURI("signup"))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                );

        actions
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("로그인 API : login")
    void LoginMemberTest() throws Exception {
        Member saveMember = memberRepository.save(StubData.MockMember.getMember());
        makeSecretPassword(saveMember);

        LoginDto loginDto = StubData.MockMember.getMemberLogin();
        String content = gson.toJson(loginDto);

        ResultActions actions = mockMvc.perform(
                post(getResourceURI("login"))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        actions.andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원조회 API : getMember")
    void getMemberTest() throws Exception {

        Member member = memberRepository.save(StubData.MockMember.getMember());

        ResultActions actions = mockMvc.perform(
                get(getResourceURI(member.getId()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원조회(마이페이지) API : getMyMember")
    void getMyMemberTest() throws Exception {

        Member member = memberRepository.save(StubData.MockMember.getMember());
        String accessToken = getAccessTokenLogin(member);

        ResultActions actions = mockMvc.perform(
                get(getResourceURI(member.getId(),"mypage"))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", accessToken)
        );

        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원수정 API : patchMember")
    void patchMemberTest() throws Exception {

        Member member = memberRepository.save(StubData.MockMember.getMember());
        String accessToken = getAccessTokenLogin(member);

        MemberDto.Patch patch = StubData.MockMember.getMemberPatch();
        String content = gson.toJson(patch);

        ResultActions actions = mockMvc.perform(
                patch(getResourceURI(member.getId()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                        .header("Authorization", accessToken)
        );

        actions
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("회원삭제 API : deleteMember")
    void deleteMemberTest() throws Exception {

        Member member = memberRepository.save(StubData.MockMember.getMember());
        String accessToken = getAccessTokenLogin(member);

        ResultActions actions = mockMvc.perform(
                delete(getResourceURI(member.getId()))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", accessToken)
        );

        actions
                .andExpect(status().isNoContent());
    }


    /*
    * Header에서 Token 추출하는 메서드
    * 토큰이 필요한 메서드는 시작전 해당메서드 호출로 토큰을 얻을 수 있다.
    * */
    public String getAccessTokenLogin(Member member) throws Exception {
        makeSecretPassword(member);
        LoginDto loginDto = StubData.MockMember.getMemberLogin();
        String content = gson.toJson(loginDto);

        ResultActions actions = mockMvc.perform(
                post(getResourceURI("login"))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );
        MockHttpServletResponse response = actions.andReturn().getResponse();
        return response.getHeader("Authorization");
    }

    private void makeSecretPassword(Member member){
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);
    }
}
