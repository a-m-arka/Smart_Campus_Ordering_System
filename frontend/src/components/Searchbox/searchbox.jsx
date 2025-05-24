import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import './searchbox.scss'

const SearchBox = ({ onSearch, searchFor }) => {
    const [query, setQuery] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (onSearch) onSearch(query.trim())
    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={`Search ${searchFor}...`}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBox
