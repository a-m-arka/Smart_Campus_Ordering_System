import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './vendors.scss'
import SearchBox from '../../components/Searchbox/searchbox.jsx'
import Filter from '../../components/Filter/filter.jsx'
import SortDropdown from '../../components/SortDropdown/sortDropdown.jsx'


const Vendors = () => {
  const sortOptions = [
    { label: 'Rating', field: 'rating', order: 'desc' },
    { label: 'Rating', field: 'rating', order: 'asc' },
    // { label: 'Reviews', field: 'reviewCount', order: 'desc' },
    // { label: 'Reviews', field: 'reviewCount', order: 'asc' }
  ]

  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate()

  const [vendors, setVendors] = useState([])
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({})
  const [sortValue, setSortValue] = useState({})

  useEffect(() => {
      const fetchVendors = async () => {
        try {
          const response = await fetch(`${server}/api/public/vendors`, {
            method: 'GET',
          })
          const result = await response.json()
          if (!response.ok) {
            alert(result.message || 'Failed to load vendors. Please try again later.')
            navigate(-1)
            return
          }
          setVendors(result.data)
          // console.log(result.data)
        } catch (err) {
          console.error('Error fetching vendors:', err)
          alert('Failed to load vendors. Please try again later.')
          navigate(-1)
          return
        }
      }
      fetchVendors()
    }, [navigate, server])

  const locationOptions = [...new Set(vendors.map(v => v.location))]

  const filterOptions = [
    { name: 'Location', options: locationOptions },
  ]

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


  const handleMenuClick = (vendorData) => {
    // console.log(vendorData)
    navigate(
      `/vendors/${vendorData.id}`, 
      { 
        state: { 
          id: vendorData.id, 
          name: vendorData.name, 
          location: vendorData.location, 
          rating: vendorData.rating, 
          image: vendorData.image 
        } 
      } 
    )
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
          <div key={vendor.id} className="vendor-card" onClick={() => handleMenuClick(vendor)}>
            <img src={vendor.image} alt={vendor.name} />
            <div className="details">
              <div className="left">
                <h2>{vendor.name}</h2>
                <p className="location">{vendor.location || 'N/A'}</p>
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
