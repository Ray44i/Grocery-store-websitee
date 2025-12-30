-- Drop old table if it exists (development only)
DROP TABLE IF EXISTS products CASCADE;

-- Create products table (FINAL VERSION)
CREATE TABLE products (
                          id          BIGSERIAL PRIMARY KEY,
                          name        VARCHAR(255)      NOT NULL,
                          description VARCHAR(500),
                          price       NUMERIC(10, 2)    NOT NULL,

                          category    VARCHAR(100)      NOT NULL,   -- ✅ REQUIRED FOR CATEGORIES

                          image_url   VARCHAR(512),
                          featured    BOOLEAN           NOT NULL DEFAULT FALSE,

                          details     TEXT
);
