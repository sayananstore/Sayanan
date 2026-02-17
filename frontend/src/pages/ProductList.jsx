import { Box, Grid, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "../ProductCards/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Page header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          letterSpacing: 1,
          mb: 1,
        }}
      >
        Our Collection
      </Typography>

      <Divider
        sx={{
          width: 80,
          borderColor: "#C9A24D",
          mb: 5,
        }}
      />

      {/* Product Grid */}
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <Typography sx={{ mt: 6 }}>
          No products found.
        </Typography>
      )}
    </Box>
  );
};

export default ProductList;
