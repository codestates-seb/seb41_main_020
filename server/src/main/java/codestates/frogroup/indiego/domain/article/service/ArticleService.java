package codestates.frogroup.indiego.domain.article.service;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;

public interface ArticleService {

    ArticleDto.Response createArticle(Article article);

    ArticleDto.Response updateArticle(Article article);

    void deleteArticle(Long articleId);

}
