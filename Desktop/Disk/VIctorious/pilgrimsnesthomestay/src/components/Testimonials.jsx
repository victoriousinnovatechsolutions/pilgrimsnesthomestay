import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Ramesh Kulkarni",
    location: "Pune, Maharashtra",
    text: "Our stay at Pilgrim's Nest was absolutely wonderful! The proximity to the temple and the incredibly helpful guidance for the Bhasam Aarti made our spiritual journey seamless.",
  },
  {
    id: 2,
    name: "Priya Deshmukh",
    location: "Mumbai, Maharashtra",
    text: "The 24x7 tea service was a lifesaver after early morning temple visits! A very clean, cozy, and peaceful environment. Highly recommended for families visiting Ujjain.",
  },
  {
    id: 3,
    name: "Amit Patil",
    location: "Nashik, Maharashtra",
    text: "Excellent hospitality and great amenities. The host went out of their way to make sure we were comfortable. Free WiFi and parking were definitely a big plus!",
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Auto advance every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials-section section">
      <div className="container">
        <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">What Our Guests Say</h2>
          <p className="section-subtitle" style={{ color: 'var(--text-light)', marginTop: '10px' }}>Real experiences from our wonderful visitors</p>
        </div>
        
        <div className="testimonial-slider">
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          
          <div className="testimonial-content">
            <Quote className="quote-icon" size={48} />
            <p className="testimonial-text">"{testimonials[currentIndex].text}"</p>
            <div className="testimonial-author">
              <h4>{testimonials[currentIndex].name}</h4>
              <span>{testimonials[currentIndex].location}</span>
            </div>
          </div>
          
          <button className="slider-btn next-btn" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button 
              key={index} 
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
