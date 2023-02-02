package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.repository.querydsl.ShowRepositoryCustom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

import static codestates.frogroup.indiego.domain.show.entity.Show.ShowStatus;

public interface ShowRepository extends JpaRepository<Show,Long>, ShowRepositoryCustom {
    List<Show> findByShowBoardAddressAndStatus(String address, ShowStatus status, Sort sort);
    List<Show> findAllByShowBoardShowAtBetweenAndStatus(LocalDate start, LocalDate end, ShowStatus status, Sort sort);
    List<Show> findByMember_IdOrderByCreatedAtDesc(Long memberId);
}
