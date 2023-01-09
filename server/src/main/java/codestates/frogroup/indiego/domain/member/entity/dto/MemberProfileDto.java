package codestates.frogroup.indiego.domain.member.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberProfileDto {
    private String nickname;
    private String address;
    private String image;
    private String introduction;
}
