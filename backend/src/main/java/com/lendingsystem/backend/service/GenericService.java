package com.lendingsystem.backend.service;


import com.lendingsystem.backend.service.IGenericService;
import com.lendingsystem.backend.repository.IGenericRepository;
import java.util.List;
import java.util.Optional;

public class GenericService<T, ID> implements IGenericService<T, ID> {

    protected final IGenericRepository<T, ID> genericRepository;


    public GenericService(IGenericRepository<T, ID> genericRepository) {
        this.genericRepository = genericRepository;
    }

    @Override
    public T save(T entity) {
        return genericRepository.save(entity);
    }

    @Override
    public List<T> findAll() {
        return genericRepository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        return genericRepository.findById(id);
    }

    @Override
    public void deleteById(ID id) {
        genericRepository.deleteById(id);
    }
}
