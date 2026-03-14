import React, { useState } from 'react'
import './orderCard.scss'
import { useNavigate } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { formatTime } from '../HelperFunctions/formatTime';

const OrderCard = ({ order, orderType, userType }) => {
    const server = process.env.REACT_APP_SERVER;
    const navigate = useNavigate();
    const [status, setStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const handleVendorClick = () => {
    //     navigate(`/vendors/${order.vendor.id}`);
    // };

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

    const handleStatusChange = async (toBeCancelled = false) => {
        setLoading(true);
        const nextStatus = toBeCancelled === true ? "cancelled" : getNextStatus(status);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to place an order");
            window.location.reload();
            return;
        }

        try {
            const response = await fetch(`${server}/api/order/update-status/${order.orderId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    newStatus: nextStatus,
                    userRole: userType
                })
            });
            const data = await response.json();
            if (response.ok) {
                setStatus(nextStatus);
            }
            else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Error updating order status", error);
            setError("Failed to update order status. Please try again");
        } finally {
            setLoading(false);
        }

        // if (nextStatus) setStatus(nextStatus);
        // console.log(status);
    };

    return (
        <div className='order-card'>
            <div className="order-details">
                <span className='left'>
                    <p className="order-id">Order No. : {order.orderId}</p>
                    {orderType === 'current' && (
                        <p className="order-status">
                            Status :
                            <span className={`${status === "cancelled" ? "cancelled" : ""}`}> {status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                        </p>
                    )}
                    {userType === 'student' && (
                        <div className="order-vendor">
                            <span>Vendor : </span>
                            <span className='name-phone'>
                                <span className='vendor-name'>{order.vendor.stallName}</span>
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
                    <p className="payment-method">Payment Method : <span>{order.paymentMethod}</span></p>
                    {orderType === 'current' && status !== "cancelled" && (
                        <p className="payment-status">Payment Status : <span> {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</span></p>
                    )}
                    <p className="delivery-address">Delivery Address : <span>{order.deliveryAddress}</span></p>
                    <p className="order-time">Order Time : <span>{formatTime(order.orderTime)}</span></p>
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

            {error && (<p className="error-message">{error}</p>)}

            <div className='order-card-btn'>
                {(orderType === 'current' && status === 'pending') && (
                    <button onClick={() => handleStatusChange(true)} disabled={loading}>
                        Cancel Order
                    </button>
                )}

                {(orderType === 'current' && userType === 'vendor' && getButtonLabel(status)) && (
                    <button onClick={handleStatusChange} disabled={loading}>
                        {getButtonLabel(status)}
                    </button>
                )}
            </div>
        </div>
    )
}

export default OrderCard
