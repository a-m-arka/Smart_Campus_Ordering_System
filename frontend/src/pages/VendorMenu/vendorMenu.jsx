import React from 'react'
import './vendorMenu.scss'

const foodItems = [
  {
    id: 1,
    name: 'Margherita Pizza',
    price: 120,
    description: 'Classic cheese and tomato pizza',
    img: 'https://via.placeholder.com/150',
    rating: 4.6,
  },
  {
    id: 2,
    name: 'BBQ Chicken Wings',
    price: 150,
    description: 'Spicy and smoky wings',
    img: 'https://via.placeholder.com/150',
    rating: 4.4,
  },
  {
    id: 3,
    name: 'Veggie Burger',
    price: 100,
    description: 'Loaded with fresh veggies',
    img: 'https://via.placeholder.com/150',
    rating: 4.1,
  },
  {
    id: 4,
    name: 'Caesar Salad',
    price: 80,
    description: 'Fresh romaine with creamy dressing',
    img: 'https://via.placeholder.com/150',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Chocolate Cake',
    price: 60,
    description: 'Rich and moist chocolate cake',
    img: 'https://via.placeholder.com/150',
    rating: 4.8,
  },
]

const VendorMenu = () => {
  return (
    <div className="vendor-menu">
      <h2>Vendor Food Menu</h2>
      <div className="grid">
        {foodItems.map(item => (
          <div key={item.id} className="card">
            <img src={item.img} alt={item.name} className="food-img" />
            <h3>{item.name}</h3>
            <p className="desc">{item.description}</p>
            <p className="price">Tk {item.price}</p>
            <p className="rating">⭐ {item.rating}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VendorMenu
