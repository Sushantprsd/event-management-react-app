import React from 'react';
import classes from './Footer.module.css'
import FooterContent from './FooterContent/FooterContens';

const Footer  = (props)=>{
   return(
      <div className={classes.Footer}>
         <FooterContent>Footer CONTENT HERE</FooterContent>
      </div>
   )
}

export default Footer

