package com.example.ecomm.dto;

public class ProductDTO {

    private Long id;
    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private String details;

    // 🔥 REQUIRED FLAGS
    private boolean featured;
    private boolean onSale;
    private Double discountPrice;

    // ✅ FULL constructor
    public ProductDTO(
            Long id,
            String name,
            String description,
            Double price,
            String imageUrl,
            String details,
            boolean featured,
            boolean onSale,
            Double discountPrice
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.details = details;
        this.featured = featured;
        this.onSale = onSale;
        this.discountPrice = discountPrice;
    }

    // ✅ Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public String getDetails() { return details; }

    public boolean isFeatured() { return featured; }
    public boolean isOnSale() { return onSale; }
    public Double getDiscountPrice() { return discountPrice; }
}
