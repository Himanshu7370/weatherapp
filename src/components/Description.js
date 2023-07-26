import React from 'react';
import "./Description.css";
import { FaArrowDown, FaArrowUp} from "react-icons/fa";

const Description = ({ temp_min, temp_max, humidity }) => {
  return (
    <div className="section section_descriptions">
      <div className="card">
        <div className="description_card-icon">
          <FaArrowDown />
          <small>min</small>
        </div>
        <h2>{temp_min} °C</h2>
      </div>
      <div className="card">
        <div className="description_card-icon">
          <FaArrowUp />
          <small>max</small>
        </div>
        <h2>{temp_max} °C</h2>
      </div>
      <div className="card">
        <div className="description_card-icon">
          
          <small>humidity</small>
        </div>
        <h2>{humidity}%</h2>
      </div>
     
    </div>
  );
};

export default Description;
