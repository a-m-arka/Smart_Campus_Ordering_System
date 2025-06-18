import React, { useState } from 'react'
import './vendorProfile.scss'
import defaultLogo from '../../images/default_logo.jpg'
import { MdOutlineLocationOn } from "react-icons/md";
import { useGlobalContext } from '../../context/GlobalContext.js'
import Switch from '../../components/Switch/switch.jsx'

import pizza from '../../images/pizza.jpg'
import burger from '../../images/burger.jpg'
import wings from '../../images/wings.jpg'

const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 12,
    status: 'Available',
    description: 'Classic cheese and tomato pizza',
    rating: 4.5,
    image: pizza
  },
  {
    id: 2,
    name: 'BBQ Chicken Wings',
    price: 15,
    status: 'Available',
    description: 'Spicy and smoky wings',
    rating: 4.2,
    image: wings
  },
  {
    id: 3,
    name: 'Veggie Burger',
    price: 10,
    status: 'Not Available',
    description: 'Loaded with fresh veggies',
    rating: 4.0,
    image: burger
  },
]

const orders = [
  { id: 'ORD101', item: 'Margherita Pizza', customer: 'John Doe', quantity: 2, price: 600 },
  { id: 'ORD102', item: 'BBQ Chicken Wings', customer: 'Alice', quantity: 1, price: 150 },
]

const VendorProfile = () => {
  const { userData } = useGlobalContext();

  // console.log(userData.data);

  const vendorData = {
    id: userData?.data?.id || "N/A",
    name: userData?.data?.name || "N/A",
    email: userData?.data?.email || "N/A",
    phone: userData?.data?.phone || "N/A",
    stall_name: userData?.data?.stall_name || "N/A",
    stall_location: userData?.data?.stall_location || "N/A",
    logo_url: userData?.data?.logo_url || defaultLogo,
    average_rating: userData?.data?.average_rating
      ? parseFloat(userData.data.average_rating).toFixed(1)
      : "0.0",
    review_count: userData?.data?.review_count || 0,
    is_open: Boolean(userData?.data?.is_open)
  };

  // console.log(vendorData);

  const [isOpen, setIsOpen] = useState(vendorData.is_open);

  const handleToggleOpen = (checked) => {
    setIsOpen(checked);
  };

  return (
    <div className="vendor-profile">
      <div className="left">
        <div className="top">
          <img src={vendorData.logo_url} alt="" />
          <div className="vendor-details">
            <p className='vendor-name'>
              {vendorData.stall_name}
              <span className={`${isOpen ? 'available' : 'not-available'}`}>
                ({isOpen ? 'Open Now' : 'Closed Now'})
              </span>
            </p>
            <p className='vendor-location'>
              <MdOutlineLocationOn className='icon' />
              <span>{vendorData.stall_location}</span>
            </p>
            <p className='vendor-rating'>Rating : ⭐ <span>{parseFloat(vendorData.average_rating).toFixed(1)}/5</span></p>
            <div className="open-close-switch">
              <Switch
                checked={isOpen}
                onChange={handleToggleOpen}
                onLabel={"Close Stall"}
                offLabel={"Open Stall"}
                labelSize={"20px"}
              />
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="proprietor-details">
            <p className="heading">Proprietor</p>
            <div className="data">
              <p className='info'>
                <span className='key'>Name</span>
                <span className='colon'>:</span>
                <span className='value'>{vendorData.name}</span>
              </p>
              <p className='info'>
                <span className='key'>Email</span>
                <span className='colon'>:</span>
                <span className='value'>{vendorData.email}</span>
              </p>
              <p className='info'>
                <span className='key'>Phone</span>
                <span className='colon'>:</span>
                <span className='value'>{vendorData.phone}</span>
              </p>
            </div>
          </div>

          <div className="stats">
            <p className="heading">Stats</p>
            <div className="data">
              <p className='info'>
                <span className='key'>Total Orders</span>
                <span className='colon'>:</span>
                <span className='value'>105</span>
              </p>
              <p className='info'>
                <span className='key'>Total Food Items</span>
                <span className='colon'>:</span>
                <span className='value'>12</span>
              </p>
              <p className='info'>
                <span className='key'>Total Reviews</span>
                <span className='colon'>:</span>
                <span className='value'>{vendorData.review_count}</span>
              </p>
            </div>
          </div>

          <div className="buttons">
            <button>See Reviews</button>
            <button>Edit Profile</button>
            <button>Change Password</button>
            <button>Change Logo</button>
          </div>
        </div>
      </div>

      <div className="right">
        <div className="dashboard">
          <div className="food_items">
            <p className="heading">Top Rated Food Items</p>
            <div className="cards">
              {foodItems.map(item => (
                <div className="card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <p className='name'>{item.name}</p>
                  <p className='price'>Price: ৳ {item.price}</p>
                  <p className="rating">Rating: ⭐ <span>{item.rating}/5</span></p>
                  <p className='status'>Status: <span className={item.status === 'Available' ? 'available' : 'not-available'}>{item.status}</span></p>
                  <p className='description'>{item.description}</p>
                </div>
              ))}
            </div>
            <div className="view-button">
              <button>View All</button>
            </div>
          </div>

          <div className="order-history">
            <p className="heading">Recent Orders</p>
            <div className="cards">
              {orders.map(order => (
                <div className="card" key={order.id}>
                  <p className='order-id'>Order ID: {order.id}</p>
                  <p className='item'>Item: {order.item}</p>
                  <p className='customer'>Customer: {order.customer}</p>
                  <p className='quantity'>Quantity: {order.quantity}</p>
                  <p className='price'>Price: ৳ {order.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorProfile
