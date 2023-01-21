package codestates.frogroup.indiego.global.redis;

import org.springframework.stereotype.Component;

@Component
public class RedisKey {
    public static String SCORE_AVERAGE = "@scoreAverage";

    public String getScoreAvergeKey(Long showId){
        return String.valueOf(showId) + SCORE_AVERAGE;
    }

}
