package com.lendingsystem.backend.service;

import com.lendingsystem.backend.entity.LoanFundingEntity;
import com.lendingsystem.backend.repository.IUserRepository;
import com.lendingsystem.backend.repository.LoanFundingRepository;
import com.lendingsystem.backend.repository.LoanRepository;
import com.lendingsystem.backend.service.GenericService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class LoanFundingService extends GenericService<LoanFundingEntity, Long> implements ILoanFundingService  {


    public LoanRepository loanRepository;
    public IUserRepository iUserRepository;
    public LoanFundingRepository iLoanFundingRepository;

    public LoanFundingService(LoanFundingRepository iLoanFundingRepository, LoanRepository loanRepository, IUserRepository iUserRepository)
    {
        super(iLoanFundingRepository);
        this.loanRepository = loanRepository;
        this.iUserRepository = iUserRepository;
    }

}
