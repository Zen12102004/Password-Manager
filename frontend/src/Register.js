import React, { useState } from 'react';
import { register } from './api';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', masterPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful! Please login.');
    } catch (err) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Set Master Password</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Master Password" 
          onChange={(e) => setFormData({...formData, masterPassword: e.target.value})} 
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;