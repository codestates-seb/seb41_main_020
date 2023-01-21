package codestates.frogroup.indiego.domain.show.repository;

import codestates.frogroup.indiego.global.redis.RedisDao;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ScoreRepository {
    RedisDao redisDao;

    public void setValues(String key, String value){
        redisDao.setValues(key, value);
    }

    public String getValues(String key){
        return redisDao.getValues(key);
    }
}
