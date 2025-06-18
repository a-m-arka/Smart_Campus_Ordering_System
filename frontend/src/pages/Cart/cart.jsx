import React, { useEffect, useState } from 'react'
import './cart.scss'
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";

const Cart = () => {
  const [groupedCart, setGroupedCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];

    const grouped = [];

    storedCart.forEach(item => {
      const existingVendor = grouped.find(group => group.id === item.vendorId);

      if (existingVendor) {
        existingVendor.items.push(item);
      } else {
        grouped.push({
          id: item.vendorId,
          name: item.vendor,
          location: item.vendorLocation,
          items: [item],
        });
      }
    });

    setGroupedCart(grouped);
  }, []);

  const updateSessionCart = (newGroupedCart) => {
    const updatedFlatCart = newGroupedCart.flatMap(group => group.items);
    sessionStorage.setItem('cart', JSON.stringify(updatedFlatCart));
  };

  const handlePlus = (vendorId, itemId) => {
    const newGroupedCart = groupedCart.map(group => {
      if (group.id === vendorId) {
        return {
          ...group,
          items: group.items.map(item =>
            item.id === itemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return group;
    });

    setGroupedCart(newGroupedCart);
    updateSessionCart(newGroupedCart);
  };

  const handleMinus = (vendorId, itemId) => {
    const newGroupedCart = groupedCart.map(group => {
      if (group.id === vendorId) {
        return {
          ...group,
          items: group.items.map(item =>
            item.id === itemId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        };
      }
      return group;
    });

    setGroupedCart(newGroupedCart);
    updateSessionCart(newGroupedCart);
  };

  const handleRemoveItem = (vendorId, itemId) => {
    const newGroupedCart = groupedCart
      .map(group => {
        if (group.id === vendorId) {
          const filteredItems = group.items.filter(item => item.id !== itemId);
          return { ...group, items: filteredItems };
        }
        return group;
      })
      .filter(group => group.items.length > 0);

    setGroupedCart(newGroupedCart);
    updateSessionCart(newGroupedCart);
  };

  const calculateVendorTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-page">
      <h1 className="page-title">Your Cart</h1>

      {groupedCart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        groupedCart.map(vendorGroup => (
          <div key={vendorGroup.id} className="mini-cart">
            <div className="vendor-data">
              <h2 className="vendor-name">{vendorGroup.name}</h2>
              <h4 className="vendor-location">{vendorGroup.location}</h4>
            </div>
            <div className="mini-cart-items">
              {vendorGroup.items.map(item => (
                <div className="item" key={`${vendorGroup.id}-${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <div className="details">
                    <h3 className='item-title'>{item.title}</h3>
                    <div className='item-price'>
                      <div className="label">Price:</div>
                      <div className="value"> ৳ {item.price}</div>
                    </div>
                    <div className='item-quantity'>
                      <div className="label">Quantity: </div>
                      <div className="value">
                        <IoMdRemoveCircle
                          className='change-icon'
                          onClick={() => handleMinus(vendorGroup.id, item.id)}
                        />
                        <div className='current-value'>{item.quantity}</div>
                        <IoMdAddCircle
                          className='change-icon'
                          onClick={() => handlePlus(vendorGroup.id, item.id)}
                        />
                      </div>
                    </div>
                    <div className="subtotal">
                      <div className="label">Subtotal:</div>
                      <div className="value"> ৳ {item.price * item.quantity}</div>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(vendorGroup.id, item.id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-section">
              <p className="total">Total: <span>৳ {calculateVendorTotal(vendorGroup.items)}</span></p>
              <button className='order-btn'>Place Order</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
