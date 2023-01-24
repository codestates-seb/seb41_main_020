package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShowReservationRepository extends JpaRepository<ShowReservation,Long> {
    public Integer countByShowId(Long showId);
    public List<ShowReservation> findByShowId(Long showId);
    public Optional<ShowReservation> findByShowIdAndMemberId(Long showId, Long memberId);
}
