package com.lendingsystem.backend.repository;

import com.lendingsystem.backend.entity.LoanEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends IGenericRepository<LoanEntity, Long> {
    // Add custom query methods here if needed
}
