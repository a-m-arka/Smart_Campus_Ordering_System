import React from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';

function RatingStars({
    ratingValue = 0,
    setRatingValue,
    starSize = 42,
    readOnly = true,
    starGap = 20,
    fractionValue=1
}) {
    const starStyle = { marginRight: `${starGap}px`, cursor: readOnly ? 'default' : 'pointer' };

    return (
        <Rating
            initialRating={ratingValue}
            onChange={(value) => setRatingValue && setRatingValue(value)}
            readonly={readOnly}
            fractions={fractionValue}
            emptySymbol={<FaRegStar color="rgba(255, 115, 0, 0.8)" size={starSize} style={starStyle} />}
            fullSymbol={<FaStar color="rgb(255, 115, 0)" size={starSize} style={starStyle} />}
        />
    );
}

export default RatingStars;