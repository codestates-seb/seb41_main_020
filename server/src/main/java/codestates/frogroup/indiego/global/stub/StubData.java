package codestates.frogroup.indiego.global.stub;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.ArticleComment;
import codestates.frogroup.indiego.domain.article.entity.ArticleCommentLike;
import codestates.frogroup.indiego.domain.article.entity.ArticleLike;
import codestates.frogroup.indiego.domain.article.dto.ArticleCommentDto;
import codestates.frogroup.indiego.domain.article.dto.ArticleDto;
import codestates.frogroup.indiego.domain.common.embedding.Board;
import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.entity.Profile;
import codestates.frogroup.indiego.domain.member.entity.dto.MemberDto;
import codestates.frogroup.indiego.domain.show.dto.ShowCommentDto;
import codestates.frogroup.indiego.domain.show.dto.ShowDto;
import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowBoard;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class StubData {

    /**
     * Entity
     */
    public List<String> roles = new ArrayList<>(List.of("PERFORMER"));


    public Member member = new Member(
        1L,
        "hgd1234@naver.com",
        "ghdrlfehd1234!",
        new Profile(
                "홍길동",
                "종로구",
                "https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png",
                "홍길동 입니다!"
            ),
            roles
    );

    public List<ArticleComment> articleComments = new ArrayList<>();
    public List<ArticleLike> articleLikes = new ArrayList<>();
    public List<ArticleCommentLike> articleCommentLikes = new ArrayList<>();

    public Article article = new Article(
            1L,
            member,
            new Board(
                    "거 재밌는 공연 추천좀 해보셔",
                    "강서구에 재밌는 공연 뭐있슈?",
                    "",
                    "자유 게시판"
            ),
            1234L,
            12L,
            articleComments.size(),
            articleComments,
            articleLikes
    );

    public ArticleComment articleComment = new ArticleComment(
            1L,
            member,
            article,
            "오늘 오후 6시에 인디고 고등학교 체육관에서 밴드공연 있어요",
            20L,
            articleCommentLikes
    );

    public ArticleComment articleComment2 = new ArticleComment(
            2L,
            member,
            article,
            "오늘 오후 8시에 인디고 중학교 체육관에서 연극 있어요",
            20L,
            articleCommentLikes
    );


    public Board board = new Board("개구리의 합창", "한겨울에 하는 개굴단의 합창! 해오름 소극장으로 여러분을 초대합니다. ",
            "https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png",
            "뮤지컬");

    public ShowBoard showBoard = new ShowBoard(
            board,
            70000,
            "종로구",
            LocalDate.of(2023, 2,14),
            LocalDate.of(2023, 2,14),
            "https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png");

    public Coordinate coordinate = new Coordinate(37.58481899015186, 127.00088309891716 );

    public Show show = new Show(1L, member, showBoard, coordinate, Show.ShowStatus.SALE, 0.00, 30);

    public ShowComment showComment = new ShowComment(1L, show, member, 5.0, "감동적입니다.");




    /**
     * Member Response
     */

    public MemberDto.GetResponse getMemberGetResponse(){

        return new MemberDto.GetResponse(
                member.getId(),
                member.getEmail(),
                roles,
                new ArrayList<>(List.of(
                        new Profile(member.getProfile().getNickname(),
                        member.getProfile().getAddress(),
                        member.getProfile().getImage(),
                        member.getProfile().getIntroduction())))
        );
    }


    public MemberDto.PostResponse getMemberPostResponse(){

        return new MemberDto.PostResponse(
                member.getId(),
                member.getEmail(),
                member.getProfile().getNickname(),
                roles
        );
    }

    public MemberDto.PatchResponse getMemberPatchResponse(){

        return new MemberDto.PatchResponse(
                member.getProfile().getNickname(),
                member.getProfile().getAddress(),
                member.getProfile().getImage(),
                member.getProfile().getIntroduction()
        );

    }

    /**
     * Article Response
     */
    public ArticleDto.Response getArticlePostResponse() {

        return new ArticleDto.Response(
                1L,
                member.getProfile().getNickname(),
                article.getBoard().getTitle(),
                article.getBoard().getContent(),
                article.getBoard().getImage(),
                article.getBoard().getCategory(),
                1234L,
                123L,
                LocalDateTime.now(),
                LocalDateTime.now(),
                null,
                null
        );
    }

    public ArticleDto.Response getArticleResponse() {

        return new ArticleDto.Response(
                1L,
                member.getProfile().getNickname(),
                article.getBoard().getTitle(),
                article.getBoard().getContent(),
                article.getBoard().getImage(),
                article.getBoard().getCategory(),
                1234L,
                123L,
                LocalDateTime.now(),
                LocalDateTime.now(),
                getArticleCommentResponses().size(),
                getArticleCommentResponses()
        );
    }

    public List<ArticleCommentDto.Response> getArticleCommentResponses() {
        return List.of(
                new ArticleCommentDto.Response(
                        1L,
                        article.getId(),
                        member.getProfile().getNickname(),
                        member.getProfile().getImage(),
                        articleComment.getComment(),
                        articleComment.getLikeCount(),
                        LocalDateTime.now()
                ),
                new ArticleCommentDto.Response(
                        2L,
                        article.getId(),
                        member.getProfile().getNickname(),
                        member.getProfile().getImage(),
                        articleComment2.getComment(),
                        articleComment2.getLikeCount(),
                        LocalDateTime.now()
                )
        );
    }

    public ArticleCommentDto.Response getArticleCommentResponse() {
        return new ArticleCommentDto.Response(
                    1L,
                    article.getId(),
                    member.getProfile().getNickname(),
                    member.getProfile().getImage(),
                    articleComment.getComment(),
                    0L,
                    LocalDateTime.now()
            );
    }

    /**
     * Show Response
     */

    public ShowDto.postResponse postShowResponse(){
        return new ShowDto.postResponse(
                show.getId(),
                board.getTitle(),
                board.getContent(),
                board.getImage(),
                board.getCategory(),
                showBoard.getPrice(),
                showBoard.getAddress(),
                showBoard.getExpiredAt(),
                showBoard.getShowAt(),
                showBoard.getDetailImage(),
                show.getCoordinate().getLatitude(),
                show.getCoordinate().getLongitude(),
                show.getStatus().getStatus(),
                show.getScoreAverage(),
                show.getTotal()
        );
    }
    public ShowDto.Response getShowResponse(){
        List<ShowCommentDto.Response> showComments = new ArrayList<>();
        showComments.add(new ShowCommentDto.Response(
                showComment.getId(),
                show.getId(),
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()
        ));
        return new ShowDto.Response(
                show.getId(),
                board.getTitle(),
                board.getContent(),
                board.getImage(),
                board.getCategory(),
                showBoard.getPrice(),
                showBoard.getAddress(),
                showBoard.getExpiredAt(),
                showBoard.getShowAt(),
                showBoard.getDetailImage(),
                show.getCoordinate().getLatitude(),
                show.getCoordinate().getLongitude(),
                show.getStatus().getStatus(),
                show.getScoreAverage(),
                show.getTotal(),
                true

        );
    }

    public ShowDto.Response getPatchResponse(){
        List<ShowCommentDto.Response> showComments = new ArrayList<>();
        showComments.add(new ShowCommentDto.Response(
                showComment.getId(),
                show.getId(),
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()
        ));

        return new ShowDto.Response(
                show.getId(),
                board.getTitle(),
                "개구리들의 락페스티벌에 초대합니다.",
                board.getImage(),
                "락",
                showBoard.getPrice(),
                showBoard.getAddress(),
                showBoard.getExpiredAt(),
                showBoard.getShowAt(),
                showBoard.getDetailImage(),
                show.getCoordinate().getLatitude(),
                show.getCoordinate().getLongitude(),
                show.getStatus().getStatus(),
                show.getScoreAverage(),
                show.getTotal(),
                true
        );
    }

    public ShowCommentDto.Response getShowCommentResponse(){
        return new ShowCommentDto.Response(
                showComment.getId(),
                show.getId(),
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()
        );
    }

    public List<ShowCommentDto.Response> getShowCommentsResponse(){
        List<ShowCommentDto.Response> list = new ArrayList<>();
        list.add(new ShowCommentDto.Response( showComment.getId(),
                show.getId(),
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()));
        list.add(new ShowCommentDto.Response( showComment.getId(),
                2L,
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()));
        list.add(new ShowCommentDto.Response( showComment.getId(),
                3L,
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()));
        list.add(new ShowCommentDto.Response( showComment.getId(),
                4L,
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()));
        list.add(new ShowCommentDto.Response( showComment.getId(),
                5L,
                member.getId(),
                member.getProfile().getNickname(),
                showComment.getScore(),
                showComment.getComment()));
        return list;

    }
    public ShowCommentDto.Response getPatchShowCommentResponse(){
        return new ShowCommentDto.Response(
                showComment.getId(),
                show.getId(),
                member.getId(),
                member.getProfile().getNickname(),
                4.0,
                showComment.getComment()
        );
    }

//    public ShowReservationDto.Response getShowReservationResponse(){
//        return new ShowReservationDto.Response(
//                show.getId(),
//                1L,
//                1,
//                false
//        );
//    }
//
//    public ShowReservationDto.Response getPatchShowReservationResponse(){
//        return new ShowReservationDto.Response(
//                show.getId(),
//                1L,
//                2,
//                false
//        );
//    }
}
