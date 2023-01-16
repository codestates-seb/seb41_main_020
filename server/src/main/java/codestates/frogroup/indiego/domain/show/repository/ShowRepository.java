package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.repository.querydsl.ShowRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import javax.naming.ldap.SortResponseControl;
import java.util.List;

public interface ShowRepository extends JpaRepository<Show,Long>, ShowRepositoryCustom {
    List<Show> findByShowBoardAddressAndStatus(String address, Show.ShowStatus status, SortResponseControl sort);
}
