import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* ----- CATEGORY DATA (can come from API later) ----- */
const categories = [
  {
    name: "Shirt",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    name: "Kurti",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    name: "Lehenga",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
  {
    name: "Poshak",
    image:
      "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
  },
];

const CategoryShowcase = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#FBF7EE",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 6 },
        pb: { xs: 2, md: 2 }
      }}
    >
      {/* Heading */}
      <Typography
        align="center"
        sx={{
          fontSize: { xs: "1.8rem", md: "2.4rem" },
          fontWeight: 500,
          letterSpacing: 3,
          mb: 6,
        }}
      >
        WHAT&apos;S YOUR VIBE?
      </Typography>

      {/* Categories */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          overflowX: { xs: "auto", md: "visible" },
          justifyContent: { md: "center" },
          pb: 2,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.name}
            onClick={() =>
              navigate(`/products?category=${cat.name.toLowerCase()}`)
            }
            sx={{
              minWidth: { xs: 220, md: 260 },
              height: { xs: 320, md: 380 },
              cursor: "pointer",
              position: "relative",
              borderRadius: "140px 140px 16px 16px",
              border: "6px solid #470909ff",
            //   border: "10px solid linear-gradient(to bottom, #090908ff, #e2bfa0, #b87333)",
              overflow: "hidden",
              transition: "transform 0.4s ease",
              "&:hover": {
                    transform: "translateY(-6px)",
              },
            }}
          >
            {/* Image */}
            <Box
              component="img"
              src={cat.image}
              alt={cat.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                "&:hover": {
                  transform: "scale(1.08)",
                },
              }}
            />

            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.65), transparent 60%)",
              }}
            />

            {/* Title */}
            <Typography
              sx={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#fff",
                fontSize: "1.4rem",
                fontWeight: 500,
                letterSpacing: 1.5,
              }}
            >
              {cat.name.toUpperCase()}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryShowcase;
