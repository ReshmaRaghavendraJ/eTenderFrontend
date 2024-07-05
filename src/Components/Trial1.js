import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trial1 = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save form data to session storage
    sessionStorage.setItem('formData', JSON.stringify(formData));
    // Redirect to the second form
    navigate('/Trial2');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Trial1;
