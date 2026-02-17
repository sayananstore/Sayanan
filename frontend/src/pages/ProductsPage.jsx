import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../api/product.api";
import ProductCard from "../ProductCards/ProductCard";
import BreadcrumbsNav from "../components/BreadcrumbsNav";
import "./styles/ProductsPage.css";

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
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...newParams,
      page: 1,
    });
  };

  return (
    <div className="products-page">
      <div className="products-container">
        <BreadcrumbsNav category={category} />

        <h1 className="page-title">Products</h1>

        {/* ================= FILTERS ================= */}
        <div className="filters">

          {/* Gender */}
          <div className="filter-group">
            <button
              className={`pill ${gender === "Men" ? "active" : ""}`}
              onClick={() => updateParams({ gender: "Men" })}
            >
              Men
            </button>
            <button
              className={`pill ${gender === "Women" ? "active" : ""}`}
              onClick={() => updateParams({ gender: "Women" })}
            >
              Women
            </button>
          </div>

          {/* Price */}
          <div className="filter-group price-group">
            <span>₹{minPrice}</span>
            <input
              type="range"
              min="0"
              max="5000"
              defaultValue={maxPrice}
              onMouseUp={(e) =>
                updateParams({ minPrice: 0, maxPrice: e.target.value })
              }
            />
            <span>₹{maxPrice}</span>
          </div>

          {/* Sort */}
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </div>

        {/* ================= PRODUCTS ================= */}
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {meta.totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={page <= 1}
              onClick={() => updateParams({ page: page - 1 })}
            >
              Previous
            </button>

            <span>
              Page {page} / {meta.totalPages}
            </span>

            <button
              disabled={page >= meta.totalPages}
              onClick={() => updateParams({ page: page + 1 })}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
