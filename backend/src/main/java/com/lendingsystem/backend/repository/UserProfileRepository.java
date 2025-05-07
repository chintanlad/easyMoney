package com.lendingsystem.backend.repository;

import com.lendingsystem.backend.entity.UserProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class UserProfileRepository implements IUserProfileRepository, JpaRepository<UserProfileEntity, Long> {

    public IUserProfileRepository userProfileRepository;


}
