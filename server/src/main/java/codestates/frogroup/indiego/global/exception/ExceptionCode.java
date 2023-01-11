package codestates.frogroup.indiego.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // 필요한 예외처리 추가
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_NO_PERMISSION(406, "권한이 없습니다."),
    ARTICLE_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),
    ARTICLE_COMMENT_NOT_FOUND(404, "해당 게시글의 댓글을 찾을 수 없습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
