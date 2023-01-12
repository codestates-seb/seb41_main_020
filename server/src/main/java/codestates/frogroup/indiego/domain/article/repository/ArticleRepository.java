package codestates.frogroup.indiego.domain.article.repository;

import codestates.frogroup.indiego.domain.article.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article,Long> {

//    @Modifying
//    @Query("update Article a set a.view = a.view + 1 where a.id = :id")
//    long updateView(Long articleId);

}
