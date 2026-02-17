import { useEffect, useState } from "react";
import { getProducts } from "../api/product.api";
import DiscountProductCard from "../ProductCards/DiscountProductCard";
import DiscountSkeleton from "./DiscountSkeleton";
import "./styles/DiscountSection.css";

const DiscountSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 4));
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Discount products error:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="discount-section">
      <div className="discount-container">
        {/* HEADER */}
        <div className="discount-title">On Sale</div>

        <div className="discount-subtitle">
          Limited-time offers on handcrafted designs
        </div>

        {/* CONTENT */}
        {loading ? (
          <DiscountSkeleton />
        ) : products.length === 0 ? (
          <div>No offers available right now.</div>
        ) : (
          <div className="discount-row">
            {products.map((product) => (
              <div key={product.id} className="discount-item">
                <DiscountProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="discount-cta">
          <button className="discount-btn">View all</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;








// import { Box, Typography, Button } from "@mui/material";
// import { useEffect, useState } from "react";
// import { getProducts } from "../api/product.api";
// import DiscountProductCard from "../components/DiscountProductCard";

// const DiscountSection = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getProducts()
//       .then((res) => {
//         // SAFETY CHECK
//         if (Array.isArray(res.data.products)) {
//           setProducts(res.data.products?.slice(0, 4)); // TEMP limit
//         } else {
//           setProducts([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Discount products error:", err);
//         setProducts([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <Box
//       sx={{
// 		overflowX: "hidden",
//         backgroundColor: "#FAF8EE",
//         py: { xs:2, md: 2 },
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: "1400px",
//           mx: "auto",
//           px: { xs: 2, md: 4 },
//         }}
//       >
//         {/* HEADER */}
//         <Typography
//           sx={{
//             fontSize: { xs: "1.6rem", md: "2.2rem" },
//             fontWeight: 500,
//             mb: 1,
//           }}
//         >
//           On Sale
//         </Typography>

//         <Typography
//           sx={{
//             color: "text.secondary",
//             mb: 4,
//             maxWidth: 480,
//           }}
//         >
//           Limited-time offers on handcrafted designs
//         </Typography>

//         {/* CONTENT */}
//         {loading ? (
//           <Typography>Loading offers...</Typography>
//         ) : products.length === 0 ? (
//           <Typography>No offers available right now.</Typography>
//         ) : (
//           <Box
//             sx={{
//               display: "flex",
//               gap: 3,
//               overflowX: { xs: "auto", md: "visible" },
//               pb: 2,
//             }}
//           >
//             {products.map((product) => (
//               <DiscountProductCard
//                 key={product.id}
//                 product={product}
//               />
//             ))}
//           </Box>
//         )}

//         {/* CTA */}
//         <Box sx={{ textAlign: "center", mt: 6 }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#000",
//               color: "#fff",
//               borderRadius: 30,
//               px: 4,
//               py: 1.2,
//               textTransform: "none",
//               "&:hover": { backgroundColor: "#000" },
//             }}
//           >
//             View all
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DiscountSection;
