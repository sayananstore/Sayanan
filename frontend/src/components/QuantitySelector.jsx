import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const QuantitySelector = ({ value, setValue }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid #ddd",
        borderRadius: 1,
        width: "fit-content",
      }}
    >
      <IconButton
        onClick={() => value > 1 && setValue(value - 1)}
      >
        <RemoveIcon />
      </IconButton>

      <Typography sx={{ minWidth: 24, textAlign: "center" }}>
        {value}
      </Typography>

      <IconButton onClick={() => setValue(value + 1)}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
