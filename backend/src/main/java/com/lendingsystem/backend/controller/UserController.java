package com.lendingsystem.backend.controller;

import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserEntity> createUser(@Valid @RequestBody UserEntity user) {
        if (userService.isUsernameTaken(user.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }
        if (userService.isEmailTaken(user.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }
        user.setIsVerified(false); // default
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
