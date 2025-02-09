import React from "react";
import aqiImg from "../../assets/aqi.jpg";
import { Link } from "react-router-dom";
const AqiSection = () => {
  return (
    <Link to="/aqi" style={{ textDecoration: "none", color: "blue", fontWeight: "bold" }}>
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={aqiImg} alt="aqi image" className="m-0" />
      </div>
      <div className="deals__content">
        <h5>Breathe Easy, Glow Bright!</h5>
        <h4>Discover how your local air quality impacts your skin. Click to explore!</h4>
        <p>Did you know the air you breathe directly impacts your skin? Every breath you take leaves its mark. Our AQI (Air Quality Index) feature helps you uncover how the air quality in your city affects your skin health—whether it’s causing dryness, dullness, or protecting your natural glow. Take control of your skincare routine by understanding the invisible factors around you. Click here to explore and let your skin thank you later!</p>
      </div>
    </section>
    </Link>
  );
};

export default AqiSection;
