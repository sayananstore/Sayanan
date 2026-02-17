import { Box } from "@mui/material";
import HeroSlider from "../sections/HeroSlider";
import DiscountSection from "../sections/DiscountSection";
import FeaturedSection from "../sections/FeaturedSection";
import NewArrivalsSection from "../sections/NewArrivalsSection";
import CategoryShowcase from "../sections/CategoryShowcase";
import StickyShowcase from "../sections/StickyShowcase";
import About from "../sections/About"
import WhatsAppFloat from "../components/WhatsAppFloat";

const Home = () => {
  return (
    <Box>
      <HeroSlider />
	  <CategoryShowcase />
      {/* <DiscountSection /> */}
      <FeaturedSection />
	  <StickyShowcase />
      <NewArrivalsSection />
	  <About />
	  <WhatsAppFloat />
    </Box>
  );
};

export default Home;
