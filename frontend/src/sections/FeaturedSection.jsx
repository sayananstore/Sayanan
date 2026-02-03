import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";

const FeaturedSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 8)); // show more for scroll
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
		overflowX: "hidden",
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Typography
          sx={{
            fontSize: { xs: "1.6rem", md: "2.2rem" },
            fontWeight: 500,
            mb: 1,
          }}
        >
          Featured Collection
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: 480,
          }}
        >
          Hand-picked styles from our artisans
        </Typography>

        {/* Horizontal Scroll */}
        {loading ? (
          <Typography>Loading featured products...</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 2,

              /* Hide scrollbar (optional but premium) */
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: 4,
              },
            }}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                sx={{
                  minWidth: { xs: 260, md: 300 },
                  scrollSnapAlign: "start",
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedSection;
