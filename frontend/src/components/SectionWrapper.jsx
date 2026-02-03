import { Box, Typography } from "@mui/material";

const SectionWrapper = ({ title, subtitle, children }) => {
  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Section Header */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Typography
          sx={{
            fontSize: { xs: "1.4rem", md: "2.2rem" },
            fontWeight: 500,
            letterSpacing: 1,
            color: "#121212",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            width: 60,
            height: 3,
            backgroundColor: "#C9A24D",
            mt: 1.5,
          }}
        />

        {subtitle && (
          <Typography
            sx={{
              mt: 1.5,
              color: "text.secondary",
              maxWidth: 520,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>

      {children}
    </Box>
  );
};

export default SectionWrapper;
