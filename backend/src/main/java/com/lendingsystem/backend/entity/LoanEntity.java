package com.lendingsystem.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;

    @ManyToOne
    @JoinColumn(name = "borrower_id", nullable = false)
    private UserEntity borrower;

    @NotNull(message = "Amount is required")
    @Min(value = 1, message = "Loan amount must be greater than zero")
    private Double amount;

    @NotNull(message = "Interest rate is required")
    private Double interestRate;

    @NotNull(message = "Time period is required")
    private Integer timePeriod; // in months or weeks

    private String purpose;

    @Enumerated(EnumType.STRING)
    @NotNull
    private LoanStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL)
    private List<LoanFundingEntity> fundings;

    public enum LoanStatus {
        REQUESTED,
        APPROVED,
        REJECTED,
        FUNDED,
        REPAID
    }
}
