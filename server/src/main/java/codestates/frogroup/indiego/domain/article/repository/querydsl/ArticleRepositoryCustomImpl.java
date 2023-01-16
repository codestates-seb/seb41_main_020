package codestates.frogroup.indiego.domain.article.repository.querydsl;

import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.dto.QArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.entity.Article;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.Objects;

import static codestates.frogroup.indiego.domain.article.entity.QArticle.article;
import static codestates.frogroup.indiego.domain.member.entity.QMember.member;
import static org.springframework.util.StringUtils.hasText;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // Querydsl의 리포지토리 지원 받는 부분
    public ArticleRepositoryCustomImpl(EntityManager em) {
        super(Article.class);
        this.queryFactory = new JPAQueryFactory(em);
    }

    // 정렬이 안된다.
    @Override
    public Page<ArticleListResponseDto> findAllBasic(Pageable pageable) {

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
                .where(article.board.category.eq("자유게시판"))
                .orderBy(article.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Article> countQuery = queryFactory
                .select(article)
                .from(article)
                .where(article.board.category.eq("자유게시판"))
                .orderBy(article.createdAt.desc());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount); // 최적화
    }

    // 정렬안되고, 조건도 안통하는것 같다.
    @Override
    public Page<ArticleListResponseDto> findAllSearch(String category, String search, Pageable pageable) {

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
                .where(
                        article.board.category.eq(category),
                        searchEq(search)
                )
                .orderBy(article.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(article.count())
                .from(article)
                .where(
                        article.board.category.eq(category),
                        searchEq(search)
                )
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

    private BooleanExpression searchEq(String search) {

        if (Objects.isNull(search)) {
            return null;
        } else {
            return article.member.profile.nickname.containsIgnoreCase(search)
                    .or(article.board.title.containsIgnoreCase(search))
                    .or(article.board.content.containsIgnoreCase(search));
        }
    }

    private BooleanExpression categoryEq(String category) {
        return hasText(category) ? article.board.category.eq(category) : article.board.category.eq("자유게시판");
    }

    private BooleanExpression searchNicknameEq(String search) {
        return hasText(search) ? article.member.profile.nickname.containsIgnoreCase(search) : null;
    }

    private BooleanExpression searchTitleEq(String search) {
        return hasText(search) ? article.board.title.containsIgnoreCase(search) : null;
    }

    private BooleanExpression searchContentEq(String search) {
        return hasText(search) ? article.board.content.containsIgnoreCase(search) : null;
    }

}
