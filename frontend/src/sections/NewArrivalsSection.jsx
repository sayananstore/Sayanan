import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SectionWrapper from "../components/SectionWrapper";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/product.api";

const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts({ limit: 4 })
      .then((res) => setProducts(res.data.products || []))
      .catch(console.error);
  }, []);

  if (products.length === 0) return null;

  return (
    <SectionWrapper
      title="New Arrivals"
      subtitle="Fresh designs, just added"
    >
      <Grid container spacing={{ xs: 2.5, md: 4 }}>
        {products.map(
          (product) =>
            product && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            )
        )}
      </Grid>
    </SectionWrapper>
  );
};

export default NewArrivalsSection;
