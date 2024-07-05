import React, { useEffect, useState } from 'react';

const Trial2 = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    // Retrieve form data from session storage
    const storedFormData = sessionStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  return (
    <form>
      <label>
    Full Name:
        <input type="text" name="name" value={formData.name} readOnly />
      </label>
      <label>
        Email-id:
        <input type="email" name="email" value={formData.email} readOnly />
      </label>
      {/* Additional fields and submit button for the second form */}
    </form>
  );
};

export default Trial2;
