import {
  Box,
  Grid,
  Typography,
  Divider,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/product.api";
import ProductCard from "../components/ProductCard";
import BreadcrumbsNav from "../components/BreadcrumbsNav";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const category = searchParams.get("category");
  const gender = searchParams.get("gender");
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || 0;
  const maxPrice = searchParams.get("maxPrice") || 5000;

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getProducts({
      category,
      gender,
      sort,
      minPrice,
      maxPrice,
      page,
    });
    setProducts(res.data.products);
    setMeta(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams.toString()]);

  const updateParams = (newParams) => {
    setSearchParams({ ...Object.fromEntries(searchParams), ...newParams, page: 1 });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
      <BreadcrumbsNav category={category} />

      <Typography variant="h4" sx={{ mb: 2 }}>
        Products
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* FILTERS */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        {/* Gender */}
        <ToggleButtonGroup
          value={gender || ""}
          exclusive
          onChange={(e, val) => updateParams({ gender: val || "" })}
        >
          <ToggleButton value="Men">Men</ToggleButton>
          <ToggleButton value="Women">Women</ToggleButton>
        </ToggleButtonGroup>

        {/* Price */}
        <Box sx={{ width: 220 }}>
          <Typography variant="caption">Price</Typography>
          <Slider
            value={[Number(minPrice), Number(maxPrice)]}
            min={0}
            max={5000}
            onChangeCommitted={(e, v) =>
              updateParams({ minPrice: v[0], maxPrice: v[1] })
            }
          />
        </Box>

        {/* Sort */}
        <FormControl size="small">
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            label="Sort"
            onChange={(e) => updateParams({ sort: e.target.value })}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="price_asc">Price: Low to High</MenuItem>
            <MenuItem value="price_desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* PRODUCTS */}
      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={6} sm={4} md={3} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION */}
      {meta.totalPages > 1 && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            disabled={page <= 1}
            onClick={() => updateParams({ page: page - 1 })}
          >
            Previous
          </Button>
          <Button
            disabled={page >= meta.totalPages}
            onClick={() => updateParams({ page: page + 1 })}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;