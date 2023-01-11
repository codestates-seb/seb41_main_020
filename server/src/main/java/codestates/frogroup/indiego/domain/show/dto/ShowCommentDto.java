package codestates.frogroup.indiego.domain.show.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class ShowCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private Long id;
        private Double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Patch{
        private Long id;
        private Double score;
        private String comment;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long id;
        private Double score;
        private String comment;
    }
}
