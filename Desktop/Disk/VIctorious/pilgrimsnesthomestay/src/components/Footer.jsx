import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import './Footer.css';
import logoImg from '../assets/logo-pil.png';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9c.4 1.4 1.4 2.5 2.8 2.9 1.5.4 6.7.4 6.7.4s5.2 0 6.7-.4c1.4-.4 2.4-1.5 2.8-2.9.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9C21.1 5.7 20.1 4.6 18.7 4.2 17.2 3.8 12 3.8 12 3.8s-5.2 0-6.7.4C3.9 4.6 2.9 5.7 2.5 7.1z"/>
    <path d="M9.75 15.02l5.75-3.02-5.75-3.02v6.04z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col footer-about">
          <img src={logoImg} alt="Pilgrim's Nest Logo" className="footer-logo" style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />
          <p>Pilgrim's nest Homestay🏡 (Your Trusted Host)</p>
          <ul className="features-list">
            <li>• Bhasam aarti guide🔱</li>
            <li>• 24×7 tea available ☕</li>
            <li>• free wifi</li>
            <li>• free parking</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li className="footer-contact-item"><MapPin size={16}/> Ujjain📍</li>
            <li className="footer-contact-item"><Phone size={16}/> +91 7000181186</li>
            <li className="footer-contact-item" style={{ justifyContent: 'center' }}>Dm for bookings..!</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/pilgrims_nest_homestay/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://youtube.com/@pilgrimsnest-homestay_ujjain" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <YoutubeIcon />
            </a>
            <a href="https://share.google/kNX2xD5tUQbRU9oZZ" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Google Maps">
              <MapPin size={24} />
            </a>
          </div>
          <Link to="/contact" className="btn" style={{marginTop: '20px'}}>Contact Us</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            Copyright &copy; 2026 Pilgrim's Nest Homestay | Developed by <a href="https://victoriousinnovatechsolutions.com/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>Victorious Innovatech Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
