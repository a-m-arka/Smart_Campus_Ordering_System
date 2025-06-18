import React from 'react'
import './order.scss'
import OrderCard from '../../components/Cards/orderCard'

import { orders } from '../../temporaryData/data'

const StudentOrder = () => {
  const currentOrders = orders.filter(
    order => order.status !== 'delivered' && order.status !== 'cancelled'
  )

  const pastOrders = orders.filter(order => order.status === 'delivered')

  const cancelledOrders = orders.filter(order => order.status === 'cancelled')

  return (
    <div className='order-page'>
      <h1 className="page-title">Your Orders</h1>

      <div className="current-orders">
        <h3 className="heading">Current Orders</h3>
        {currentOrders.length === 0 ? (
          <p className='no-item'>No current orders.</p>
        ) : (
          <div className="orders">
            {currentOrders.map(order => (
              <OrderCard order={order} orderType={'current'} userType={'student'}/>
            ))}
          </div>
        )}
      </div>

      <div className="past-orders">
        <h3 className="heading">Past Orders</h3>
        {pastOrders.length === 0 ? (
          <p className='no-item'>No past orders.</p>
        ) : (
          <div className="orders">
            {pastOrders.map(order => (
              <OrderCard order={order} orderType={'past'} userType={'student'}/>
            ))}
          </div>
        )}
      </div>

      <div className="cancelled-orders">
        <h3 className="heading">Cancelled Orders</h3>
        {cancelledOrders.length === 0 ? (
          <p className='no-item'>No cancelled orders.</p>
        ) : (
          <div className="orders">
            {cancelledOrders.map(order => (
              <OrderCard order={order} orderType={'cancelled'} userType={'student'}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentOrder
