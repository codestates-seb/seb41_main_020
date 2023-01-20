package codestates.frogroup.indiego.domain.show.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

public class ShowCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotNull
        private double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Patch{
        @NotNull
        private double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long commentId;
        private Long showId; // 정희님에게 물어보기!!
        private Long memberId; // 정희님에게 물어보기!!
        private String nickname;
        private double score;
        private String comment;
    }
}
