import React from 'react'
import './home.scss'

const categories = [
  { title: 'Burgers', img: 'https://via.placeholder.com/150' },
  { title: 'Pizzas', img: 'https://via.placeholder.com/150' },
  { title: 'Drinks', img: 'https://via.placeholder.com/150' },
  { title: 'Desserts', img: 'https://via.placeholder.com/150' },
]

const featuredFoods = [
  { title: 'Cheese Burger', price: 120, review: 4.6, vendor: 'Burger Palace', img: 'https://via.placeholder.com/150' },
  { title: 'Spicy Pizza', price: 250, review: 4.7, vendor: 'Pizza World', img: 'https://via.placeholder.com/150' },
  { title: 'Cold Coffee', price: 90, review: 4.3, vendor: 'Snack Corner', img: 'https://via.placeholder.com/150' },
]

const featuredVendors = [
  { name: 'Burger Palace', rating: 4.8, review: 4.9, img: 'https://via.placeholder.com/150' },
  { name: 'Pizza World', rating: 4.5, review: 4.6, img: 'https://via.placeholder.com/150' },
]

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Delicious Food Delivered to You</h1>
        <p>Order your favorite meals from local vendors</p>
        <button>Order Now</button>
      </section>

      <section className="categories">
        <h2>Top Categories</h2>
        <div className="grid">
          {categories.map((cat, i) => (
            <div key={i} className="card">
              <img src={cat.img} alt={cat.title} />
              <p>{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="foods">
        <h2>Popular Foods</h2>
        <div className="grid">
          {featuredFoods.map((food, i) => (
            <div key={i} className="card">
              <img src={food.img} alt={food.title} />
              <h3>{food.title}</h3>
              <p className="vendor">{food.vendor}</p>
              <p className="review">⭐ {food.review}</p>
              <p>Tk {food.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="vendors">
        <h2>Top Vendors</h2>
        <div className="grid">
          {featuredVendors.map((vendor, i) => (
            <div key={i} className="card">
              <img src={vendor.img} alt={vendor.name} />
              <h3>{vendor.name}</h3>
              <p>⭐ {vendor.review}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          <div className="reason">🚀 Fast Delivery</div>
          <div className="reason">🍽️ Quality Foods</div>
          <div className="reason">💳 Easy Payments</div>
        </div>
      </section>
    </div>
  )
}

export default Home
