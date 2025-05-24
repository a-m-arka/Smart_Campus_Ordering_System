import React from 'react';
import './studentProfile.scss';

const student = {
  id: 'CUET2023123',
  name: 'John Doe',
  email: 'john.doe@cuet.ac.bd',
  phone: '017xxxxxxxx',
  address: 'Shaheed Tareq Huda Hall, CUET',
};

const currentOrders = [
  { id: 'ORD001', item: 'Chicken Burger', vendor: 'Foodies', status: 'Preparing' },
  { id: 'ORD002', item: 'Fried Rice', vendor: 'Rice House', status: 'Out for delivery' },
];

const orderHistory = [
  { id: 'ORD000', item: 'Pizza', vendor: 'Pizza Hub', date: '2025-05-20' },
  { id: 'ORD099', item: 'Shawarma', vendor: 'Grill Master', date: '2025-05-18' },
];

const StudentProfile = () => {
  return (
    <div className="student-profile">
      <div className="profile-section">
        <h2>Profile Information</h2>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Address:</strong> {student.address}</p>
      </div>

      <div className="orders-section">
        <h2>Current Orders</h2>
        <div className="orders-grid">
          {currentOrders.map(order => (
            <div className="order-card" key={order.id}>
              <h3>{order.item}</h3>
              <p><strong>Vendor:</strong> {order.vendor}</p>
              <p>Status: {order.status}</p>
              <button className="cancel-btn">Cancel Order</button>
            </div>
          ))}
        </div>

        <h2>Order History</h2>
        <div className="orders-grid">
          {orderHistory.map(order => (
            <div className="order-card" key={order.id}>
              <h3>{order.item}</h3>
              <p><strong>Vendor:</strong> {order.vendor}</p>
              <p>Ordered on: {order.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
