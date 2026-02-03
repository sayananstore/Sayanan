import { Box, Typography, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#C9A24D",
        mt: 10,
        pt: 4,
        pb: 4,
      }}
    >
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.3)", mb: 3 }} />

      <Typography align="center" sx={{ fontSize: 14 }}>
        © {new Date().getFullYear()} Sayanan Lifestyle
      </Typography>

      <Typography
        align="center"
        sx={{ fontSize: 12, opacity: 0.8, mt: 1 }}
      >
        Crafted by hand. Designed for life.
      </Typography>
    </Box>
  );
};

export default Footer;
