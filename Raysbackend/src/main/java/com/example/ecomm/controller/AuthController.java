package com.example.ecomm.controller;

import com.example.ecomm.config.JwtUtil;
import com.example.ecomm.model.User;
import com.example.ecomm.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email already exists"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("message", "User registered successfully")
        );
    }

    // ✅ LOGIN + JWT
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "User not found"));
        }

        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Invalid password"));
        }

        // 🔐 Generate JWT
        String token = JwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(
                Map.of(
                        "email", user.getEmail(),
                        "token", token
                )
        );
    }
}
