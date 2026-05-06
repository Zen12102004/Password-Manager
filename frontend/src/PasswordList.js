import React, { useEffect, useState } from 'react';
import { fetchPasswords } from './api';

const PasswordList = () => {
  const [passwords, setPasswords] = useState([]);
  const [visibleId, setVisibleId] = useState(null);

  useEffect(() => {
    const getPasswords = async () => {
      try {
        const { data } = await fetchPasswords();
        setPasswords(data);
      } catch (err) { console.error("Access Denied"); }
    };
    getPasswords();
  }, []);

  
  const toggleVisibility = async (id) => {
  if (visibleId === id) {
    setVisibleId(null);
    return;
  }

  const passwordCheck = prompt("Please enter your Master Password to view this entry:");
  
  if (passwordCheck) {
    try {
      await revalidate(passwordCheck);
      setVisibleId(id); // Only shows if the backend returns success
    } catch (err) {
      alert("Incorrect Master Password. Access Denied.");
    }
  }
};
  return (
    <div className="password-list-wrapper">
      <table className="password-table">
        <thead>
          <tr>
            <th>Site</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map(p => (
            <tr key={p.id}>
              <td><strong>{p.siteName}</strong></td>
              <td>{p.siteUsername}</td>
              <td>
                <input 
                  type={visibleId === p.id ? "text" : "password"} 
                  value={p.password} 
                  readOnly 
                  className="password-field"
                />
              </td>
              <td>
                <button onClick={() => toggleVisibility(p.id)} className="visibility-btn">
                  {visibleId === p.id ? "Hide" : "Show"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordList;