import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import Input from '../components/Input';

function Header() {
  return (
    <div className='header text-center d-flex flex-column align-items-center py-3'>
      <img src={logo} alt="logo image" className='image-fluid logo-image' />
      <h1 className='display-5 text-light p-2'>Stop looking for an item - find it</h1>
      <Input/>
    </div>
  );
}

export default Header;
