package com.lendingsystem.backend.controller;

import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.entity.UserProfileEntity;
import com.lendingsystem.backend.service.IUserProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-profiles")
public class UserProfileController {

    private final IUserProfileService userProfileService;

    public UserProfileController(IUserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }


    @PostMapping("/{username}")
    public ResponseEntity<UserProfileEntity> create(
            @PathVariable String username,
            @Valid @RequestBody UserProfileEntity profile
    ) {
        System.out.println("hello");
        UserProfileEntity savedProfile = userProfileService.save(profile, username);
        return ResponseEntity.ok(savedProfile);
    }


//    @PostMapping
//    public ResponseEntity<UserProfileEntity> create(@Valid @RequestBody UserProfileEntity profile) {
//        System.out.println("hello");
//        UserProfileEntity savedUser = userProfileService.save(profile);
//        return ResponseEntity.ok(savedUser);
////        return ResponseEntity.ok(userProfileService.save(profile));
//    }



//    @PostMapping
//    public ResponseEntity<UserProfileEntity> create(@Valid @RequestBody UserProfileEntity profile) {
//        if (profile.getUser() == null || profile.getUser().getUserId() == null) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        // Optional: Check if profile already exists for user
//        if (userProfileService.existsByUserId(profile.getUser().getUserId())) {
//            return ResponseEntity.badRequest().body(null);
//        }
//
//        UserProfileEntity savedProfile = userProfileService.save(profile);
//        return ResponseEntity.ok(savedProfile);
//    }

    @GetMapping
    public ResponseEntity<List<UserProfileEntity>> getAll() {
        return ResponseEntity.ok(userProfileService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileEntity> getById(@PathVariable Long id) {
        return userProfileService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileEntity> update(@PathVariable Long id, @Valid @RequestBody UserProfileEntity updatedProfile) {
        return ResponseEntity.ok(userProfileService.updateProfile(id, updatedProfile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userProfileService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
