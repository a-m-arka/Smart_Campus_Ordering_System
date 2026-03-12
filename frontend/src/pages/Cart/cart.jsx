import React, { useEffect, useState } from 'react'
import './cart.scss'
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io";

const server = process.env.REACT_APP_SERVER;

const Cart = () => {

  const [groupedCart, setGroupedCart] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [loadingCart, setLoadingCart] = useState(null);

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

  const handleAddressChange = (vendorId, value) => {
    setDeliveryAddresses(prev => ({
      ...prev,
      [vendorId]: value
    }));
  };

  const handlePaymentChange = (vendorId, method) => {
    setPaymentMethods(prev => ({
      ...prev,
      [vendorId]: method
    }));
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

  const handlePlaceOrder = async (vendor, deliveryAddress, paymentMethod = "cod") => {
    if (!deliveryAddress || deliveryAddress.trim() === "") {
      alert("Please enter a delivery address");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order");
      window.location.reload();
      return;
    }

    setLoadingCart(vendor.id);

    const payload = {
      vendorId: vendor.id,
      deliveryAddress,
      paymentMethod,
      items: vendor.items.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch(`${server}/api/order/place-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${data.orderId}`);
        const newGroupedCart = groupedCart.filter(group => group.id !== vendor.id);
        setGroupedCart(newGroupedCart);
        updateSessionCart(newGroupedCart);
      } else {
        alert(data.message || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoadingCart(null);
    }
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
                      <div className="label">Quantity:</div>
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

              <div className="checkout-form">

                <div className="form-group">
                  <label>Delivery Address</label>
                  <input
                    type="text"
                    placeholder="Enter delivery address"
                    value={deliveryAddresses[vendorGroup.id] || ""}
                    onChange={(e) =>
                      handleAddressChange(vendorGroup.id, e.target.value)
                    }
                  />
                </div>

                <div className="form-group payment-method">
                  <label>Payment Method</label>

                  <div className="radio-option">
                    <input
                      type="radio"
                      name={`payment-${vendorGroup.id}`}
                      value="cod"
                      checked={(paymentMethods[vendorGroup.id] || "cod") === "cod"}
                      onChange={() => handlePaymentChange(vendorGroup.id, "cod")}
                    />
                    <span>Cash on Delivery</span>
                  </div>

                  <div className="radio-option">
                    <input
                      type="radio"
                      name={`payment-${vendorGroup.id}`}
                      value="mobile"
                      checked={(paymentMethods[vendorGroup.id] || "cod") === "mobile"}
                      onChange={() => handlePaymentChange(vendorGroup.id, "mobile")}
                    />
                    <span>Mobile Banking</span>
                  </div>

                </div>

              </div>

              <p className="total">
                Total: <span>৳ {calculateVendorTotal(vendorGroup.items)}</span>
              </p>

              <button
                className='order-btn'
                onClick={() => handlePlaceOrder(
                  vendorGroup,
                  deliveryAddresses[vendorGroup.id],
                  paymentMethods[vendorGroup.id],
                )}
                disabled={loadingCart === vendorGroup.id}
              >
                {loadingCart === vendorGroup.id ? "Placing Order..." : "Place Order"}
              </button>

            </div>

          </div>
        ))
      )}
    </div>
  );
}

export default Cart;