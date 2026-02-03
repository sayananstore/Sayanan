import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BreadcrumbsNav = ({ category }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs sx={{ mb: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Home
      </Link>

      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate("/products")}
        sx={{ cursor: "pointer" }}
      >
        Products
      </Link>

      {category && (
        <Typography color="text.primary">
          {category}
        </Typography>
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
