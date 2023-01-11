package codestates.frogroup.indiego.domain.article.entity;

import codestates.frogroup.indiego.domain.common.embedding.Board;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.common.auditing.BaseTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Article extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Embedded
    private Board board;

    @ColumnDefault("0")
    private long view;

    @ColumnDefault("0")
    private long likeCount;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ArticleComment> articleComments = new ArrayList<>();

    public void setMember(Member member) {
        this.member = member;
    }

    public void setBoard(Board board) {
        this.board = board;
    }
}
