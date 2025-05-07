//package com.lendingsystem.backend.repository;
//
//import com.lendingsystem.backend.entity.UserEntity;
//import org.springframework.data.jpa.repository.JpaRepository;
//import com.lendingsystem.backend.repository.IUserRepository;
//import java.util.Optional;
//
//public abstract class UserRepository implements IUserRepository, JpaRepository<UserEntity, Long> {
//    public IUserRepository userRepository = null;
//
//    @Override
//    public Optional<UserEntity> findByUsername(String username) {
//        return userRepository.findByUsername(username);
//    }
//
//    @Override
//    public Optional<UserEntity> findByEmail(String email) {
//        return userRepository.findByEmail(email);
//    }
//
//}
