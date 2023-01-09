package codestates.frogroup.indiego.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    // 필요한 예외처리 추가
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
