import React, { useState } from 'react';
import { addPassword } from './api';

const AddPassword = ({ setView }) => {
  const [formData, setFormData] = useState({ siteName: '', siteUsername: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPassword(formData);
      alert('Password saved securely!');
      setView('list'); // Redirect back to view passwords
    } catch (err) {
      alert('Error saving password');
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Credential</h3>
      <input type="text" placeholder="Site Name (e.g. Google)" required 
             onChange={e => setFormData({...formData, siteName: e.target.value})} />
      <input type="text" placeholder="Username/Email" required 
             onChange={e => setFormData({...formData, siteUsername: e.target.value})} />
      <input type="password" placeholder="Password" required 
             onChange={e => setFormData({...formData, password: e.target.value})} />
      <button type="submit">Encrypt & Save</button>
    </form>
  );
};

export default AddPassword;