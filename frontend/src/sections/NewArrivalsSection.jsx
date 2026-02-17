import { useEffect, useRef, useState } from "react";
import { getProducts } from "../api/product.api";
import ProductCard from "../ProductCards/ProductCard";
import "./styles/NewArrivalSection.css";

const NewArrivalsSection = () => {
  const [products, setProducts] = useState([]);
  const sliderRef = useRef();

  useEffect(() => {
    getProducts({ limit: 10 })
      .then((res) => setProducts(res.data.products || []))
      .catch(console.error);
  }, []);

  const scroll = (dir) => {
    const container = sliderRef.current;
    const scrollAmount = 300;

    if (!container) return;

    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <section className="na-section">
      {/* Header */}
      <div className="na-header">
        New Arrivals
		<div className="na-subtitle">
			<p>Fresh designs, just added</p>
		</div>
      </div>

      {/* Slider */}
      <div className="na-slider-wrapper">

        {/* LEFT BUTTON */}
        <button
          className="na-nav left"
          onClick={() => scroll("left")}
        >
          ‹
        </button>

        {/* SCROLL AREA */}
        <div className="na-slider" ref={sliderRef}>
          {products.map((product) => (
            <div className="na-item" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          className="na-nav right"
          onClick={() => scroll("right")}
        >
          ›
        </button>

      </div>
    </section>
  );
};

export default NewArrivalsSection;










// import { useEffect, useState } from "react";
// import SectionWrapper from "../components/SectionWrapper";
// import ProductCard from "../ProductCards/ProductCard";
// import { getProducts } from "../api/product.api";
// import "./styles/NewArrivalSection.css";

// const NewArrivalsSection = () => {

//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getProducts({ limit: 4 })
//       .then((res) => setProducts(res.data.products || []))
//       .catch(console.error);
//   }, []);

//   if (!products.length) return null;

//   return (
//     <section className="new-arrivals-section">
//       <SectionWrapper
//         title="New Arrivals"
//         subtitle="Fresh designs, just added"
//       >
//         <div className="new-arrivals-grid">
//           {products.map(
//             (product) =>
//               product && (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                 />
//               )
//           )}
//         </div>
//       </SectionWrapper>
//     </section>
//   );
// };

// export default NewArrivalsSection;
