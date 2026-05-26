import React, { useState, useEffect } from 'react'
import './home.scss'
import { useNavigate } from 'react-router-dom'


import FoodCard from '../../components/Cards/foodCard.jsx'
import LottieIcon from '../../components/LottieIcon/lottieIcon.jsx'
import DeliveryIcon from '../../assets/DeliveryIcon.json'
import VendorIcon from '../../assets/VendorIcon.json'
import StudentIcon from '../../assets/StudentIcon.json'


const Home = () => {
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate()
  const [topFoods, setTopFoods] = useState([]);
  const [topVendors, setTopVendors] = useState([]);

  useEffect(() => {
    fetchTopFoodsAndVendors();
  }, []);

  const fetchTopFoodsAndVendors = async () => {
    try {
      const response = await fetch(`${server}/api/public/top-foods-vendors`);
      const result = await response.json();
      if (response.ok) {
        setTopFoods(result.data.topFoods);
        setTopVendors(result.data.topVendors);
      } else {
        console.error('Error fetching top foods and vendors:', result.message);
      }
    } catch (error) {
      console.error('Error fetching top foods and vendors:', error);
    }
  };

  const handleOrderNow = () => {
    navigate('/foods')
  }

  const handleMenuClick = (vendorData) => {
    // console.log(vendorData)
    navigate(
      `/vendors/${vendorData.id}`
    )
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>From Kitchen To Campus </h1>
        <h1 style={{ color: "rgb(255, 115, 0)" }}>Fast & Fresh</h1>
        <p>Order your favorite meals from local vendors</p>
        <button onClick={handleOrderNow}>Order Now</button>
      </section>

      <section className="perks">

        <div className="perk">
          <LottieIcon animation={DeliveryIcon} size={350} />
          <h3>Lightning-Fast Delivery</h3>
          <p>
            Hot meals delivered to CUET campus in record time.
            Fresh food arrives while it's still warm.
          </p>
        </div>

        <div className="perk">
          <LottieIcon animation={StudentIcon} size={350} />
          <h3>Student-Friendly Deals</h3>
          <p>
            Delicious meals that fit your student budget.
            Exclusive discounts made for everyday campus life.
          </p>
        </div>

        <div className="perk">
          <LottieIcon animation={VendorIcon} size={350} />
          <h3>Verified Local Vendors</h3>
          <p>
            Trusted vendors serving quality meals every time.
            Hygienic preparation and consistent taste guaranteed.
          </p>
        </div>

      </section>

      <section className="top-foods">
        <h2>Top Foods</h2>
        <div className="food-list">
          {topFoods.map((food) => (
            <FoodCard key={food.id} item={food} showVendor={true} onHomePage={true} />
          ))}
        </div>
      </section>

      <section className="top-vendors">
        <h2>Top Vendors</h2>
        <div className="vendor-list">
          {topVendors.map((vendor) => (
            <div key={vendor.id} className="vendor-card" onClick={() => handleMenuClick(vendor)}>
              <img src={vendor.image} alt={vendor.name} />
              <div className="details">
                <div className="left">
                  <h2>{vendor.name}</h2>
                  <p className="location">{vendor.location || 'N/A'}</p>
                </div>
                <div className="right">
                  <p className="rating">⭐ <span>{vendor.rating}/5</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default Home
