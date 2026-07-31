import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-wrapper">
          <div className="contact-content">
            <h2 className="section-title">A Spiritual Retreat in the Heart of Ujjain</h2>
            <p className="contact-desc">From the moment you arrive, experience a seamless blend of modern comfort and timeless devotion. A peaceful stay where your spiritual journey is fully supported, including expert guidance for the Bhasam Aarti.</p>
            <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+a+room+at+your+hotel" target="_blank" rel="noopener noreferrer" className="btn">Contact Us</a>
          </div>
          
          <div className="contact-info-cards">
            <div className="contact-card">
              <div className="contact-icon"><Mail size={20} /></div>
              <div className="contact-details">
                <h4>Email & Social</h4>
                <p>info@pilgrimsnest.com</p>
                <p>@pilgrims_nest_homestay</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon"><Phone size={20} /></div>
              <div className="contact-details">
                <h4>WhatsApp / Call</h4>
                <p>+91 7000181186</p>
                <p>24x7 Support Available</p>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div className="contact-details">
                <h4>Address</h4>
                <p>Pilgrim's Nest Homestay, Ujjain, Madhya Pradesh, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
