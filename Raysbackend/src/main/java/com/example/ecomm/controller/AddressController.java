package com.example.ecomm.controller;

import com.example.ecomm.model.Address;
import com.example.ecomm.repository.AddressRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@CrossOrigin(origins = "*")
public class AddressController {

    private final AddressRepository repo;

    public AddressController(AddressRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Address> getByEmail(@RequestParam String email) {
        return repo.findByUserEmail(email);
    }

    @PostMapping
    public Address add(@RequestBody Address address) {
        return repo.save(address);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
