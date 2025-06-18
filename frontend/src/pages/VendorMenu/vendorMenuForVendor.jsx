import React, { useState, useRef, useEffect } from 'react';
import './vendorMenuForVendor.scss';
import Switch from '../../components/Switch/switch.jsx';
import { MdAdd } from "react-icons/md";

import { vendorMenu } from '../../temporaryData/data.js';

const VendorMenuForVendor = () => {
  const [foodItems, setFoodItems] = useState(vendorMenu);

  const groupedByCategory = Object.entries(
    foodItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {})
  ).map(([category, items]) => ({ category, items }));

  const categoryRefs = useRef({});
  groupedByCategory.forEach(group => {
    if (!categoryRefs.current[group.category]) {
      categoryRefs.current[group.category] = React.createRef();
    }
  });

  const [activeCategory, setActiveCategory] = useState(groupedByCategory[0].category);

  const handleChangeStatus = (index, checked) => {
    const updated = [...foodItems];
    updated[index] = { ...updated[index], isAvailable: checked };
    setFoodItems(updated);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const cat = e.target.getAttribute('data-category');
          setActiveCategory(cat);
        }
      });
    }, {
      rootMargin: '-150px 0px -60% 0px',
      threshold: 0.1
    });

    groupedByCategory.forEach(group => {
      const el = categoryRefs.current[group.category]?.current;
      if (el) observer.observe(el);
    });

    return () => {
      groupedByCategory.forEach(group => {
        const el = categoryRefs.current[group.category]?.current;
        if (el) observer.unobserve(el);
      });
    };
  }, [groupedByCategory]);

  const handleSeeReview = () => {

  };

  return (
    <div className="vendor-own-menu">
      <h2 className="page-title">Vendor Food Menu</h2>

      {/* Category Navbar */}
      <div className="vendor-navbar">
        {groupedByCategory.map(group => (
          <button
            key={group.category}
            className={`category-btn ${activeCategory === group.category ? 'active' : ''}`}
            onClick={() => {
              const offset = 120;
              const el = categoryRefs.current[group.category]?.current;
              if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            }}
          >
            {group.category} ({group.items.length})
          </button>
        ))}
      </div>

      {/* Menu Sections */}
      {groupedByCategory.map(group => (
        <div
          key={group.category}
          ref={categoryRefs.current[group.category]}
          data-category={group.category}
          className="category-section"
        >
          <div className="heading">
            <p>{group.category}</p>
            <button className='add-btn'>
              <p>Add New</p>
              <MdAdd />
            </button>
          </div>
          <div className="food-grid">
            {group.items.map((item, idx) => {
              const globalIndex = foodItems.findIndex(fi => fi.id === item.id);
              return (
                <div key={item.id} className="card">
                  <div className="image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="details">
                    <div className="left">
                      <h2>{item.title}</h2>
                      <p className="description">{item.description}</p>
                    </div>
                    <div className="right">
                      <p className="rating">
                        ⭐ {item.rating}/5 <span className="reviews">({item.reviewCount})</span>
                      </p>
                      <p className="see-review" onClick={handleSeeReview}>See Reviews</p>
                      <p className="price">৳ {item.price}</p>
                    </div>
                  </div>
                  <div className="edit">
                    <div
                      className={`switch-status ${item.isAvailable ? 'available' : 'not-available'}`}
                    >
                      <Switch
                        checked={item.isAvailable}
                        onChange={checked => handleChangeStatus(globalIndex, checked)}
                        onLabel="Available"
                        offLabel="Not Available"
                        labelSize="18px"
                      />
                    </div>
                    <button className="edit-btn">Edit Details</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorMenuForVendor;
