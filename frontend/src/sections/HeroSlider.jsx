import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getProducts } from "../api/product.api";

const HeroSlider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  /* Fetch images from products (TEMP strategy) */
  useEffect(() => {
    getProducts({ limit: 5 })
      .then((res) => {
        const imgs =
          res.data.products?.flatMap(
            (p) => p.images?.map((img) => img.image_url) || []
          ) || [];

        setImages(imgs);
      })
      .catch(console.error);
  }, []);

  /* Auto slide */
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) return null;

  const prevSlide = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % images.length);

  return (
    <Box
      sx={{
		overflowX: "hidden",
        position: "relative",
        width: "100%",
			height: { xs: "45vh", sm: "60vh", md: "100vh" },
        backgroundImage: `url(${images[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      {/* Overlay for luxury contrast */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.6))",
        }}
      />

      {/* Prev Button */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: { xs: 10, md: 20 },
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.45)",
          color: "#C9A24D",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: { xs: 10, md: 20 },
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.45)",
          color: "#C9A24D",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default HeroSlider;
