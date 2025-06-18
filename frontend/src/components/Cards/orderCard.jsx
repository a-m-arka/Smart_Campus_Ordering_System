import React, { useState } from 'react'
import './orderCard.scss'
import { useNavigate } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { formatTime } from '../HelperFunctions/formatTime';

const OrderCard = ({ order, orderType, userType }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState(order.status);

    const handleVendorClick = () => {
        navigate(`/vendors/${order.vendor.id}`);
    };

    const getNextStatus = (current) => {
        const statusFlow = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
        const index = statusFlow.indexOf(current);
        return index < statusFlow.length - 1 ? statusFlow[index + 1] : null;
    };

    const getButtonLabel = (current) => {
        switch (current) {
            case 'pending': return 'Confirm Order';
            case 'confirmed': return 'Start Preparing';
            case 'preparing': return 'Dispatch Order';
            case 'out_for_delivery': return 'Mark as Delivered';
            default: return null;
        }
    };

    const handleStatusChange = () => {
        const next = getNextStatus(status);
        if (next) setStatus(next);
    };

    return (
        <div className='order-card'>
            <div className="order-details">
                <span className='left'>
                    <p className="order-id">Order No. : {order.orderId}</p>
                    {orderType === 'current' && (
                        <p className="order-status">
                            Status :
                            <span> {status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                        </p>
                    )}
                    {userType === 'student' && (
                        <div className="order-vendor">
                            <span>Vendor : </span>
                            <span className='name-phone'>
                                <span className='vendor-name' onClick={handleVendorClick}>{order.vendor.stallName}</span>
                                <span className='phone'>
                                    <FaPhoneAlt />
                                    <span>{order.vendor.phone}</span>
                                </span>
                            </span>
                        </div>
                    )}
                    {userType === 'vendor' && (
                        <div className="order-student">
                            <span>Ordered By : </span>
                            <span className='name-phone'>
                                <span>{order.student.name}</span>
                                <span className='phone'>
                                    <FaPhoneAlt />
                                    <span>{order.student.phone}</span>
                                </span>
                            </span>
                        </div>
                    )}
                </span>
                <span className='right'>
                    <p className="amount">Total : ৳ {order.totalAmount}</p>
                    {orderType === 'current' && (
                        <p className="payment-status">Payment Status : <span> {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</span></p>
                    )}
                    <p className="delivery-address">Delivery Address : {order.deliveryAddress}</p>
                    <p className="order-time">Order Time : {formatTime(order.orderTime)}</p>
                </span>
            </div>

            <p className='item-grid-heading'>Items</p>
            <div className="order-items">
                {order.items.map((item, idx) => (
                    <div className="order-item" key={idx}>
                        <img src={item.imageUrl} alt="" />
                        <div className="item-details">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">Price : ৳ {item.price}</p>
                            <p className="item-quantity">Quantity : {item.quantity}</p>
                        </div>
                        <div className="item-buttons">
                            {(orderType === 'past' && userType === 'student') && (
                                <button className='rate-btn'>Rate Item</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {(orderType === 'current' && userType === 'student') && (
                <button className='order-card-btn'>Cancel Order</button>
            )}

            {(orderType === 'current' && userType === 'vendor' && getButtonLabel(status)) && (
                <button className='order-card-btn' onClick={handleStatusChange}>
                    {getButtonLabel(status)}
                </button>
            )}
        </div>
    )
}

export default OrderCard
