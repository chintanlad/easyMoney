package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.LoanEntity;
import com.lendingsystem.backend.entity.UserEntity;
import com.lendingsystem.backend.entity.UserProfileEntity;
import com.lendingsystem.backend.repository.IUserRepository;
import com.lendingsystem.backend.repository.LoanRepository;
import com.lendingsystem.backend.service.ILoanService;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class LoanService extends GenericService<LoanEntity, Long> implements ILoanService {

    private final LoanRepository loanRepository;
    private IUserRepository iUserRepository;

    public LoanService(LoanRepository loanRepository, IUserRepository iUserRepository) {
        super(loanRepository);
        this.loanRepository = loanRepository;
        this.iUserRepository = iUserRepository;
    }

    @Transactional
    public LoanEntity save(LoanEntity profile) {

        Long userId = profile.getBorrower().getUserId();

        if (userId == null) {
            throw new RuntimeException("User ID must not be null");
        }
        System.out.println("hello from loan service");

        // Fetch the user entity from DB
        UserEntity user = iUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        System.out.println("hiiii- after from service");
        profile.setBorrower(user);  // Attach the managed entity
        System.out.println(profile);
        profile.setLoanId(null);

        return loanRepository.save(profile);
    }

    @Override
    @Transactional
    public LoanEntity update(LoanEntity updatedLoan)
    {
        LoanEntity existingLoan = loanRepository.findById(updatedLoan.getLoanId())
                .orElseThrow(() -> new RuntimeException("Loan not found with ID: " + updatedLoan.getLoanId()));

        // Update fields (add more fields if needed)
        existingLoan.setAmount(updatedLoan.getAmount());
        existingLoan.setInterestRate(updatedLoan.getInterestRate());
        existingLoan.setTimePeriod(updatedLoan.getTimePeriod());
        existingLoan.setPurpose(updatedLoan.getPurpose());
        existingLoan.setStatus(updatedLoan.getStatus());

        return loanRepository.save(existingLoan);
    }

    // Implement custom service logic if required
}
