class OrderModel {
    constructor(order) {
        this.studentId = order.studentId,
        this.vendorId = order.vendorId,
        this.totalAmount = order.totalAmount,
        this.deliveryAddress = order.deliveryAddress,
        this.paymentMethod = order.paymentMethod
    }
}

export default OrderModel;