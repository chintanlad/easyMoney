package com.lendingsystem.backend.controller;

import com.lendingsystem.backend.entity.LoanEntity;
import com.lendingsystem.backend.entity.UserProfileEntity;
import com.lendingsystem.backend.service.ILoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private ILoanService loanService;

    @PostMapping
    public ResponseEntity<LoanEntity> createLoan(@RequestBody LoanEntity loan) {
//        return ResponseEntity.ok(loanService.save(loan));
        System.out.println("Controller from loan postmapping..");
        LoanEntity savedUser = loanService.save(loan);
        return ResponseEntity.ok(savedUser);


    }

    @GetMapping
    public ResponseEntity<List<LoanEntity>> getAllLoans() {
        return ResponseEntity.ok(loanService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanEntity> getLoanById(@PathVariable Long id) {
//        return ResponseEntity.ok(loanService.getById(id));
        return loanService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoanEntity> updateLoan(@PathVariable Long id, @RequestBody LoanEntity updatedLoan) {
        updatedLoan.setLoanId(id);
        return ResponseEntity.ok(loanService.update(updatedLoan));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLoan(@PathVariable Long id) {
        loanService.deleteById(id);
        return ResponseEntity.ok("Loan deleted successfully");
    }
}
