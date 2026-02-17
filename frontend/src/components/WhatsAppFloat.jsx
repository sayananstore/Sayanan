import "./styles/WhatsAppFloat.css";
import { FaWhatsapp } from "react-icons/fa";

const PHONE_NUMBER = "919351415538"; 
// replace with your number (country code + number)

const MESSAGE = "Hi, I want to know more about your products.";

const WhatsAppFloat = () => {
  const link = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={link}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsAppFloat;
