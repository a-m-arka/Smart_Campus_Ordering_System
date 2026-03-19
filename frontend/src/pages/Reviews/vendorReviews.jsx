import React, { useState, useEffect } from 'react';
import './vendorReviews.scss';
import { formatTime } from '../../components/HelperFunctions/formatTime';
import RatingStars from '../../components/RatingStars/ratingStars.jsx';
import userImage from '../../images/user_profile.jpg';

const VendorReviews = () => {
    const server = process.env.REACT_APP_SERVER;
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendorReviews = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to place an order");
                return;
            }

            const response = await fetch(`${server}/api/review/get-vendor-reviews`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message || "Failed to fetch vendor reviews");
                return;
            }
            // console.log(result);
            setReviews(result.reviews);
        };
        fetchVendorReviews();
    }, []);

    return (
        <div className='vendor-review-page'>
            <h1 className="page-title">Customer Reviews</h1>
            {error && (
                <p className="error-message">{error}</p>
            )}

            {reviews.length === 0 ? (
                <p style={{ fontSize: "28px", color: "grey" }}>No reviews yet.</p>
            ) : (
                <div className="review-grid">
                    {reviews.map(review => (
                        <div className="review-card">
                            <div className="item-section">
                                <img src={review.itemImage} alt="" />
                                <p className="item-name">{review.foodItemName}</p>
                            </div>
                            <div className="review-section">
                                <div className="customer-section">
                                    <img src={review.studentImage || userImage} alt="" />
                                    <div className="customar-name-time">
                                        <p className="name">{review.studentName}</p>
                                        <p className="time">{formatTime(review.postedAt)}</p>
                                    </div>
                                </div>
                                <div className="feedback-section">
                                    <RatingStars
                                        ratingValue={review.rating}
                                        starSize={30}
                                        starGap={5}
                                    />
                                    <div className="feedback-text">{review.feedback}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorReviews;
