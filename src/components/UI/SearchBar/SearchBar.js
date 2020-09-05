import React from 'react';
import './SearchBar.css'
import { MdSearch } from "react-icons/md";

const SearchBar = (props) => {
   return (
      <div className="SearchForm">
         <div title="Search" className="SearchIcon">
           <MdSearch size='1rem' />
         </div>
         <div className="SearchBarBlock">
            <input className="SearchBar" placeholder="Search" />
         </div>
      </div>
   )
}

export default SearchBar;