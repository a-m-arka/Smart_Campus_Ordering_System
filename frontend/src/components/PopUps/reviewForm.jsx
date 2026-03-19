import React, { useState } from 'react'
import RatingStars from '../RatingStars/ratingStars.jsx';

const server = process.env.REACT_APP_SERVER;

const ReviewForm = ({ item, vendor, onClose }) => {
    const [rating, setRating] = useState(item.givenRating || 1);
    const [feedback, setFeedback] = useState(item.givenFeedback || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // console.log(item);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            // alert("You must be logged in to post a review");
            window.location.reload();
            return;
        }

        let url;
        let method;
        let payload;

        if (item.hasGivenReview) {
            url = `${server}/api/review/update-review/${item.givenReviewId}`;
            method = "PATCH";
            payload = {
                newRating: rating,
                newFeedback: feedback
            };
        }
        else {
            url = `${server}/api/review/post-review`;
            method = "POST";
            payload = {
                vendorId: vendor.id,
                itemId: item.foodItemId,
                rating,
                feedback
            };
        }

        // console.log(payload)

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                if (item.hasGivenReview) {
                    alert("Review updated successfully!");
                }
                else {
                    alert("Review posted successfully!");
                }
                setLoading(false);
                onClose();
            } else {
                setLoading(false);
                setError(data.message || "Failed to post review");
            }
        } catch (err) {
            setLoading(false);
            setError("Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className='popup-overlay'>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2 style={{ marginBottom: "30px" }}>Rate Food Item</h2>
                <div
                    className="item"
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        gap: "15px",
                        alignItems: "start",
                    }}
                >
                    <div className="image-preview">
                        <img
                            src={item.imageUrl}
                            alt="preview"
                            style={{ maxHeight: "100px" }}
                        />
                    </div>
                    <div className="item-details">
                        <p className="item-name">{item.name}</p>
                        <p className="item-vendor">{vendor.stallName}</p>
                        <p className="item-price">৳ {item.price}</p>
                    </div>
                </div>
                <RatingStars
                    ratingValue={rating}
                    setRatingValue={setRating}
                    readOnly={false}
                />
                <form className="popup-form" onSubmit={handleSubmit}>
                    <div className="popup-field">
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder='Write your feedback...'
                            required
                            style={{ marginTop: "20px", height: "150px" }}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="pop-up-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm