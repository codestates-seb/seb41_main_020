package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.member.service.MemberService;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import codestates.frogroup.indiego.domain.show.repository.ShowCommentRepository;
import codestates.frogroup.indiego.global.exception.BusinessLogicException;
import codestates.frogroup.indiego.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowCommentService {

    private final ShowCommentRepository showCommentRepository;
    private final CustomBeanUtils<ShowComment> utils;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public ShowComment createShowComment(ShowComment showComment, Show show, Member member){
        showComment.addShow(show);
        showComment.addMember(member);
        return showCommentRepository.save(showComment);
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

        return findShowComment;
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
