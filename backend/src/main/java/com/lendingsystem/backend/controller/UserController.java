package com.lendingsystem.backend.controller;

import com.lendingsystem.backend.dto.LoginRequest;
import com.lendingsystem.backend.repository.IUserRepository;
import com.lendingsystem.backend.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.service.IUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final IUserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private IUserRepository iUserRepository;

    public UserController(IUserService userService, BCryptPasswordEncoder passwordEncoder, IUserRepository iUserRepository) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.iUserRepository = iUserRepository;

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


    //--Login controller
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String identifier = loginRequest.getIdentifier();
        String password = loginRequest.getPassword();

        Optional<UserEntity> userOpt = iUserRepository.findByUsername(identifier);
        if (userOpt.isEmpty()) {
            userOpt = iUserRepository.findByEmail(identifier);
        }

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        UserEntity user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().toString());

        return ResponseEntity.ok().body(Map.of(
                "token", token,
                "username", user.getUsername(),
                "role", user.getRole().toString()
        ));
    }
}
//Optional<UserEntity> findByUsername(String username);
