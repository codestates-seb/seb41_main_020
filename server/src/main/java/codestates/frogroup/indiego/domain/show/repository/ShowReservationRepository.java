package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowReservationRepository extends JpaRepository<ShowReservation,Long> {
}
