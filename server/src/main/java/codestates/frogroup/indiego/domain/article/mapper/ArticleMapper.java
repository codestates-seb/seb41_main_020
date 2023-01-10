package codestates.frogroup.indiego.domain.article.mapper;

import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.dto.ArticleDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(source = "title", target = "board.title")
    @Mapping(source = "content", target = "board.content")
    @Mapping(source = "image", target = "board.image")
    @Mapping(source = "category", target = "board.category")
    Article articlePostToArticle(ArticleDto.Post requestBody);

    @Mapping(source = "title", target = "board.title")
    @Mapping(source = "content", target = "board.content")
    @Mapping(source = "image", target = "board.image")
    @Mapping(source = "category", target = "board.category")
    Article articlePatchToArticle(ArticleDto.Patch requestBody);

    @Mapping(source = "board.title", target = "title")
    @Mapping(source = "board.content", target = "content")
    @Mapping(source = "board.image", target = "image")
    @Mapping(source = "board.category", target = "category")
    ArticleDto.Response articleToArticleResponse(Article article);

    @Mapping(source = "board.title", target = "title")
    @Mapping(source = "board.content", target = "content")
    @Mapping(source = "board.image", target = "image")
    @Mapping(source = "board.category", target = "category")
    List<ArticleDto.Response> articlesToArticleResponses(List<Article> articles);

}
