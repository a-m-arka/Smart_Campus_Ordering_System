class ReviewModel {
    constructor(review) {
        this.studentId = review.studentId,
        this.vendorId = review.vendorId,
        this.itemId = review.itemId,
        this.rating = review.rating,
        this.feedback = review.feedback
    }
}

export default ReviewModel;