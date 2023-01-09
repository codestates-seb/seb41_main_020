package codestates.frogroup.indiego.global.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class ExceptionAdvice {

    /**
     * 유효성 검증 실패(Valid) 예외 처리
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }

    /**
     * URI 검증 실패 예외 처리
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {

        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response;
    }

    /**
     * 서비스 계층에서 throw 되는 BusinessLogicException 예외 처리
     */
    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {

        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    /**
     * 클라이언트에서 잘못된 HTTP Method 통해 request 요청 시 throw 되는 HttpRequestMethodNotSupportedException 예외 처리
     */
    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {

        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);

        return response;
    }

}
