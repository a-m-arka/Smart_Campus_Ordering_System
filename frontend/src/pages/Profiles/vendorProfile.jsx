import React, { useState } from 'react'
import './vendorProfile.scss'

const initialFoodItems = [
  { id: 1, name: 'Margherita Pizza', price: 12, quantity: 10, description: 'Classic cheese and tomato pizza' },
  { id: 2, name: 'BBQ Chicken Wings', price: 15, quantity: 20, description: 'Spicy and smoky wings' },
  { id: 3, name: 'Veggie Burger', price: 10, quantity: 15, description: 'Loaded with fresh veggies' },
]

const initialOrders = [
  { id: 'ORD101', item: 'Margherita Pizza', customer: 'John Doe', quantity: 2, status: 'pending' },
  { id: 'ORD102', item: 'BBQ Chicken Wings', customer: 'Alice', quantity: 1, status: 'preparing' },
]

const statusOptions = ['pending', 'preparing', 'ready', 'shipped']

const VendorProfile = () => {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [orders, setOrders] = useState(initialOrders)

  const [newFood, setNewFood] = useState({ name: '', price: '', quantity: '', description: '' })

  const [editFoodId, setEditFoodId] = useState(null)
  const [editFoodData, setEditFoodData] = useState({ name: '', price: '', quantity: '', description: '' })

  const handleAddFood = e => {
    e.preventDefault()
    if (!newFood.name || !newFood.price || !newFood.quantity) return
    const newItem = {
      id: foodItems.length ? foodItems[foodItems.length - 1].id + 1 : 1,
      name: newFood.name,
      price: Number(newFood.price),
      quantity: Number(newFood.quantity),
      description: newFood.description,
    }
    setFoodItems([...foodItems, newItem])
    setNewFood({ name: '', price: '', quantity: '', description: '' })
  }

  const handleEditClick = item => {
    setEditFoodId(item.id)
    setEditFoodData({ name: item.name, price: item.price, quantity: item.quantity, description: item.description })
  }

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditFoodData(prev => ({ ...prev, [name]: value }))
  }

  const handleEditSave = id => {
    setFoodItems(
      foodItems.map(item =>
        item.id === id
          ? {
              ...item,
              name: editFoodData.name,
              price: Number(editFoodData.price),
              quantity: Number(editFoodData.quantity),
              description: editFoodData.description,
            }
          : item
      )
    )
    setEditFoodId(null)
  }

  const handleEditCancel = () => setEditFoodId(null)

  const handleDeleteFood = id => {
    setFoodItems(foodItems.filter(item => item.id !== id))
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  return (
    <div className="vendor-profile">
      <h1>Vendor Profile</h1>

      <section className="food-items">
        <h2>Your Food Items</h2>

        <form className="add-food-form" onSubmit={handleAddFood}>
          <input
            type="text"
            name="name"
            placeholder="Food name"
            value={newFood.name}
            onChange={e => setNewFood(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newFood.price}
            onChange={e => setNewFood(prev => ({ ...prev, price: e.target.value }))}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newFood.quantity}
            onChange={e => setNewFood(prev => ({ ...prev, quantity: e.target.value }))}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newFood.description}
            onChange={e => setNewFood(prev => ({ ...prev, description: e.target.value }))}
          />
          <button type="submit">Add Food</button>
        </form>

        <div className="food-list">
          {foodItems.map(item =>
            editFoodId === item.id ? (
              <div key={item.id} className="food-card editing">
                <input type="text" name="name" value={editFoodData.name} onChange={handleEditChange} />
                <input type="number" name="price" value={editFoodData.price} onChange={handleEditChange} />
                <input type="number" name="quantity" value={editFoodData.quantity} onChange={handleEditChange} />
                <input type="text" name="description" value={editFoodData.description} onChange={handleEditChange} />
                <button onClick={() => handleEditSave(item.id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <div key={item.id} className="food-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: Tk {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDeleteFood(item.id)}>Delete</button>
              </div>
            )
          )}
        </div>
      </section>

      <section className="orders">
        <h2>Current Orders</h2>
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Item:</strong> {order.item}</p>
              <p><strong>Customer:</strong> {order.customer}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p>
                <strong>Status:</strong>{' '}
                <select value={order.status} onChange={e => handleStatusChange(order.id, e.target.value)}>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default VendorProfile
