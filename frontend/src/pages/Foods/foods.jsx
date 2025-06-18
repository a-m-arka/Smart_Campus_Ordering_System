import React, { useState } from 'react'
import './foods.scss'
import SearchBox from '../../components/Searchbox/searchbox.jsx'
import SortDropdown from '../../components/SortDropdown/sortDropdown.jsx'
import Filter from '../../components/Filter/filter.jsx'
import FoodCard from '../../components/Cards/foodCard.jsx'
import AccessDenied from '../../components/PopUps/accessDenied.jsx'
import { useGlobalContext } from '../../context/GlobalContext.js'
import { useNavigate } from 'react-router-dom'

import { publicFoods } from '../../temporaryData/data.js'
const data = publicFoods;

const sortOptions = [
  { label: 'Rating', field: 'rating', order: 'desc' },
  { label: 'Rating', field: 'rating', order: 'asc' },
  { label: 'Reviews', field: 'reviewCount', order: 'desc' },
  { label: 'Reviews', field: 'reviewCount', order: 'asc' },
  { label: 'Price', field: 'price', order: 'desc' },
  { label: 'Price', field: 'price', order: 'asc' }
]

const Foods = () => {
  const navigate = useNavigate()
  const { userRole } = useGlobalContext()

  const [isAccessDenied, setIsAccessDenied] = useState(false)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [sortValue, setSortValue] = useState({})

  const locationOptions = [...new Set(data.map(d => d.vendorLocation))]
  const categoryOptions = [...new Set(data.map(d => d.category))]

  const filterOptions = [
    { name: 'Location', options: locationOptions },
    { name: 'Category', options: categoryOptions }
  ]

  let filteredData = data.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.vendor.toLowerCase().includes(query.toLowerCase())

    const matchesLocation = filters.Location ? filters.Location === item.vendorLocation : true

    const matchesCategory = filters.Category ? filters.Category === item.category : true

    return matchesSearch && matchesLocation && matchesCategory
  })

  filteredData = filteredData.slice().sort((a, b) => {
    if (sortValue.order === 'asc') {
      return a[sortValue.field] - b[sortValue.field]
    } else {
      return b[sortValue.field] - a[sortValue.field]
    }
  })

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSortChange = (value) => {
    setSortValue(value)
  }

  const handlePopUpClose = () => {
    setIsAccessDenied(false)
  }

  const handleAddToCart = (item) => {
    if (userRole !== 'student') {
      setIsAccessDenied(true);
      return;
    }

    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItem = cart.find(i => i.id === item.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  }

  return (
    <div className="foods-page">
      <h1 className="page-title">Food Items</h1>
      <div className="top">
        <SearchBox onSearch={setQuery} searchMessage={"Search Foods"} />
        <SortDropdown options={sortOptions} onSort={handleSortChange} />
        <Filter filters={filterOptions} onFilterChange={handleFilterChange} />
      </div>
      <div className="foods-grid">
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <FoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item)} showVendor={true} />
          ))
        ) : (
          <p className="no-result">No items found.</p>
        )}
      </div>

      {isAccessDenied && <AccessDenied canLogin={true} onClose={handlePopUpClose} />}
    </div>
  )
}

export default Foods
