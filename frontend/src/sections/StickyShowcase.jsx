import { useEffect, useState } from "react";
import "./styles/StickyShowcase.css";

const showcaseSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    title: "DEFINE YOUR PRESENCE",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    title: "CRAFTED FOR IMPACT",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    title: "MODERN LUXURY",
  },
];

const StickyShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseSlides.length);
    }, 4500);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <section className="sticky-showcase">
      {showcaseSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={`sticky-showcase__slide ${
            i === activeIndex
              ? "sticky-showcase__slide--active"
              : ""
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="sticky-showcase__overlay">
            <h1 className="sticky-showcase__title">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
    </section>
  );
};

export default StickyShowcase;
