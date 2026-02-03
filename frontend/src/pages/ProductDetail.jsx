import {
  Box,
  Grid,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/ImageGallery";
import QuantitySelector from "../components/QuantitySelector";
import { getProductById } from "../api/product.api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getProductById(id)
      .then((res) => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return null;

  return (
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
      }}
    >
      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* LEFT: IMAGES */}
        <Grid item xs={12} md={6}>
          <ImageGallery images={product.images} />
        </Grid>

        {/* RIGHT: INFO */}
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: { xs: "1.6rem", md: "2.2rem" },
              fontWeight: 500,
              mb: 1,
            }}
          >
            {product.name}
          </Typography>

          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 600,
              mb: 2,
            }}
          >
            ₹{product.base_price}
          </Typography>

          <Typography
            sx={{
              color: "text.secondary",
              mb: 3,
              lineHeight: 1.8,
            }}
          >
            {product.description}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Quantity */}
          <Typography sx={{ mb: 1 }}>Quantity</Typography>
          <QuantitySelector value={qty} setValue={setQty} />

          {/* CTA */}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                px: 4,
                py: 1.5,
                borderRadius: 0,
                "&:hover": { backgroundColor: "#000" },
              }}
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 0,
                borderColor: "#000",
                color: "#000",
                "&:hover": {
                  borderColor: "#000",
                },
              }}
            >
              Add to Wishlist
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
