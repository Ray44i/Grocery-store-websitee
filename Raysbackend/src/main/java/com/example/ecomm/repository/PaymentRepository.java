package com.example.ecomm.repository;

import com.example.ecomm.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository
        extends JpaRepository<PaymentMethod, Long> {

    List<PaymentMethod> findByUserEmail(String userEmail);
}
