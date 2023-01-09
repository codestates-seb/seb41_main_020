package codestates.frogroup.indiego.domain.member.mapper;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface MemberMapper {

    @Mapping(source = "nickname", target = "profile.nickname")
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);
    Member memberPatchDtoToMember(MemberDto.Patch memberPatchDto);

    @Mapping(source = "profile.nickname", target = "nickname")
    MemberDto.PostResponse memberToPostResponse(Member member);

}
