import React, { useState,useEffect } from "react";

function FreeShipping({ onSelectFreeShipping, selectedFreeShipping}) {
  const [isFreeShipping, setIsFreeShipping] = useState(null);

  // Hàm callback để truyền giá trị freeShipping về component cha
  const handleFreeShippingChange = (isChecked) => {
    setIsFreeShipping(isChecked);
    onSelectFreeShipping(isChecked);
  };
  useEffect(() => {
    setIsFreeShipping(selectedFreeShipping);
  }, [selectedFreeShipping]);
  
  return (
    <div className="sidebar__section">
      <p className="sidebar__title">Free Shipping</p>
      <div className="d-flex">
        <span className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Display only items with free shipping
        </span>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isFreeShipping}
            onChange={(e) => handleFreeShippingChange(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}

export default FreeShipping;
