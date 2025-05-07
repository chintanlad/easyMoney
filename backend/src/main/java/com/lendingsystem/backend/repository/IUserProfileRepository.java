package com.lendingsystem.backend.repository;

import com.lendingsystem.backend.entity.UserProfileEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserProfileRepository extends IGenericRepository<UserProfileEntity, Long>{

//    public boolean existsByUserId(Long Id);

}
