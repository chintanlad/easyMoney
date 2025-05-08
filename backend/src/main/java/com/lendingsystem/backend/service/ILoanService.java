package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.LoanEntity;
import org.springframework.http.ResponseEntity;

public interface ILoanService extends IGenericService<LoanEntity, Long> {
    // Add custom service methods if needed
    public LoanEntity update(LoanEntity loanEntity);
    public LoanEntity save(LoanEntity profile);
}
