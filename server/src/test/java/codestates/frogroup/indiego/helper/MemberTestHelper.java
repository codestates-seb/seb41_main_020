package codestates.frogroup.indiego.helper;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public interface MemberTestHelper {

    String MEMBER_URL = "/members";
    String RESOURCE_URI_ID = "/{member-id}";
    String PATH = "/";

    default String getResourceURI(Long memberId){
        return UriComponentsBuilder.newInstance().path(MEMBER_URL+RESOURCE_URI_ID)
                .buildAndExpand(memberId).toUri().toString();
    }

    default String getResourceURI(Long memberId, String url){
        return UriComponentsBuilder.newInstance().path(MEMBER_URL+RESOURCE_URI_ID+PATH+url)
                .buildAndExpand(memberId).toUri().toString();
    }

    default String getResourceURI(String urlOne){
        return UriComponentsBuilder.newInstance().path(MEMBER_URL+PATH+urlOne).build().toUri().toString();
    }

    default String getResourceURI(String urlOne, String urlTwo){
        return UriComponentsBuilder.newInstance().path(MEMBER_URL+PATH+urlOne+PATH+urlTwo).build().toUri().toString();
    }



}
