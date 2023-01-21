package codestates.frogroup.indiego.global.redis;

public class RedisKey {
    public static String SCORE_AVERAGE = "@scoreAverage";

    public String getScoreAvergeKey(Long showId){
        return String.valueOf(showId) + SCORE_AVERAGE;
    }

}
