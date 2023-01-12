package codestates.frogroup.indiego.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // 필요한 예외처리 추가
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    ARTICLE_NOT_FOUND(404, "게시글을 찾을 수 없습니다."),

    SHOW_NOT_FOUND(404, "Show not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
