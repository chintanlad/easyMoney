package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.entity.UserProfileEntity;
import com.lendingsystem.backend.repository.IGenericRepository;
import com.lendingsystem.backend.repository.IUserProfileRepository;
import com.lendingsystem.backend.repository.IUserRepository;
import com.lendingsystem.backend.repository.UserProfileRepository;
//import com.lendingsystem.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//@RequiredArgsConstructor
@Service
@Transactional
public class UserProfileService extends GenericService<UserProfileEntity, Long> implements IUserProfileService {


//    private UserProfileRepository profileRepository;
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    public IUserProfileRepository profileRepository;

    public UserProfileService(IGenericRepository<UserProfileEntity, Long> genericRepository,
                              IUserProfileRepository profileRepository,
                              IUserRepository userRepository) {
        super(genericRepository);
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }



    @Transactional
    public UserProfileEntity save(UserProfileEntity profile, String username) {

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        System.out.println("User found: " + user.getUserId());

        profile.setUser(user); // attach managed UserEntity

        return profileRepository.save(profile);
    }


//    @Transactional
//    public UserProfileEntity save(UserProfileEntity profile) {
//
//        Long userId = profile.getUser().getUserId();
//
//        if (userId == null) {
//            throw new RuntimeException("User ID must not be null");
//        }
//        System.out.println("hello-save from service");
//
//        // Fetch the user entity from DB
//        UserEntity user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
//        System.out.println("hiiii- after from service");
//        profile.setUser(user);  // Attach the managed entity
//        System.out.println(profile);
//
//        return profileRepository.save(profile);
//    }



    @Override
    @Transactional
    public UserProfileEntity updateProfile(Long id, UserProfileEntity updatedProfile) {
        UserProfileEntity existing = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // Validation example: phone number must be 10 digits and not changed to an invalid format
        if (updatedProfile.getPhoneNumber() != null && !updatedProfile.getPhoneNumber().matches("^\\d{10}$")) {
            throw new RuntimeException("Invalid phone number");
        }

        // Update allowed fields
        existing.setFullName(updatedProfile.getFullName());
        existing.setAddress(updatedProfile.getAddress());
        existing.setPhoneNumber(updatedProfile.getPhoneNumber());
        existing.setDob(updatedProfile.getDob());
        existing.setIdentityNumber(updatedProfile.getIdentityNumber());
        existing.setEmploymentStatus(updatedProfile.getEmploymentStatus());
        existing.setIncome(updatedProfile.getIncome());

        return profileRepository.save(existing);
    }

    // Add extra methods if needed
}
