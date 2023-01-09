package codestates.frogroup.indiego.domain.member.entity;

import codestates.frogroup.indiego.domain.common.auditing.BaseTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


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
    private Profile profile;

}
