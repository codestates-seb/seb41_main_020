package codestates.frogroup.indiego.domain.member.entity.dto;


import codestates.frogroup.indiego.domain.member.entity.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        @Email
        private String email;
        @Pattern(message = "'숫자', '문자' 무조건 1개 이상, '최소 8자에서 최대 20자' 허용, !@#$%^&* 특수문자만 허용",
                regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,20}$")
        private String password;
        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String nickname;
        @NotBlank(message = "권한은 공백이 아니어야 합니다.")
        private String role;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        private String nickname;
        private String address;
        private String image;
        private String introduction;

    }

    @Getter
    @AllArgsConstructor
    public static class GetResponse {
        private Long id;
        private String email;
        private List<String> roles;
        private List<Profile> profile;

        @Builder
        public GetResponse(Long id, String email, List<String> roles, Profile profile){
            this.id = id;
            this.email = email;
            this.roles = roles;
            this.profile = List.of(profile);
        }
    }

    @Getter
    @AllArgsConstructor
    public static class PostResponse {
        private Long id;
        private String email;
        private String nickname;
        private List<String> roles;
    }

    @Getter
    @AllArgsConstructor
    public static class PatchResponse {
        private String nickname;
        private String address;
        private String image;
        private String introduction;
    }

}
