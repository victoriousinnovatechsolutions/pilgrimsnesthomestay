import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo-pil.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarClass = `navbar ${scrolled || !isHomePage ? 'scrolled' : ''}`;

  return (
    <nav className={navbarClass}>
      <div className="nav-container" style={{ padding: '0 4%', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        <div className="nav-logo">
          <Link to="/">
            <img src={logoImg} alt="Pilgrim's Nest Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
          </Link>
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          <li className="mobile-only-action">
            <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+a+room+at+your+hotel" target="_blank" rel="noopener noreferrer" className="btn" onClick={closeMobileMenu}>Book Now</a>
          </li>
          
          <li className="mobile-only-action">
            <div className="mobile-contact-card">
              <h4 style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '1.2rem', fontWeight: '600' }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <a href="tel:+917000181186" style={{ fontSize: '1rem', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  📞 +91 70001 81186
                </a>
                <span style={{ fontSize: '1rem', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  📍 Ujjain, MP
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div className="nav-action desktop-only">
          <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+a+room+at+your+hotel" target="_blank" rel="noopener noreferrer" className="btn">Book Now</a>
        </div>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} style={{ color: isMobileMenuOpen ? 'var(--text-main)' : 'inherit' }}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
