package com.example.ecomm.controller;

import com.example.ecomm.model.Product;
import com.example.ecomm.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository productRepository;

    // ✅ Constructor injection
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ✅ Get ALL products
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // ✅ Get products by category
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // ✅ Get featured products
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrue();
    }
}
