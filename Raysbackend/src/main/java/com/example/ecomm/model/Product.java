package com.example.ecomm.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String category;
    private Double price;

    @Column(name = "image_url")
    private String imageUrl;

    private Boolean featured;

    private Boolean onSale;

    private Double discountPrice;

    private String details;
}
