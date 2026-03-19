import React, { useState, useRef, useEffect } from 'react';
import './vendorMenuForVendor.scss';
import { fetchVendorMenu } from './vendorMenuApi.js';
import { MdAdd } from "react-icons/md";
import FoodItemForm from '../../components/PopUps/foodItemForm.jsx';
import { useNavigate } from 'react-router-dom';

// import { vendorMenu } from '../../temporaryData/data.js';

const VendorMenuForVendor = ({ mainRef }) => {

  const navigate = useNavigate();

  const [foodItems, setFoodItems] = useState([]);
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const loadVendorMenu = async () => {
      const response = await fetchVendorMenu(false);

      if (!response || response.error) {
        alert(response?.error || "Failed to load menu");
        // navigate(-1);
        return;
      }
      // console.log(response);
      setFoodItems(response.data);
    };

    loadVendorMenu();
  }, []);

  // Add new or update existing food item
  const handleAddOrUpdateItem = () => {
    setEditingItem(null);
    setShowFoodForm(false);
    window.location.reload(); 
  };

  // Group items by category
  const groupedByCategory = Object.entries(
    foodItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {})
  ).map(([category, items]) => ({ category, items }));

  // refs for scroll tracking
  const categoryRefs = useRef({});
  groupedByCategory.forEach(group => {
    if (!categoryRefs.current[group.category]) {
      categoryRefs.current[group.category] = React.createRef();
    }
  });

  const [activeCategory, setActiveCategory] = useState(groupedByCategory[0]?.category || "");

  // Scroll spy for navbar active category
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

  const handleSeeReview = (itemId) => {
    navigate(`/vendor_reviews/${itemId}`);
  };

  return (
    <div className="vendor-own-menu">
      <h2 className="page-title">Vendor Food Menu</h2>

      {/* Navbar with add button and categories */}
      <div className="vendor-navbar">
        <button
          className='add-btn'
          onClick={() => {
            setEditingItem(null);
            setShowFoodForm(true);
          }}
        >
          <p>Add New</p>
          <MdAdd />
        </button>

        {groupedByCategory.map(group => (
          <button
            key={group.category}
            className={`category-btn ${activeCategory === group.category ? 'active' : ''}`}
            onClick={() => {
              const offset = 120;
              const el = categoryRefs.current[group.category]?.current;
              if (el) mainRef.current.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            }}
          >
            {group.category} ({group.items.length})
          </button>
        ))}
      </div>

      {/* Food items */}
      {groupedByCategory.map(group => (
        <div
          key={group.category}
          ref={categoryRefs.current[group.category]}
          data-category={group.category}
          className="category-section"
        >
          <div className="heading">
            <p>{group.category}</p>
          </div>

          <div className="food-grid">
            {group.items.map(item => {
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
                      <p className="order-count">Total Orders: {item.orderCount || 0}</p>
                    </div>

                    <div className="right">
                      <p className="rating">
                        ⭐ {item.rating}/5 <span className="reviews">({item.reviewCount})</span>
                      </p>
                      <p className="see-review" onClick={() => handleSeeReview(item.id)}>See Reviews</p>
                      <p className="price">৳ {item.price}</p>
                    </div>
                  </div>

                  <div className="edit">
                    <div className={`available-status ${item.isAvailable ? 'available' : 'not-available'}`}>
                      {item.isAvailable ? 'Available' : 'Not Available'}
                    </div>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingItem(item);
                        setShowFoodForm(true);
                      }}
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Popup form for add/edit */}
      {showFoodForm && (
        <FoodItemForm
          onClose={() => {
            setShowFoodForm(false);
            setEditingItem(null);
          }}
          onSave={handleAddOrUpdateItem}
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default VendorMenuForVendor;