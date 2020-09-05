import React from 'react';
import './Spinner.css'
// import { css } from 'glamor';

const Spinner = (props) => {
   // let styles = null;
   // if (props.specialStyle) {
   //    styles = css(props.specialStyle)
   // }
   return (
      <div className = 'loadContainer'>
      <div className="ring"><div></div><div></div><div></div><div></div></div>
      </div>
   )
}

export default Spinner;