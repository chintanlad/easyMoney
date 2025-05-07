package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.repository.IUserRepository;
import com.lendingsystem.backend.service.IUserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService extends GenericService<UserEntity, Long> implements IUserService {

    private final IUserRepository userRepository;

    public UserService(IUserRepository userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }

    @Override
    public boolean isUsernameTaken(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean isEmailTaken(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserEntity save(UserEntity entity) {
        System.out.println("Hwllo from user..");
        return userRepository.save(entity);
    }

    @Override
    public UserEntity update(Long id, UserEntity updatedUser) {
        UserEntity existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));

        // Check for username conflict
        if (!existingUser.getUsername().equals(updatedUser.getUsername())) {
            userRepository.findByUsername(updatedUser.getUsername()).ifPresent(conflict -> {
                throw new IllegalArgumentException("Username already exists: " + updatedUser.getUsername());
            });
        }

        // Check for email conflict
        if (!existingUser.getEmail().equals(updatedUser.getEmail())) {
            userRepository.findByEmail(updatedUser.getEmail()).ifPresent(conflict -> {
                throw new IllegalArgumentException("Email already exists: " + updatedUser.getEmail());
            });
        }

        // Update allowed fields
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPasswordHash(updatedUser.getPasswordHash());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setBalance(updatedUser.getBalance());
        existingUser.setSuccessfulRepaymentsCount(updatedUser.getSuccessfulRepaymentsCount());

        return userRepository.save(existingUser);
    }
}
