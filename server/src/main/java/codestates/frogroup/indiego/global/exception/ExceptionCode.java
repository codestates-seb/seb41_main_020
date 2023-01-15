package codestates.frogroup.indiego.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // MEMBER
    MEMBER_IS_NOT_SAME(400, "Member is not the same"),
    MEMBER_ROLE_DOES_NOT_HAVE(403, "The role doesn't have."),
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NO_PERMISSION(406, "권한이 없습니다."),

    // JWT, 인증관련
    ACCESS_TOKEN_NOT_FOUND(404,"Access Token을 찾을 수 없습니다."),
    REFRESH_TOKEN_NOT_FOUND(404,"Refresh Token을 찾을 수 없습니다."),
    COOKIE_REFRESH_TOKEN_NOT_FOUND(404,"Cookie 정보에 Refresh Token 정보가 없습니다."),
    TOKEN_IS_NOT_SAME(404,"Refresh Token과 발급된 Access Token 정보가 일치하지 않습니다."),
    NO_ACCESS_TOKEN(403, "권한 정보가 없는 토큰입니다."),
    TOKEN_EXPIRED(400, "Token Expired"),
    TOKEN_INVALID(400, "Token Invalid"),
    TOKEN_SIGNATURE_INVALID(400, "Token Signature Invalid"),
    TOKEN_MALFORMED(400, "Token Malformed"),
    TOKEN_UNSUPPORTED(400, "Token Unsupported"),
    TOKEN_ILLEGAL_ARGUMENT(400, "Token Illegal Argument"),
    ANONYMOUS_USER(404, "Anonymous User"),
    // ARITCLE
    ARTICLE_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),
    ARTICLE_COMMENT_NOT_FOUND(404, "해당 게시글의 댓글을 찾을 수 없습니다."),

    SHOW_NOT_FOUND(404, "Show not found"),
    BOOKMARK_NOT_FOUND(404, "");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
