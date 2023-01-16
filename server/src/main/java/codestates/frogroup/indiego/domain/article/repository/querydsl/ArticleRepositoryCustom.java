package codestates.frogroup.indiego.domain.article.repository.querydsl;

import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleRepositoryCustom {

    Page<ArticleListResponseDto> findAllBasic(Pageable pageable);

    Page<ArticleListResponseDto> findAllSearch(String category, String search, Pageable pageable);
}
