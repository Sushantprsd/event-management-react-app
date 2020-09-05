import React from 'react';
import  './Logo.css';
import portalLogo from '../../assets/icons/logo.png';

const Logo = (props) => {
   return (
      <div className="Logo">
         <img src={portalLogo}  alt="Portal" />
      </div>
   )
}

export default Logo;