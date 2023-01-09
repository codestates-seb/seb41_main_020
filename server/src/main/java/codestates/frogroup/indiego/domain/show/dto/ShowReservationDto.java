package codestates.frogroup.indiego.domain.show.dto;

import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.show.entity.Show;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

public class ShowReservationDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private Long id;

        private ShowDto.Post show;

        private Integer ticketCount;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Patch{
        private Long id;

        private ShowDto.Patch show;

        private Integer ticketCount;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long id;

        private ShowDto.Response show;

        private Integer ticketCount;
    }
}
