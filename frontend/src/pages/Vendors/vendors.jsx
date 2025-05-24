import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './vendors.scss'
import SearchBox from '../../components/Searchbox/searchbox.jsx'

const vendorsData = [
  { id: 1, name: 'Foodies Hub', location: 'Chittagong', rating: 4.6, img: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Pizza World', location: 'Dhaka', rating: 4.8, img: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Snack Corner', location: 'Sylhet', rating: 4.3, img: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Italiano Express', location: 'Khulna', rating: 4.7, img: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Green Bites', location: 'Rajshahi', rating: 4.1, img: 'https://via.placeholder.com/150' }
]

const Vendors = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (query) => {
    setSearch(query)
  }

  const handleMenuClick = (vendorId) => {
    navigate(`/vendor/${vendorId}`)
  }

  const filteredVendors = vendorsData.filter(vendor =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) ||
    vendor.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="vendors-page">
      <h1 className="title">Our Vendors</h1>
      <SearchBox onSearch={handleSearch} searchFor="Vendor" />

      <div className="vendors-grid">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.img} alt={vendor.name} />
            <h2>{vendor.name}</h2>
            <p className="location">{vendor.location}</p>
            <p className="rating">⭐ {vendor.rating}</p>
            <button className="menu-btn" onClick={() => handleMenuClick(vendor.id)}>
              See Menu
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vendors
