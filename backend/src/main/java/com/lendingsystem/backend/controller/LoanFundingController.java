package com.lendingsystem.backend.controller;

import com.lendingsystem.backend.entity.LoanEntity;
import com.lendingsystem.backend.entity.LoanFundingEntity;
import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.service.LoanFundingService;
import com.lendingsystem.backend.service.LoanService;
import com.lendingsystem.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan-funding")
public class LoanFundingController {

    private final LoanFundingService fundingService;
    private final LoanService loanService;
    private final UserService userService;

    @Autowired
    public LoanFundingController(
            LoanFundingService fundingService,
            LoanService loanService,
            UserService userService
    ) {
        this.fundingService = fundingService;
        this.loanService = loanService;
        this.userService = userService;
    }

    @PostMapping("/{loanId}/{lenderId}")
    public ResponseEntity<LoanFundingEntity> createFunding(
            @PathVariable Long loanId,
            @PathVariable Long lenderId,
            @RequestBody LoanFundingEntity fundingData
    ) {
        LoanEntity loan = loanService.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found with ID: " + loanId));
        UserEntity lender = userService.findById(lenderId)
                .orElseThrow(() -> new RuntimeException("Lender not found with ID: " + lenderId));

        fundingData.setLoan(loan);
        fundingData.setLender(lender);

        return ResponseEntity.ok(fundingService.save(fundingData));
    }

    @GetMapping
    public ResponseEntity<List<LoanFundingEntity>> getAllFundings() {
        return ResponseEntity.ok(fundingService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanFundingEntity> getFundingById(@PathVariable Long id) {
        return fundingService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFunding(@PathVariable Long id) {
        fundingService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
