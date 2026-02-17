import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/HeroSlider.css";

/* MOCK API WITH EDITORIAL TEXT */
const getSlides = async () => {
  return {
    data: [
      {
        id: 1,
        image_url:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae",
        title: "CRAFTED FOR ROYALTY",
        subtitle: "Luxury Ethnicwear For Timeless Elegance",
        url: "/products/1",
      },
      {
        id: 2,
        image_url:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
        title: "NEW FESTIVE EDIT",
        subtitle: "Designed To Make An Entrance",
        url: "/products/1",
      },
      {
        id: 3,
        image_url:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b",
        title: "MODERN TRADITION",
        subtitle: "Where Heritage Meets Couture",
        url: "/products/1",
      },
    ],
  };
};

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getSlides()
      .then((res) => setSlides(res.data.sort((a, b) => a.id - b.id)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // slower = luxury

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) return null;

  const slide = slides[index];

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${slide.image_url})` }}
    >
      <div className="hero-overlay" />

      {/* TEXT */}
      <div className="hero-content">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>

        <button onClick={() => navigate(slide.url)}>
          Explore Collection
        </button>
      </div>

      {/* ARROWS */}
      <button
        className="hero-btn left"
        onClick={() =>
          setIndex(index === 0 ? slides.length - 1 : index - 1)
        }
      >
        ❮
      </button>

      <button
        className="hero-btn right"
        onClick={() =>
          setIndex((index + 1) % slides.length)
        }
      >
        ❯
      </button>
    </section>
  );
};

export default HeroSlider;

	
	
	
	
	
	
	
	
	
	
	// import { useEffect, useState } from "react";
	// import { useNavigate } from "react-router-dom";
	// import "./styles/HeroSlider.css";

	// /* TEMP MOCK API */
	// const getSlides = async () => {
	// return {
	// 	data: [
	// 	{
	// 		id: 1,
	// 		image_url:
	// 		"https://images.unsplash.com/photo-1523275335684-37898b6baf30",
	// 		url: "/products/1",
	// 	},
	// 	{
	// 		id: 2,
	// 		image_url:
	// 		"https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
	// 		url: "/products/1",
	// 	},
	// 	{
	// 		id: 3,
	// 		image_url:
	// 		"https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
	// 		url: "/products/1",
	// 	},
	// 	],
	// };
	// };

	// const HeroSlider = () => {
	// const [slides, setSlides] = useState([]);
	// const [index, setIndex] = useState(0);
	// const navigate = useNavigate();

	// /* Fetch slides */
	// useEffect(() => {
	// 	getSlides()
	// 	.then((res) => {
	// 		const sorted = res.data.sort((a, b) => a.id - b.id);
	// 		setSlides(sorted);
	// 	})
	// 	.catch(console.error);
	// }, []);

	// /* Auto slide */
	// useEffect(() => {
	// 	if (!slides.length) return;

	// 	const interval = setInterval(() => {
	// 	setIndex((prev) => (prev + 1) % slides.length);
	// 	}, 5000);

	// 	return () => clearInterval(interval);
	// }, [slides]);

	// if (!slides.length) return null;

	// const prevSlide = (e) => {
	// 	e.stopPropagation();
	// 	setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
	// };

	// const nextSlide = (e) => {
	// 	e.stopPropagation();
	// 	setIndex((prev) => (prev + 1) % slides.length);
	// };

	// const handleClick = () => {
	// 	const slide = slides[index];
	// 	if (slide?.url) navigate(slide.url);
	// };

	// return (
	// 	<div
	// 	className="hero"
	// 	style={{ backgroundImage: `url(${slides[index].image_url})` }}
	// 	onClick={handleClick}
	// 	>
	// 	<div className="hero-overlay" />

	// 	<button className="hero-btn left" onClick={prevSlide}>
	// 		❮
	// 	</button>

	// 	<button className="hero-btn right" onClick={nextSlide}>
	// 		❯
	// 	</button>
	// 	</div>
	// );
	// };

	// export default HeroSlider;




















