package codestates.frogroup.indiego.domain.show.dto;

import lombok.*;

public class ShowReservationDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Post{
        private Integer ticketCount;
    }

//    @Getter
//    @AllArgsConstructor
//    @NoArgsConstructor
//    @Builder
//    public static class Patch{
//        private Long id;
//        private Integer ticketCount;
//    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private Long id;

        private Long showId;

        private Integer ticketCount;

        private boolean isExpired;
    }
}
