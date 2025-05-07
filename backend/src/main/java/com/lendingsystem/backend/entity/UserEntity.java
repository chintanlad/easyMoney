package com.lendingsystem.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;


    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 20, message = "Username must be 3-20 characters")
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Role is required")
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private Boolean isVerified = false;

    private String verificationToken;

    private LocalDateTime tokenExpiry;

    @Column(nullable = false)
    private Double balance = 0.0;

    @Column(nullable = false)
    private Integer successfulRepaymentsCount = 0;

    public enum Role {
        USER, ADMIN
    }
}
