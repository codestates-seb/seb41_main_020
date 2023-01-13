package codestates.frogroup.indiego.domain.show.service;

import codestates.frogroup.indiego.domain.common.utils.CustomBeanUtils;
import codestates.frogroup.indiego.domain.member.entity.Member;
import codestates.frogroup.indiego.domain.member.repository.MemberRepository;
import codestates.frogroup.indiego.domain.show.entity.ShowComment;
import codestates.frogroup.indiego.domain.show.repository.ShowCommentRepository;
import codestates.frogroup.indiego.global.stub.StubData;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ShowCommentService {

    private final ShowCommentRepository showCommentRepository;
    private final CustomBeanUtils<ShowComment> utils;
    private final MemberRepository memberRepository;

    public ShowComment createShowComment(ShowComment showComment, Long showId){
        //멤버검증
//        StubData stubData = new StubData();
//        Member member = stubData.member;
//        ShowComment showComment1 = ShowComment.builder()
//                .comment(showComment.getComment())
//                .show(showComment.getShow())
//                .score(showComment.getScore())
//                .member(showComment.getMember())
//                .build();

        return showCommentRepository.save(showComment);
    }
}
