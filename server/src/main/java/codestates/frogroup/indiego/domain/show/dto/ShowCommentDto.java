package codestates.frogroup.indiego.domain.show.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ShowCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private Double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Patch{
        private Double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long commentId;
        private Long showId;
        private Long memberId;
        private String nickname;
        private Double score;
        private String comment;
    }
}
