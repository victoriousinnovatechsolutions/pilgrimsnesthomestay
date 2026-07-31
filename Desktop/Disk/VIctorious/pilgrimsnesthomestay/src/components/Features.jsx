import React from 'react';
import { Coffee, Map, Compass, Wifi, Shield, Star, Heart, Clock } from 'lucide-react';
import './Features.css';

const featureData = [
  { icon: <Compass size={24} />, title: "Bhasam Aarti Guide", desc: "Expert guidance and assistance for attending the sacred Bhasam Aarti." },
  { icon: <Coffee size={24} />, title: "24×7 Tea Available", desc: "Enjoy a hot cup of tea anytime, day or night, during your comfortable stay." },
  { icon: <Wifi size={24} />, title: "Free WiFi", desc: "Stay connected always. Enjoy seamless high-speed internet access throughout your stay." },
  { icon: <Shield size={24} />, title: "Free Parking", desc: "Safe and secure complimentary parking space available for all our guests." },
];

const Features = () => {
  return (
    <section id="services" className="section bg-light">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Your Gateway to Unforgettable Moments</h2>
          <p className="section-subtitle">From the moment you step into our lobby, you'll be greeted by a seamless blend of modern design and timeless charm.</p>
        </div>
        
        <div className="features-grid">
          {featureData.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
