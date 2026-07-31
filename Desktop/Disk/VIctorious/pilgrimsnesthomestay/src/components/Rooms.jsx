import React, { useState } from 'react';
import './Rooms.css';
import standardRoomImg from '../assets/Standard_Room.png';
import familySuiteImg from '../assets/Family_Suite.png';
import darshanPackageImg from '../assets/Complete_Darshan_Package_Arrival.png';
import { X } from 'lucide-react';

const Rooms = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="rooms" className="section bg-light">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Rooms & Packages</h2>
          <p className="section-subtitle">Choose from our comfortable homestay rooms or complete packages designed for a seamless spiritual journey in Ujjain.</p>
        </div>
        
        <div className="rooms-grid">
          <div className="room-card">
            <div className="room-img-container" onClick={() => setSelectedImage(standardRoomImg)} style={{cursor: 'zoom-in'}}>
              <img src={standardRoomImg} alt="Standard Room" />
              <div className="room-badge">Popular</div>
            </div>
            <div className="room-content">
              <h3>Standard Room</h3>
              <div className="room-price">₹1,500 <span>/ night</span></div>
              <p>A cozy, clean, and peaceful room perfect for solo travelers or couples. Includes free WiFi and 24x7 tea service.</p>
              <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+the+Standard+Room" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{marginTop: '10px'}}>Book Now</a>
            </div>
          </div>
          
          <div className="room-card">
            <div className="room-img-container" onClick={() => setSelectedImage(familySuiteImg)} style={{cursor: 'zoom-in'}}>
              <img src={familySuiteImg} alt="Family Suite" />
            </div>
            <div className="room-content">
              <h3>Family Suite</h3>
              <div className="room-price">₹2,500 <span>/ night</span></div>
              <p>Spacious accommodation for families. Features extra beds, attached washroom, and a comfortable sitting area.</p>
              <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+the+Family+Suite" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{marginTop: '10px'}}>Book Now</a>
            </div>
          </div>
          
          <div className="room-card package-card">
            <div className="room-img-container" onClick={() => setSelectedImage(darshanPackageImg)} style={{cursor: 'zoom-in'}}>
              <img src={darshanPackageImg} alt="Complete Darshan Package" />
              <div className="room-badge package-badge">Best Value</div>
            </div>
            <div className="room-content">
              <h3>Complete Darshan Package</h3>
              <div className="room-price">Custom <span>/ package</span></div>
              <p>Includes room stay, expert Bhasam Aarti guidance, local temple tours, and special arrangements for your pooja.</p>
              <a href="https://wa.me/917000181186?text=Hello+I+want+to+know+more+about+the+Darshan+Package" target="_blank" rel="noopener noreferrer" className="btn" style={{marginTop: '10px'}}>Enquire Now</a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={32} />
            </button>
            <img src={selectedImage} alt="Zoomed Detail" className="lightbox-img" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Rooms;
