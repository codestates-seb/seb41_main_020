package codestates.frogroup.indiego.domain.show.entity;

import codestates.frogroup.indiego.domain.common.embedding.Coordinate;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.common.auditing.BaseTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

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
    private Member member;

    @Embedded
    private ShowBoard board;

    @Embedded
    private Coordinate coordinate;

    @Enumerated(value = EnumType.STRING)
    private ShowStatus status;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Double scoreAverage; // 평균별점

    @Column(nullable = false)
    private Integer total; // 정원


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


}
