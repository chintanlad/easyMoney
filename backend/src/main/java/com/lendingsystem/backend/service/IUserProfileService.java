package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.UserProfileEntity;

public interface IUserProfileService extends IGenericService<UserProfileEntity, Long> {
    // Add profile-specific methods if needed
    UserProfileEntity updateProfile(Long id, UserProfileEntity updatedProfile);

//    public boolean existsByUserId(Long userId);
}
