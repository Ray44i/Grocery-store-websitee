package com.example.ecomm.controller;

import com.example.ecomm.model.PaymentMethod;
import com.example.ecomm.repository.PaymentRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ✅ ADD payment (userEmail from JWT)
    @PostMapping
    public PaymentMethod add(
            @RequestBody PaymentMethod paymentMethod,
            Authentication authentication
    ) {
        String email = authentication.getName(); // 🔥 from JWT
        paymentMethod.setUserEmail(email);
        return paymentRepository.save(paymentMethod);
    }

    // ✅ GET payments of logged-in user
    @GetMapping
    public List<PaymentMethod> getMyPayments(Authentication authentication) {
        String email = authentication.getName();
        return paymentRepository.findByUserEmail(email);
    }

    // ✅ DELETE payment (optional ownership check later)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        paymentRepository.deleteById(id);
    }
}
