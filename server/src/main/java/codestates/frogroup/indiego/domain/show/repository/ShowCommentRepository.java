package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowCommentRepository extends JpaRepository<ShowComment,Long> {
}
