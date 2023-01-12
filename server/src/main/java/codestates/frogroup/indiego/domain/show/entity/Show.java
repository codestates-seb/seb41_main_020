package codestates.frogroup.indiego.domain.show.entity;

import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.common.auditing.BaseTime;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Show extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    @Embedded
    @Setter
    private ShowBoard board;

    @Setter
    @Embedded
    private Coordinate coordinate;


    @Enumerated(value = EnumType.STRING)
    private ShowStatus status = ShowStatus.SALE;

    @Column(nullable = false)
    @ColumnDefault("0")
    private double scoreAverage; // 평균별점

    @Column(nullable = false)
    private int total; // 정원


    public enum ShowStatus {
        SALE("판매중"),
        SOLD_OUT("매진"),
        EXPIRED("기간만료");

        @Getter
        private String status;

        ShowStatus(String status){
            this.status = status;
        }
    }

    @Builder
    public Show(Member member, ShowBoard board, Coordinate coordinate,
                int total, double scoreAverage) {
        this.member = member;
        this.board = board;
        this.coordinate = coordinate;
        this.total = total;
        this.scoreAverage = scoreAverage;
    }
}
