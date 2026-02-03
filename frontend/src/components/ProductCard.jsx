import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);

  const images = Array.isArray(product.images) ? product.images : [];

  const image =
    images.find((img) => img.is_primary)?.image_url ||
    images[0]?.image_url ||
    "https://via.placeholder.com/400x500?text=Sayanan";

  const handleNavigate = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #eee",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          transform: { md: "translateY(-4px)" },
        },
      }}
      onClick={handleNavigate}
    >
      {/* IMAGE */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={image}
          alt={product.name}
          sx={{
            width: "100%",
            height: { xs: 260, md: 320 },
            objectFit: "cover",
          }}
        />

        {/* Wishlist */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // 👈 VERY IMPORTANT
            setWishlisted((prev) => !prev);
          }}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#fff",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          {wishlisted ? (
            <FavoriteIcon sx={{ color: "#C9A24D" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* CONTENT */}
      <CardContent sx={{ textAlign: "left" }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "0.95rem",
            mb: 0.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          ₹{product.base_price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
