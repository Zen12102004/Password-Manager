import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', masterPassword: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      localStorage.setItem('token', data.token); // Store token for future API calls
      navigate('/dashboard'); // Move to Step 5: Show Menu
    } catch (err) {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="auth-form">
      <h2>Master Password Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          required 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Master Password" 
          required 
          onChange={(e) => setFormData({...formData, masterPassword: e.target.value})} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;