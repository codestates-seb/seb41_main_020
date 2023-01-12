package codestates.frogroup.indiego.domain.article.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ArticleCommentDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private String comment;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        private Long id;

        private String comment;

    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long id;

        private Long articleId;

        private String nickname;

        private String image;

        private String comment;

        private Long likeCunt;

        private LocalDateTime createAt;

    }
}
