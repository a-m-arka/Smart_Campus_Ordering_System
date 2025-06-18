import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './vendors.scss'
import SearchBox from '../../components/Searchbox/searchbox.jsx'
import Filter from '../../components/Filter/filter.jsx'
import SortDropdown from '../../components/SortDropdown/sortDropdown.jsx'

import vendroLogo from '../../images/default_logo.jpg'

const vendors = [
  { id: 1, name: 'Foodies Hub', location: 'Chittagong', rating: 4.6, reviewCount: 120, image: vendroLogo, isOpen: true },
  { id: 2, name: 'Pizza World', location: 'Dhaka', rating: 4.8, reviewCount: 200, image: vendroLogo, isOpen: true },
  { id: 3, name: 'Snack Corner', location: 'Sylhet', rating: 4.3, reviewCount: 75, image: vendroLogo, isOpen: false },
  { id: 4, name: 'Italiano Express', location: 'Khulna', rating: 4.7, reviewCount: 150, image: vendroLogo, isOpen: false },
  { id: 5, name: 'Green Bites', location: 'Rajshahi', rating: 4.1, reviewCount: 60, image: vendroLogo, isOpen: true }
]


const Vendors = () => {
  const sortOptions = [
    { label: 'Rating', field: 'rating', order: 'desc' },
    { label: 'Rating', field: 'rating', order: 'asc' },
    { label: 'Reviews', field: 'reviewCount', order: 'desc' },
    { label: 'Reviews', field: 'reviewCount', order: 'asc' }
  ]

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sortValue, setSortValue] = useState({})

  const locationOptions = [...new Set(vendors.map(v => v.location))]

  const filterOptions = [
    { name: 'Location', options: locationOptions },
  ]

  const navigate = useNavigate()

  const handleSearch = (query) => {
    setSearch(query)
  }

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSortChange = (option) => {
    setSortValue(option)
  }

  let filteredVendors = vendors.filter(vendor => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.location.toLowerCase().includes(search.toLowerCase())

    const matchesLocation = filters.Location ? vendor.location === filters.Location : true

    return matchesSearch && matchesLocation
  })

  filteredVendors = filteredVendors.slice().sort((a, b) => {
    if (sortValue.order === 'asc') {
      return a[sortValue.field] - b[sortValue.field]
    } else {
      return b[sortValue.field] - a[sortValue.field]
    }
  })


  const handleMenuClick = (vendorId) => {
    navigate(`/vendors/${vendorId}`)
  }

  return (
    <div className="vendors-page">
      <h1 className="page-title">Our Vendors</h1>
      <div className="top">
        <SearchBox onSearch={handleSearch} searchMessage={"Search Vendor"} />
        <SortDropdown options={sortOptions} onSort={handleSortChange} />
        <Filter filters={filterOptions} onFilterChange={handleFilterChange} />
      </div>

      <div className="vendors-grid">
        {filteredVendors.map(vendor => (
          <div key={vendor.id} className="vendor-card" onClick={() => handleMenuClick(vendor.id)}>
            <img src={vendor.image} alt={vendor.name} />
            <div className="details">
              <div className="left">
                <h2>{vendor.name}</h2>
                <p className="location">{vendor.location}</p>
              </div>
              <div className="right">
                <p className="rating">⭐ <span>{vendor.rating}/5</span></p>
                <p className={`status ${vendor.isOpen ? 'available' : 'not-available'}`}>{vendor.isOpen ? 'Open' : 'Closed'} Now</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vendors
