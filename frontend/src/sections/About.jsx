import React from 'react';
import './styles/About.css';
import img1 from  "../assets/women_weaving.png"
import img2 from  "../assets/weaving_women.png"

const About = () => {
  return (
    <section className="about-sayaman">
      <div className="about-container">
        {/* Header Section */}
        <div className="about-header">
          <h1 className="about-title">About Sayanan</h1>
          <div className="header-image-wrapper">
            <img 
              src={img1} 
              alt="Traditional fabric detail" 
              className="header-image"
            />
          </div>
        </div>

        {/* Craftsman Section */}
        <div className="craftsman-section">
          <div className="craftsman-image-wrapper">
            <img 
              src={img1}
              alt="Artisan working on traditional craft" 
              className="craftsman-image"
            />
          </div>
          <div className="craftsman-text">
            <p>
              Sayanan is dedicated to preserving and celebrating the exquisite art of traditional Barmeri 
              clothing, celebrating the artistry and craftsmanship behind each piece.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mission-statement">
          <blockquote className="mission-quote">
            "Our mission is to <span className="highlight">preserve tradition</span> through 
            fashion, celebrating the rich heritage of Barmeri craftsmanship while creating 
            timeless pieces for modern wearers."
          </blockquote>
        </div>

        {/* Artisans Section */}
        <div className="artisans-section">
          <img 
            src={img2}
            alt="Traditional artisans at work" 
            className="artisans-image"
          />
        </div>
      </div>
    </section>
  );
};

export default About;