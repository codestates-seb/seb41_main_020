package codestates.frogroup.indiego.domain.show.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ShowMapsResponse {
    private Long id;
    private String title;
    private String address;
    private Double latitude;
    private Double longitude;
    private LocalDate showAt;
    private LocalDate expiredAt;
    private String img;

    @QueryProjection
    public ShowMapsResponse(Long id, String title, String address, Double latitude, Double longitude,
                            LocalDate expiredAt, LocalDate showAt, String img) {
        this.id = id;
        this.title = title;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.showAt = showAt;
        this.expiredAt = expiredAt;
        this.img = img;
    }
}
