package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.repository.ShowCommentRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import codestates.frogroup.indiego.global.redis.RedisDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowCommentService {

    private final ShowCommentRepository showCommentRepository;
    private final MemberService memberService;
    private final RedisDao redisDao;
    private final ShowReservationService showReservationService;
    public ShowComment createShowComment(ShowComment showComment, Show show, Member member){
        Optional<ShowReservation>  optionalShowReservation = showReservationService.findShowReservation(
                show.getId(), member.getId()
        );
        optionalShowReservation.orElseThrow(()-> new BusinessLogicException(ExceptionCode.SHOWRESERVATION_NOT_FOUND));

        showComment.addShow(show);
        showComment.addMember(member);

        inputScoreAverage(showComment, show);
        return showCommentRepository.save(showComment);
    }

    private void inputScoreAverage(ShowComment showComment, Show show) {
        String showId = String.valueOf(show.getId());
        String key = showId +"@scoreAverage";
        Double scoreAverage = Double.parseDouble(redisDao.getValues(key));
        Integer cntPeople = showCommentRepository.countByShowId(show.getId());
        String s = Double.toString((scoreAverage*cntPeople+ showComment.getScore())/ (cntPeople+1));
        redisDao.setValues(key, s);
    }

    public Page<ShowComment> findShowComment(Long showId, int page, int size ){
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return findShowCommentList(showId,pageable);
    }

    public ShowComment findShowComment(Long showCommentId){
        Optional<ShowComment> showComment = showCommentRepository.findById(showCommentId);
        return showComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SHOW_COMMENT_NOT_FOUND));
    }

    public Page<ShowComment> findShowCommentList(Long showId, Pageable pageable){
        Page<ShowComment> showCommentList = showCommentRepository.findAllByShowId(showId, pageable);
        if(showCommentList == null){
            throw new BusinessLogicException(ExceptionCode.SHOW_COMMENT_NOT_FOUND);
        }
        return showCommentList;
    }

    public ShowComment updateShowComment(ShowComment showComment, ShowComment findShowComment, Show show, Member member){
        verifiedShowComment(findShowComment,show);
        memberService.verifiedMemberId(findShowComment.getMember().getId(), member.getId()); // 작성한 유저가 맞는지 확인
        Optional.ofNullable(showComment.getScore()).ifPresent(score -> findShowComment.setScore(score));
        Optional.ofNullable(showComment.getComment()).ifPresent(comment -> findShowComment.setComment(comment));

        modifyScoreAverage(showComment, show);

        return findShowComment;
    }

    private void modifyScoreAverage(ShowComment showComment, Show show) {
        String showId = String.valueOf(show.getId());
        String key = showId +"@scoreAverage";
        Double scoreAverage = show.getScoreAverage();
        scoreAverage -= showCommentRepository.findByMember_Id(showComment.getMember().getId()).getScore();
        scoreAverage += showComment.getScore();
        Integer cntPeople = showCommentRepository.countByShowId(show.getId());
        String s = Double.toString((scoreAverage*cntPeople+ showComment.getScore())/ (cntPeople+1));
        redisDao.setValues(key, s);
        show.setScoreAverage(Double.valueOf(s));

    }

    public void deleteShowComment(Long commentId, Long memberId, Show show){
        ShowComment showComment = findShowComment(commentId);
        verifiedShowComment(showComment,show);
        memberService.verifiedMemberId(showComment.getMember().getId(), memberId); // 작성한 유저가 맞는지 확인
        showCommentRepository.delete(showComment);
    }

    // 해당 공연에 있는 한줄평인지 비교해주는 서비스 로직
    public void verifiedShowComment(ShowComment showComment, Show show){
        if(showComment.getShow().getId() != show.getId()){
            throw new BusinessLogicException(ExceptionCode.SHOW_COMMENT_IS_NOT_SAME);
        }
    }
}
