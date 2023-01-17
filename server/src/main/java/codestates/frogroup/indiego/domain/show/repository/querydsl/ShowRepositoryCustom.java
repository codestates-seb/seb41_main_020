package codestates.frogroup.indiego.domain.show.repository.querydsl;

import codestates.frogroup.indiego.domain.show.dto.ShowListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface ShowRepositoryCustom {

    // category : null일 경우 전체, 전체, 음악, 연극
    // LocalDate : start, end : start(goe) end(loe) 사이에 있는 공연
    // address : null일 경우 강남구, 그 외에는 OO구
    // filter : null일 경우 조건 X, 공연명(title), 공연하는사람(nickname)
    // search : 입력한 검색어
    Page<ShowListResponseDto> findAllByShowSearch(String search, String category, String address, String filter,
                                                  LocalDate start, LocalDate end, Pageable pageable);

}
