package codestates.frogroup.indiego.domain.article.repository.querydsl;

import codestates.frogroup.indiego.domain.article.dto.ArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.dto.QArticleListResponseDto;
import codestates.frogroup.indiego.domain.article.entity.Article;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;

import java.util.List;
import java.util.Objects;

import static codestates.frogroup.indiego.domain.article.entity.QArticle.article;
import static org.springframework.util.StringUtils.hasText;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    // Querydsl의 리포지토리 지원 받는 부분
    public ArticleRepositoryCustomImpl(EntityManager em) {
        super(Article.class);
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<ArticleListResponseDto> findAllBasic(String status, Pageable pageable) {

        // Querydsl 리포지토리 지원을 받는 경우에는
        // from(article)로 시작

        // queryFactory 사용은
        // queryFactory.select(article)로 시작

        // DTO 방법이 여러 가지
        // (1) Projections - 조금 복잡하나 구조적인 측에서는 장점이 존재
        // - Projections.Fields
        // - Projections.Beans
        // - Projections.Constructor

        // (2) QDTO 타입을 이용하는 방법 - 편리한 데 단점이 존재, DTO 클래스 생성자에 @QueryProjection 사용
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
                .orderBy(sortStatusEq(status))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Article> countQuery = queryFactory
                .select(article)
                .from(article)
                .where(article.board.category.eq("자유게시판"))
                .orderBy(sortStatusEq(status));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount); // 최적화
    }

    @Override
    public Page<ArticleListResponseDto> findAllSearch(String category, String search, String status, Pageable pageable) {

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
                        categoryEq(category),
//                        article.board.category.eq(category),
                        searchEq(search)
                )
                .orderBy(sortStatusEq(status))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(article.count())
                .from(article)
                .where(
                        categoryEq(category),
//                        article.board.category.eq(category),
                        searchEq(search)
                )
                .orderBy(sortStatusEq(status));

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount); // 최적화
    }

    @Override
    public List<ArticleListResponseDto> findLikeCountDesc(String category) {

        return queryFactory
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
                .where(article.board.category.eq(category))
                .orderBy(article.likeCount.desc())
                .offset(0)
                .limit(5)
                .fetch();

    }

    private OrderSpecifier<?> sortStatusEq(String status) {

        if (Objects.isNull(status) || status.equals("최신순")) {
            return article.createdAt.desc();
        } else if (status.equals("인기순")) {
            return article.likeCount.desc();
        }

        return null;
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
