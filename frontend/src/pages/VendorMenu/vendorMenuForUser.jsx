import React, { useState, useRef, useEffect } from 'react'
import './vendorMenuForUser.scss'
import FoodCard from '../../components/Cards/foodCard'
import AccessDenied from '../../components/PopUps/accessDenied'
import SearchBox from '../../components/Searchbox/searchbox'
import { useGlobalContext } from '../../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

import { publicFoods } from '../../temporaryData/data'
import vendroLogo from '../../images/default_logo.jpg'
const vendorFoods = publicFoods;

const VendorMenuForUser = () => {
    const vendorData = {
        id: 1,
        name: 'Foodies Hub',
        location: 'Chittagong',
        rating: 4.6,
        reviewCount: 120,
        image: vendroLogo
    };

    const navigate = useNavigate()

    const { userRole } = useGlobalContext()
    const [isAccessDenied, setIsAccessDenied] = useState(false)
    const [query, setQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('')

    const handlePopUpClose = () => {
        setIsAccessDenied(false)
    }

    const handleAddToCart = (item) => {
        if (userRole !== 'student') {
            setIsAccessDenied(true)
            return
        }
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const existingItem = cart.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart')
    }

    const handleSearch = (q) => {
        setActiveCategory('')
        setQuery(q)
    }

    const searchedFoods = vendorFoods.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase())
    })

    const mostOrdered = [...vendorFoods].sort((a, b) => b.orderCount - a.orderCount).slice(0, 4)
    const topRated = [...vendorFoods].sort((a, b) => b.rating - a.rating).slice(0, 4)

    const groupedByCategory = Object.entries(
        vendorFoods.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = []
            }
            acc[item.category].push(item)
            return acc
        }, {})
    ).map(([category, items]) => ({ category, items }))

    const searchResultRef = useRef(null)
    const popularRef = useRef(null)
    const topRatedRef = useRef(null)
    const categoryRefs = useRef({})

    groupedByCategory.forEach(group => {
        if (!categoryRefs.current[group.category]) {
            categoryRefs.current[group.category] = React.createRef()
        }
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const category = entry.target.getAttribute('data-category')
                        setActiveCategory(category)
                    }
                })
            },
            {
                rootMargin: '-150px 0px -60% 0px',
                threshold: 0.1
            }
        )

        groupedByCategory.forEach(group => {
            const element = categoryRefs.current[group.category]?.current
            if (element) observer.observe(element)
        })

        if (popularRef.current) observer.observe(popularRef.current)
        if (topRatedRef.current) observer.observe(topRatedRef.current)
        if (searchResultRef.current) observer.observe(searchResultRef.current)

        return () => {
            groupedByCategory.forEach(group => {
                const element = categoryRefs.current[group.category]?.current
                if (element) observer.unobserve(element)
            })

            if (popularRef.current) observer.unobserve(popularRef.current)
            if (topRatedRef.current) observer.unobserve(topRatedRef.current)
            if (searchResultRef.current) observer.unobserve(searchResultRef.current)
        }
    }, [groupedByCategory, query])

    useEffect(() => {
        if (query !== '' && searchResultRef.current) {
            const offset = 120
            const top = searchResultRef.current.offsetTop - offset
            window.scrollTo({ top, behavior: 'smooth' })
        }
    }, [query])

    return (
        <div className='vendor-menu'>
            {isAccessDenied && <AccessDenied canLogin={true} onClose={handlePopUpClose} />}
            <h1 className="page-title">Vendor Menu</h1>
            <div className="vendor-data">
                <img src={vendorData.image} alt="" />
                <div className="data">
                    <p className="name">{vendorData.name}</p>
                    <p className="location">{vendorData.location}</p>
                    <p className="rating">⭐ {vendorData.rating}/5</p>
                </div>
            </div>
            <div className="vendor-navbar">
                <SearchBox onSearch={handleSearch} searchMessage={"Search Foods in Menu"} />

                {query !== '' && (
                    <button
                        className={`category-btn ${activeCategory === 'Search Result' ? 'active' : ''}`}
                        onClick={() => {
                            const offset = 120
                            if (searchResultRef.current) {
                                const top = searchResultRef.current.offsetTop - offset
                                window.scrollTo({ top, behavior: 'smooth' })
                            }
                        }}
                    >
                        Search Result ({searchedFoods.length})
                    </button>
                )}

                <button
                    className={`category-btn ${activeCategory === 'Most Popular' ? 'active' : ''}`}
                    onClick={() => {
                        const offset = 120
                        if (popularRef.current) {
                            const top = popularRef.current.offsetTop - offset
                            window.scrollTo({ top, behavior: 'smooth' })
                        }
                    }}
                >
                    Most Popular
                </button>
                <button
                    className={`category-btn ${activeCategory === 'Top Rated' ? 'active' : ''}`}
                    onClick={() => {
                        const offset = 120
                        if (topRatedRef.current) {
                            const top = topRatedRef.current.offsetTop - offset
                            window.scrollTo({ top, behavior: 'smooth' })
                        }
                    }}
                >
                    Top Rated
                </button>
                {groupedByCategory.map(group => (
                    <button
                        className={`category-btn ${activeCategory === group.category ? 'active' : ''}`}
                        key={group.category}
                        onClick={() => {
                            const offset = 120
                            const element = categoryRefs.current[group.category]?.current
                            if (element) {
                                const top = element.offsetTop - offset
                                window.scrollTo({ top, behavior: 'smooth' })
                            }
                        }}
                    >
                        {group.category} ({group.items.length})
                    </button>
                ))}
            </div>
            <div className="vendor-foods">
                {query !== '' && (
                    <div className="search-result" ref={searchResultRef} data-category="Search Result">
                        <p className="heading">🔍Search Result</p>
                        <div className="foods-grid">
                            {searchedFoods.length > 0 ? (
                                searchedFoods.map(item => (
                                    <FoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item)} showVendor={true} />
                                ))
                            ) : (
                                <p className="no-result">No items found.</p>
                            )}
                        </div>
                    </div>
                )}
                <div className="most-popular" ref={popularRef} data-category="Most Popular">
                    <p className="heading">🔥Most Popular</p>
                    <div className="foods-grid">
                        {mostOrdered.length > 0 ? (
                            mostOrdered.map(item => (
                                <FoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item)} showVendor={true} />
                            ))
                        ) : (
                            <p className="no-result">No items found.</p>
                        )}
                    </div>
                </div>
                <div className="top-rated" ref={topRatedRef} data-category="Top Rated">
                    <p className="heading">🔝Top Rated</p>
                    <div className="foods-grid">
                        {topRated.length > 0 ? (
                            topRated.map(item => (
                                <FoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item)} showVendor={true} />
                            ))
                        ) : (
                            <p className="no-result">No items found.</p>
                        )}
                    </div>
                </div>
                {groupedByCategory.map(group => (
                    <div
                        key={group.category}
                        ref={categoryRefs.current[group.category]}
                        data-category={group.category}
                        className="category"
                    >
                        <p className="heading">{group.category}</p>
                        <div className="foods-grid">
                            {group.items.length > 0 ? (
                                group.items.map(item => (
                                    <FoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item)} showVendor={true} />
                                ))
                            ) : (
                                <p className="no-result">No items found.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VendorMenuForUser
