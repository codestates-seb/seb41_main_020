package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.repository.querydsl.ShowRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show,Long>, ShowRepositoryCustom {
}
