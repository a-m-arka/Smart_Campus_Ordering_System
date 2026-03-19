import React, { useState, useEffect } from 'react'
import './order.scss'
import { fetchUserOrders, fetchStudentReviews } from './orderApi'
import OrderCard from '../../components/Cards/orderCard'

// import { orders } from '../../temporaryData/data'

const StudentOrder = () => {

  const [orders, setOrders] = useState([])
  const [ordersType, setOrdersType] = useState('current')

  const currentOrders = orders.filter(
    order => order.status !== 'delivered' && order.status !== 'cancelled'
  )
  const pastOrders = orders.filter(order => order.status === 'delivered')
  const cancelledOrders = orders.filter(order => order.status === 'cancelled')

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await fetchUserOrders('student')
      const reviewData = await fetchStudentReviews()

      const reviewMap = new Map()
      reviewData.forEach(r => {
        reviewMap.set(r.itemId, r)
      })

      const updatedOrders = orderData.map(order => ({
        ...order,
        items: order.items.map(item => {
          const review = reviewMap.get(item.foodItemId)

          if (review) {
            return {
              ...item,
              hasGivenReview: true,
              givenReviewId: review.reviewId,
              givenRating: review.rating,
              givenFeedback: review.feedback
            }
          }

          return {
            ...item,
            hasGivenFeedback: false
          }
        })
      }))

      // console.log(updatedOrders)
      setOrders(updatedOrders)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (currentOrders.length === 0) return

    const interval = setInterval(async () => {
      // console.log("Fetching orders")
      const orderData = await fetchUserOrders('student')
      setOrders(orderData)
    }, 3000)

    return () => clearInterval(interval)
  }, [currentOrders.length])

  return (
    <div className='order-page'>
      <h1 className="page-title">Your Orders</h1>

      <div className="order-types">
        <button
          className={`${ordersType === "current" ? "active" : ""}`}
          onClick={() => setOrdersType("current")}
        >
          Current Orders
        </button>
        <button
          className={`${ordersType === "past" ? "active" : ""}`}
          onClick={() => setOrdersType("past")}
        >
          Past Orders
        </button>
        <button
          className={`${ordersType === "cancelled" ? "active" : ""}`}
          onClick={() => setOrdersType("cancelled")}
        >
          Cancelled Orders
        </button>
      </div>

      {ordersType === "current" && (
        <div className="current-orders">
          <h3 className="heading">Current Orders</h3>
          {currentOrders.length === 0 ? (
            <p className='no-item'>No current orders.</p>
          ) : (
            <div className="orders">
              {currentOrders.map(order => (
                <OrderCard order={order} orderType={'current'} userType={'student'} />
              ))}
            </div>
          )}
        </div>
      )}

      {ordersType === "past" && (
        <div className="past-orders">
          <h3 className="heading">Past Orders</h3>
          {pastOrders.length === 0 ? (
            <p className='no-item'>No past orders.</p>
          ) : (
            <div className="orders">
              {pastOrders.map(order => (
                <OrderCard order={order} orderType={'past'} userType={'student'} />
              ))}
            </div>
          )}
        </div>
      )}

      {ordersType === "cancelled" && (
        <div className="cancelled-orders">
          <h3 className="heading cancelled">Cancelled Orders</h3>
          {cancelledOrders.length === 0 ? (
            <p className='no-item'>No cancelled orders.</p>
          ) : (
            <div className="orders">
              {cancelledOrders.map(order => (
                <OrderCard order={order} orderType={'cancelled'} userType={'student'} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default StudentOrder
