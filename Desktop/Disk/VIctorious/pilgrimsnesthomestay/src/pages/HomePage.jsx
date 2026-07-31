import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Rooms from '../components/Rooms';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Rooms />
      <Testimonials />
      <ContactSection />
    </>
  );
};

export default HomePage;
