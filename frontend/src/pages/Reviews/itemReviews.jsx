import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './itemReviews.scss';
import { formatTime } from '../../components/HelperFunctions/formatTime';
import RatingStars from '../../components/RatingStars/ratingStars.jsx';
import userImage from '../../images/user_profile.jpg';

const ItemReviews = ({ userRole = null }) => {
    const server = process.env.REACT_APP_SERVER;
    const { itemId } = useParams();
    const [error, setError] = useState(null);
    const [itemData, setItemData] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchItemReviews = async () => {
            const response = await fetch(`${server}/api/review/get-item-reviews/${itemId}`, { method: 'GET' });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message || "Failed to fetch item reviews");
                return;
            }
            // console.log(result);
            setItemData(result.itemData);
            setReviews(result.reviews);
        };
        fetchItemReviews();
    }, []);

    return (
        <div className='item-review-page'>
            <h1 className="page-title">Food Item Reviews</h1>
            {error && (
                <p className="error-message">{error}</p>
            )}
            <div className="item-data">
                <img src={itemData.image} alt="" />
                <div className="data">
                    <p className="name">{itemData.name}</p>
                    <p className="vendor">{itemData.vendor}</p>
                    <p className="location">{itemData.vendorLocation}</p>
                    <p className="rating">
                        ⭐ {itemData.itemRating}/5
                        <span>{` (${itemData.itemTotalReviews})`}</span>
                    </p>
                </div>
            </div>
            {reviews.length === 0 ? (
                <p style={{ fontSize: "28px", color: "grey" }}>No reviews yet. {!userRole && "Be the first to share your experience!"}</p>
            ) : (
                <div className="review-grid">
                    {reviews.map(review => (
                        <div className="review-card">
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemReviews;
