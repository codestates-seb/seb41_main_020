package codestates.frogroup.indiego.domain.show.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class ShowReservationDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Post{
        @NotNull
        private LocalDate date;

        @NotNull
        private Integer ticketCount;
    }


    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private Long id;
        private String title;
        private String nickname;
        private LocalDate date;
        private String address;
        private Integer ticketCount;
        private boolean isExpired;
    }
}
