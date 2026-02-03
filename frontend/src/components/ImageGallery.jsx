import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ImageGallery = ({ images = [] }) => {
  const safeImages =
    Array.isArray(images) && images.length > 0
      ? images
      : [{ image_url: "https://via.placeholder.com/600x800" }];

  const [active, setActive] = useState(safeImages[0].image_url);

  /* Update active image when product changes */
  useEffect(() => {
    setActive(safeImages[0].image_url);
  }, [images]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        width: "100%",
      }}
    >
      {/* MAIN IMAGE */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { md: 520 },
          aspectRatio: "3 / 4", // LOCKED RATIO
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={active}
          alt="Product"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: { xs: "contain", md: "cover" }, // 👈 KEY
          }}
        />
      </Box>

      {/* THUMBNAILS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: 1,
          overflowX: { xs: "auto", md: "visible" },
          maxWidth: { xs: "100%", md: 90 },
        }}
      >
        {safeImages.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img.image_url}
            onClick={() => setActive(img.image_url)}
            sx={{
              width: 70,
              height: 90,
              objectFit: "cover",
              cursor: "pointer",
              border:
                active === img.image_url
                  ? "2px solid #C9A24D"
                  : "1px solid #ddd",
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageGallery;
