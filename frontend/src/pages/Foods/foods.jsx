import React, { useState } from 'react'
import './foods.scss'
import SearchBox from '../../components/Searchbox/searchbox.jsx'

const data = [
  { id: 1, title: 'Burger',   price: 120, vendor: 'Foodies Hub',      review: 4.5, img: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Pizza',    price: 250, vendor: 'Pizza World',      review: 4.7, img: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Sandwich', price:  90, vendor: 'Snack Corner',     review: 4.2, img: 'https://via.placeholder.com/150' },
  { id: 4, title: 'Pasta',    price: 180, vendor: 'Italiano Express', review: 4.6, img: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Salad',    price:  80, vendor: 'Green Bites',      review: 4.0, img: 'https://via.placeholder.com/150' }
]

const Foods = () => {
  const [query, setQuery] = useState('')

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.vendor.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="foods-page">
      <h1 className="title">Food Items</h1>
      <SearchBox onSearch={setQuery} searchFor="Foods" />
      <div className="foods-grid">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item.id} className="food-card">
              <img src={item.img} alt={item.title} />
              <h2>{item.title}</h2>
              <p className="vendor">{item.vendor}</p>
              <p className="review">⭐ {item.review}</p>
              <p className="price">Tk&nbsp;{item.price}</p>
              <button className="add-btn">Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-result">No items found.</p>
        )}
      </div>
    </div>
  )
}

export default Foods
