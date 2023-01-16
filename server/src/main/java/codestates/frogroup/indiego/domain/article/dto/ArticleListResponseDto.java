package codestates.frogroup.indiego.domain.article.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ArticleListResponseDto {

    private Long id;

    private String nickname;

    private String title;

    private String content;

    private String category;

    private String image;

    private long likeCount;

    private LocalDateTime createdAt;

    @QueryProjection
    public ArticleListResponseDto(Long id, String nickname, String title, String content, String category,
                                  String image, long likeCount, LocalDateTime createdAt) {
        this.id = id;
        this.nickname = nickname;
        this.title = title;
        this.content = content;
        this.category = category;
        this.image = image;
        this.likeCount = likeCount;
        this.createdAt = createdAt;
    }

}
