import React from 'react'
import './cart.scss'

const cartItems = [
  { id: 1, title: 'Burger', price: 120, quantity: 2, vendor: 'FastFood Express', img: 'https://via.placeholder.com/100' },
  { id: 2, title: 'Pizza', price: 250, quantity: 1, vendor: 'Italian Bites', img: 'https://via.placeholder.com/100' },
]

const Cart = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="cart-page">
      <h1 className="title">Your Cart</h1>
      <div className="cart-items">
        {cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.img} alt={item.title} />
            <div className="details">
              <h2>{item.title}</h2>
              <p className="vendor">{item.vendor}</p>
              <p>Price: Tk {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p className="subtotal">Subtotal: Tk {item.price * item.quantity}</p>
              <button className="remove-btn">Remove Item</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        <h2>Total: Tk {total}</h2>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  )
}

export default Cart
