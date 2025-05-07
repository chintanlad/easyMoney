package com.lendingsystem.backend.service;

import java.util.List;
import java.util.Optional;

public interface IGenericService<T, ID> {
    T save(T entity);
    List<T> findAll();
    Optional<T> findById(ID id);
    void deleteById(ID id);
//    T update(ID id, T updatedEntity);
}
