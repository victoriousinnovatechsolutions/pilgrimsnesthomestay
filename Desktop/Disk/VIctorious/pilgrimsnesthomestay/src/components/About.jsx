import React from 'react';
import './About.css';
import sideSectionImg from '../assets/side-section.png';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-image">
            <div className="image-container">
              <img src={sideSectionImg} alt="Pilgrim's Nest Side Section" />
              {/* <div className="image-card">
                <h4>Your Oasis Awaits at Pilgrim's Nest</h4>
                <p>Discover a serene retreat where comfort meets elegance. Experience the perfect blend of modern amenities and timeless hospitality.</p>
                <button className="btn btn-outline" style={{marginTop: '10px'}}>Explore</button>
              </div> */}
            </div>
          </div>

          <div className="about-content">
            <h2 className="section-title">Exploring Beyond Borders Our Travel Philosophy</h2>
            <p className="about-desc">Explore the world with us and embark on unforgettable journeys. We believe in creating experiences that resonate with your soul and leave you with memories to cherish forever.</p>

            <div className="philosophy-grid">
              <div className="philosophy-item">
                <span className="step-number">01</span>
                <div>
                  <h4>Section About One</h4>
                  <p>Explore the world with us and embark on unforgettable journeys.</p>
                </div>
              </div>

              <div className="philosophy-item">
                <span className="step-number">02</span>
                <div>
                  <h4>Section About Two</h4>
                  <p>Explore the world with us and embark on unforgettable journeys.</p>
                </div>
              </div>

              <div className="philosophy-item">
                <span className="step-number">03</span>
                <div>
                  <h4>Section About Three</h4>
                  <p>Explore the world with us and embark on unforgettable journeys.</p>
                </div>
              </div>

              <div className="philosophy-item">
                <span className="step-number">04</span>
                <div>
                  <h4>Section About Four</h4>
                  <p>Explore the world with us and embark on unforgettable journeys.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
