package codestates.frogroup.indiego.helper;

import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.dto.MemberDto;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.Profile;
import codestates.frogroup.indiego.global.security.auth.dto.LoginDto;

public class StubData {

    public static class MockMember{
        public static Member getMember(){
            return new Member(
                    1L,
                    "hgd123456@naver.com",
                    "ghdrlfehd1234!",
                     getProfile(),
                    "PERFORMER",
                     getCoordinate()
            );
        }
        public static Profile getProfile(){
            return new Profile(
                    "홍길동",
                    "종로구",
                    "https://indiego-fileupload.s3.ap-northeast-2.amazonaws.com/profileimage/basic/0916395d-1e05-42d2-b50b-2fa5d58aa45e.jpg",
                    "홍길동 입니다!"
            );
        }
        public static Coordinate getCoordinate(){
            return new Coordinate(
                    37.58481899015186,
                    127.00088309891716
            );
        }

        public static MemberDto.Post getMemberPost(){
            Member member = getMember();
            return new MemberDto.Post(
                    member.getEmail(),
                    member.getPassword(),
                    member.getProfile().getNickname(),
                    member.getRoles().get(0));
        }

        public static LoginDto getMemberLogin(){
            Member member = getMember();
            return new LoginDto(
                    member.getEmail(),
                    member.getPassword()
            );
        }

        public static MemberDto.Patch getMemberPatch(){
            Member member = getMember();
            return new MemberDto.Patch(
                    member.getProfile().getNickname(),
                    member.getProfile().getAddress(),
                    member.getProfile().getImage(),
                    member.getProfile().getIntroduction(),
                    member.getCoordinate().getLatitude(),
                    member.getCoordinate().getLongitude()
            );
        }

    }



}
