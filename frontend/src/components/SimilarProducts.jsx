import { useEffect, useState } from "react";
import { getSimilarProducts } from "../api/product.api";
import ProductCard from "../ProductCards/ProductCard";
import "./styles/SimilarProducts.css";

const SimilarProducts = ({ category }) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!category) return;

    getSimilarProducts(category)
      .then((res) => {

        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 10));
        }

      })
      .catch(console.error)
      .finally(() => setLoading(false));

  }, [category]);


  if (loading) return null;

  if (!products.length) return null;


  return (
    <div className="similar-wrapper">

      <div className="similar-header">
        <h2>You May Also Like</h2>
      </div>

      <div className="similar-scroll">

        {products.map(product => (
          <div className="similar-card-wrapper" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}

      </div>

    </div>
  );
};

export default SimilarProducts;
