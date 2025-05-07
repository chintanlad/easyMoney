package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.UserEntity;

public interface IUserService extends IGenericService<UserEntity, Long> {
    boolean isUsernameTaken(String username);
    boolean isEmailTaken(String email);
    public UserEntity update(Long id, UserEntity updatedUser);
}
