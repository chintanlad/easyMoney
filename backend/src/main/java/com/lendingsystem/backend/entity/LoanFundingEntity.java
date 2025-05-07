package com.lendingsystem.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "loan_funding")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanFundingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fundingId;

    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private LoanEntity loan;

    @ManyToOne
    @JoinColumn(name = "lender_id", nullable = false)
    private UserEntity lender;

    @NotNull
    @Min(value = 1, message = "Amount must be positive")
    private Double fundedAmount;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @DecimalMax(value = "100.0", inclusive = true)
    private Double fundedPercent;

    private LocalDateTime fundedAt = LocalDateTime.now();
}
