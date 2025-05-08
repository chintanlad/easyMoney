package com.lendingsystem.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final IUserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(IUserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserEntity user) {

        System.out.println(user);
        log.info("Received user data: {}", user);
        if (userService.isUsernameTaken(user.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }
        if (userService.isEmailTaken(user.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Hash the password before saving it
        String hashedPassword = passwordEncoder.encode(user.getPasswordHash());  // Hash the password
        user.setPasswordHash(hashedPassword);  // Set the hashed password

        user.setIsVerified(false); // Default to not verified
        UserEntity savedUser = userService.save(user);
        System.out.println("Hello");
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping
    public List<UserEntity> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @Valid @RequestBody UserEntity updatedUser) {
        try {
            UserEntity user = userService.update(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
