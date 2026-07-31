import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkInDate: '',
    checkInTime: '',
    checkOutDate: '',
    checkOutTime: '',
    guests: '',
    rooms: '',
    roomPreference: '',
    parking: false,
    meals: false,
    extraBed: false,
    sightseeing: false,
    message: ''
  });

  const todayStr = new Date().toISOString().split('T')[0];

  const getMinCheckOutDate = () => {
    if (formData.checkInDate) {
      const checkIn = new Date(formData.checkInDate);
      checkIn.setDate(checkIn.getDate() + 1);
      return checkIn.toISOString().split('T')[0];
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Format the message
    const facilities = [];
    if (formData.parking) facilities.push('Parking');
    if (formData.meals) facilities.push('Meals (Breakfast/Dinner)');
    if (formData.extraBed) facilities.push('Extra Bed');
    if (formData.sightseeing) facilities.push('Local Sightseeing');
    
    const facilitiesText = facilities.length > 0 ? facilities.join(', ') : 'None';

    const payload = {
      name: formData.name,
      phone: formData.phone,
      checkin: formData.checkInDate,
      checkin_time: formData.checkInTime,
      checkout: formData.checkOutDate,
      checkout_time: formData.checkOutTime,
      guests: formData.guests,
      rooms: formData.rooms,
      amenities: formData.roomPreference,
      addons: facilitiesText,
      message: formData.message
    };

    try {
      const response = await fetch('https://victoriousinnovatechsolutions.com/pilgrimsnesthomestay/submit.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      if (result.status === 'success') {
        // Generate WhatsApp text
        const text = `*Booking Enquiry*\n\n` +
          `*Name:* ${formData.name}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Check-In:* ${formData.checkInDate} at ${formData.checkInTime}\n` +
          `*Check-Out:* ${formData.checkOutDate} at ${formData.checkOutTime}\n` +
          `*Guests:* ${formData.guests} | *Rooms:* ${formData.rooms}\n` +
          `*Room Preference:* ${formData.roomPreference}\n` +
          `*Add-On Facilities:* ${facilitiesText}\n` +
          (formData.message ? `\n*Message:* ${formData.message}` : '');

        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/917000181186?text=${encodedText}`;
        
        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');

        // Clear form
        setFormData({
          name: '', phone: '', checkInDate: '', checkInTime: '', checkOutDate: '', checkOutTime: '',
          guests: '', rooms: '', roomPreference: '', parking: false, meals: false, extraBed: false, sightseeing: false, message: ''
        });
      } else {
        alert('Failed to send enquiry. Please try again or contact via WhatsApp.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send enquiry. Please try again or contact via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{paddingTop: '80px', backgroundColor: 'var(--secondary)', minHeight: '100vh'}}>
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-wrapper">
            
            <div className="contact-form-container booking-form-container">
              <h2 className="form-title">Booking Enquiry</h2>
              <p className="form-subtitle">Please fill out your details and we will get back to you to confirm your stay.</p>
              
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group half-width">
                    <label>Your Name</label>
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label>Your Phone</label>
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label>Check-In Date</label>
                    <input type="date" name="checkInDate" value={formData.checkInDate} min={todayStr} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label>Check-In Time</label>
                    <select name="checkInTime" value={formData.checkInTime} onChange={handleChange} required>
                      <option value="">Select Time...</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half-width">
                    <label>Check-Out Date</label>
                    <input type="date" name="checkOutDate" value={formData.checkOutDate} min={getMinCheckOutDate()} onChange={handleChange} required />
                  </div>
                  <div className="form-group half-width">
                    <label>Check-Out Time</label>
                    <select name="checkOutTime" value={formData.checkOutTime} onChange={handleChange} required>
                      <option value="">Select Time...</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-row three-cols">
                  <div className="form-group">
                    <label>Number Of Guests</label>
                    <input type="number" name="guests" placeholder="E.G. 2" min="1" value={formData.guests} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Number Of Rooms</label>
                    <input type="number" name="rooms" placeholder="E.G. 1" min="1" value={formData.rooms} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Room Preferences</label>
                    <select name="roomPreference" value={formData.roomPreference} onChange={handleChange}>
                      <option value="">Select Option...</option>
                      <option value="Standard">Standard</option>
                      <option value="Deluxe">Deluxe</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                </div>

                <div className="form-group facilities-group">
                  <label>Add-On Facilities (Optional)</label>
                  <div className="checkboxes-wrapper">
                    <label className="checkbox-label">
                      <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} /> Parking
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="meals" checked={formData.meals} onChange={handleChange} /> Meals (Breakfast/Dinner)
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="extraBed" checked={formData.extraBed} onChange={handleChange} /> Extra Bed
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" name="sightseeing" checked={formData.sightseeing} onChange={handleChange} /> Local Sightseeing
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message (Optional)</label>
                  <textarea name="message" placeholder="Any Special Requests?" rows="4" value={formData.message} onChange={handleChange}></textarea>
                </div>
                
                <button type="submit" className="btn submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND BOOKING ENQUIRY'}
                </button>
              </form>
            </div>
            
            <div className="contact-info-cards sidebar-info">
              <div className="contact-card">
                <div className="contact-icon"><Phone size={24} /></div>
                <div className="contact-details">
                  <h4>WhatsApp / Call</h4>
                  <p>+91 7000181186</p>
                  <a href="https://wa.me/917000181186?text=Hello+I+want+to+book+a+room+at+your+hotel" target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', fontSize: '0.9rem', marginTop: '5px', display: 'inline-block'}}>Chat on WhatsApp</a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div className="contact-details">
                  <h4>Location</h4>
                  <p>Pilgrim's Nest Homestay</p>
                  <p>Ujjain, Madhya Pradesh, India</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="full-width-map" style={{ marginTop: '60px' }}>
             <h3 style={{marginBottom: '20px', textAlign: 'center', color: 'var(--primary)'}}>Find Us Here</h3>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3668.1729615830827!2d75.7931827!3d23.1638866!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396375b6e832ee1d%3A0x41570d70b14f1d95!2sPilgrim's%20Nest!5e0!3m2!1sen!2sin!4v1785526718409!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{border: 0, borderRadius: '12px', boxShadow: 'var(--shadow-md)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin">
              </iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
