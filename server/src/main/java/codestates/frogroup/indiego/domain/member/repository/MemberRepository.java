package codestates.frogroup.indiego.domain.member.repository;

import codestates.frogroup.indiego.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member,Long> {
}
