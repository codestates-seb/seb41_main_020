package codestates.frogroup.indiego.domain.show.dto;

import codestates.frogroup.indiego.domain.common.embedding.Board;
import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowBoard;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

public class ShowDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private Long id;
        //ShowBoard
        //Board
        private String title;
        private String content;
        private String image;
        private String category;
        //board end
        private Integer price;
        private String address;
        private LocalDate expiredAt; // 만료날짜
        private LocalDate showAt; // 공연날짜
        private String detailImage;
        //showboard end
        private Double latitude;
        private Double longitude;

        //check
        private String status;
        private Double scoreAverage; // 평균별점
        private Integer total; // 정원
    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private Long id;
        //ShowBoard
        //Board
        private String title;
        private String content;
        private String image;
        private String category;
        //board end
        private Integer price;
        private String address;
        private LocalDate expiredAt; // 만료날짜
        private LocalDate showAt; // 공연날짜
        private String detailImage;
        //showboard end
        private Double latitude;
        private Double longitude;

        //check
        private String status;
        private Double scoreAverage; // 평균별점
        private Integer total; // 정원

        private ShowCommentDto.Response comment;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response{
        private Long id;
        //ShowBoard
        //Board
        private String title;
        private String content;
        private String image;
        private String category;
        //board end
        private Integer price;
        private String address;
        private LocalDate expiredAt; // 만료날짜
        private LocalDate showAt; // 공연날짜
        private String detailImage;
        //showboard end
        private Double latitude;
        private Double longitude;

        //check
        private String status;
        private Double scoreAverage; // 평균별점
        private Integer total; // 정원
        private List<ShowCommentDto.Response> comments;

        private boolean isBookmarked;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class postResponse{
        private Long id;
        //ShowBoard
        //Board
        private String title;
        private String content;
        private String image;
        private String category;
        //board end
        private Integer price;
        private String address;
        private LocalDate expiredAt; // 만료날짜
        private LocalDate showAt; // 공연날짜
        private String detailImage;
        //showboard end
        private Double latitude;
        private Double longitude;

        //check
        private String status;
        private Double scoreAverage; // 평균별점
        private Integer total; // 정원

    }

}
