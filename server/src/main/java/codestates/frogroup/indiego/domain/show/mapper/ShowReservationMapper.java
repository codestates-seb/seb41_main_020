package codestates.frogroup.indiego.domain.show.mapper;

import codestates.frogroup.indiego.domain.show.dto.ShowReservationDto;
import codestates.frogroup.indiego.domain.show.entity.Show;
import codestates.frogroup.indiego.domain.show.entity.ShowReservation;
import codestates.frogroup.indiego.domain.show.repository.ShowRepository;
import codestates.frogroup.indiego.domain.show.service.ShowService;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE,
uses = ShowMapper.class)
public interface ShowReservationMapper {

    // TODO default 를 쓰든 , service Layer 에서 처리를 하든
    // @Mapping(target = "show", expression = "java(new Show(post.getShowId()))")
    @Mapping(source = "ticketCount", target = "ticketCount")
    ShowReservation showReservationPostToShowReservation(ShowReservationDto.Post post);

    @Mapping(source = "show.id", target = "showId")
    ShowReservationDto.Response showToShowReservationResponse(ShowReservation showReservation);


    List<ShowReservationDto.Response> showsReservationsToShowResvationResponses(List<ShowReservation> reservations);

}
