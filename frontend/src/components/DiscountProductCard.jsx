import { Box, Typography } from "@mui/material";

const DiscountProductCard = ({ product }) => {
  if (!product) return null;

  const images = product.images || [];
  const image =
    images[0]?.image_url ||
    "https://via.placeholder.com/400x550?text=Sayanan";

  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={product.name}
          sx={{
            width: "100%",
            height: 420,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />

        {/* SALE badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "#fff",
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          Sale
        </Box>
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
          mb: 0.5,
          lineHeight: 1.4,
        }}
      >
        {product.name}
      </Typography>

      {/* Price */}
      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "text.secondary",
        }}
      >
        <Box component="span" sx={{ textDecoration: "line-through", mr: 1 }}>
          ₹{Number(product.base_price) + 1000}
        </Box>
        <Box component="span" sx={{ fontWeight: 600, color: "#000" }}>
          From ₹{product.base_price}
        </Box>
      </Typography>
    </Box>
  );
};

export default DiscountProductCard;
