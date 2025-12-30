package com.example.ecomm.repository;

import com.example.ecomm.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserEmail(String userEmail);
}
