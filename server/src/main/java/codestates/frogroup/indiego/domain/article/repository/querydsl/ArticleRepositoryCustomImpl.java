package codestates.frogroup.indiego.domain.article.repository.querydsl;

import codestates.frogroup.indiego.domain.article.dto.ArticleDto;
import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.dto.ArticleSearchCondition;
import codestates.frogroup.indiego.domain.article.dto.QArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.entity.Article;
import codestates.frogroup.indiego.domain.article.entity.QArticle;
import codestates.frogroup.indiego.domain.member.entity.QMember;
import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;

import static codestates.frogroup.indiego.domain.article.entity.QArticle.article;
import static codestates.frogroup.indiego.domain.member.entity.QMember.member;
import static org.springframework.util.StringUtils.hasText;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public ArticleRepositoryCustomImpl(EntityManager em) {
        super(Article.class);
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<ArticleListResponseDto> findAllSearch(ArticleSearchCondition condition, Pageable pageable) {

        List<ArticleListResponseDto> content = queryFactory
                .select(new QArticleListResponseDto(
                        article.id,
                        article.member.profile.nickname,
                        article.board.title,
                        article.board.content,
                        article.board.category,
                        article.board.image,
                        article.likeCount,
                        article.createdAt))
                .from(article)
                .leftJoin(article.member, member)
                .where(
                        categoryEq(condition.getCategory()),
                        searchTitleEq(condition.getSearch()),
                        searchContentEq(condition.getSearch()),
                        searchNicknameEq(condition.getSearch())
//                        searchEq(condition.getSearch())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Article> countQuery = queryFactory
                .select(article)
                .from(article)
                .leftJoin(article.member, member)
                .where(
                        categoryEq(condition.getCategory()),
                        searchTitleEq(condition.getSearch()),
                        searchContentEq(condition.getSearch()),
                        searchNicknameEq(condition.getSearch())
//                        searchEq(condition.getSearch())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    private BooleanExpression categoryEq(String category) {
        return hasText(category) ? article.board.category.eq(category) : article.board.category.eq("자유게시판");
    }

    private BooleanExpression searchNicknameEq(String search) {
        return hasText(search) ? member.profile.nickname.containsIgnoreCase(search) : null;
    }

    private BooleanExpression searchTitleEq(String search) {
        return hasText(search) ? article.board.title.containsIgnoreCase(search) : null;
    }

    private BooleanExpression searchContentEq(String search) {
        return hasText(search) ? article.board.content.containsIgnoreCase(search) : null;
    }

    private BooleanExpression searchEq(String search) {

        if (hasText(search)) {
            member.profile.nickname.containsIgnoreCase(search);
            article.board.title.containsIgnoreCase(search);
            article.board.content.containsIgnoreCase(search);
        }
        return null;
    }

}
