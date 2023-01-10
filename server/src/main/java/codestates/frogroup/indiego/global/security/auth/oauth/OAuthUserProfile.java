package codestates.frogroup.indiego.global.security.auth.oauth;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.Profile;
import lombok.Getter;

import java.util.List;

@Getter
public class OAuthUserProfile {
    private final String name;
    private final String email;
    private final String oauthId;

    public OAuthUserProfile(String name, String email, String oauthId) {
        this.name = name;
        this.email = email;
        this.oauthId = oauthId;
    }

    public Member createOauth2Member(String name, String email, List<String> roles) {
        Profile profile = new Profile();
        profile.setNickname(name);

        return new Member(null,email,oauthId, profile, roles);
    }
}
