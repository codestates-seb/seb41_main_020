package codestates.frogroup.indiego.domain.member.enums;

import lombok.Getter;

public enum ProfileImage {
    BASIC_IMAGE_ONE(1,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_TWO(2,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_THREE(3,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_FOUR(4,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_FIVE(5,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_SIX(6,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_SEVEN(7,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_EIGHT(8,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_NIGHT(9,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png"),
    BASIC_IMAGE_TEN(10,"https://user-images.githubusercontent.com/95069395/211246989-dd36a342-bf18-412e-b3ec-841ab3280d56.png");

    @Getter
    int index;
    @Getter
    private String url;

    ProfileImage(int index, String url) {
        this.index = index;
        this.url = url;
    }
}
