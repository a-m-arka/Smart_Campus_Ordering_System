import React, { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import './searchbox.scss'

const SearchBox = ({ onSearch, searchMessage }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (onSearch) onSearch(query.trim())
    }

    const handleCancel = () => {
        setQuery('')
        if (onSearch) onSearch('')
    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={searchMessage}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {query && (
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                >
                    <FaTimes />
                </button>
            )}
            <button className='search-btn' type="submit">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBox
