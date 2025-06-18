import React from 'react'
import './foodCard.scss'
import { useNavigate } from 'react-router-dom'

const FoodCard = ({ item, onAddToCart, showVendor }) => {
    const navigate = useNavigate();

    const handleVendorClick = () => {
        navigate(`/vendors/${item.vendorId}`)
    }

    const handleSeeReview = () => {
        
    }

    return (
        <div key={item.id} className="food-card">
            <div className="image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="details">
                <div className="left">
                    <h2>{item.title}</h2>
                    <p className="description">{item.description}</p>
                    {showVendor && (
                        <>
                            <p className="vendor" onClick={handleVendorClick}>{item.vendor}</p>
                            <p className="location">{item.vendorLocation}</p>
                        </>
                    )}
                </div>
                <div className="right">
                    <p className={`status ${item.isAvailable ? 'available' : 'not-available'}`}>
                        {item.isAvailable ? 'Available' : 'Not Available'}
                    </p>
                    <p className="rating">⭐ {item.rating}/5 <span className='reviews'>({item.reviewCount})</span></p>
                    <p className="see-review" onClick={handleSeeReview}>See Reviews</p>
                    <p className="price">৳ {item.price}</p>
                </div>
            </div>
            <button
                className={`add-btn ${item.isAvailable ? '' : 'btn-disabled'}`}
                onClick={onAddToCart}
                disabled={!item.isAvailable}
            >
                Add to Cart
            </button>
        </div>
    )
}

export default FoodCard
