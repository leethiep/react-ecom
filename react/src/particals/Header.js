// Header.js
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import Input from '../components/Input';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    onSearch(searchQuery);
  };
  
  return (
    <div className='header text-center d-flex flex-column align-items-center py-3'>
      <img src={logo} alt="logo image" className='image-fluid logo-image' />
      <h1 className='display-5 text-light p-2'>Stop looking for an item - find it</h1>
      <Input onSearch={handleSearch} />
    </div>
  );
}

export default Header;
