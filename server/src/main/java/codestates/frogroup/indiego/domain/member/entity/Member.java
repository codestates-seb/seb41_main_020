package codestates.frogroup.indiego.domain.member.entity;

import codestates.frogroup.indiego.domain.common.auditing.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, unique = true, updatable = false, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Embedded
    @Setter
    private Profile profile;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Builder
    public Member(Long id, String email, String password, Profile profile, String roles){
        this.id = id;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.roles.add(roles);
    }

    public void setPassword(String encryptedPassword){
        this.password = encryptedPassword;
    }

    public void setRoles(List<String> roles){
        this.roles = roles;
    }

    public Member oauthUpdate(String name, String email, List<String> roles) {
        this.profile.setNickname(name);
        this.email = email;
        this.roles = roles;
        return this;
    }

}
