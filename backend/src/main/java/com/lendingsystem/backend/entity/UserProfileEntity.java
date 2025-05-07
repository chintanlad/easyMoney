package com.lendingsystem.backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "user_id",nullable = false, referencedColumnName = "userId")
    private UserEntity user;

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String address;

    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    private LocalDate dob;

    private String identityNumber;

    private String employmentStatus;

    private Double income;
}
