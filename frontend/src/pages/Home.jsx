import { Box } from "@mui/material";
import HeroSlider from "../sections/HeroSlider";
import DiscountSection from "../sections/DiscountSection";
import FeaturedSection from "../sections/FeaturedSection";
import NewArrivalsSection from "../sections/NewArrivalsSection";
import CategoryShowcase from "../sections/CategoryShowcase";

const Home = () => {
  return (
    <Box>
      <HeroSlider />
	  <CategoryShowcase />
      <DiscountSection />
      <FeaturedSection />
      <NewArrivalsSection />
    </Box>
  );
};

export default Home;
