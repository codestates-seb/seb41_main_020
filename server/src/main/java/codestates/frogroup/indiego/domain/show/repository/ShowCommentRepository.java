package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowCommentRepository extends JpaRepository<ShowComment,Long> {
    Page<ShowComment> findAllByShowId(Long showId, Pageable pageable);
    Integer countByShowId(Long showId);

    ShowComment findByMember_Id(Long memberId);

}
