import React, { useState, useRef } from 'react'
import './popUp.scss'

const categoryOptions = [
    "Snacks",
    "Beverages",
    "Vegetarian",
    "Non-Vegetarian",
    "Fast Food",
    "Desserts"
]

const FoodItemForm = ({ onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        name: initialData?.title || "",
        description: initialData?.description || "",
        price: initialData?.price || "",
        category: initialData?.category || categoryOptions[0],
        available: initialData?.isAvailable || false,
        image: initialData?.image || null
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [preview, setPreview] = useState(initialData?.image || null)
    const fileInputRef = useRef(null)

    const server = process.env.REACT_APP_SERVER

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const url = URL.createObjectURL(file)
            setPreview(url)
            setFormData(prev => ({ ...prev, image: file }))
        }
    }

    const handleUploadClick = (e) => {
        e.preventDefault()
        if (fileInputRef.current) fileInputRef.current.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // console.log(formData.available);

        try {
            const token = localStorage.getItem('token')
            if (!token) throw new Error("You are not authorized")

            const fd = new FormData()
            fd.append("title", formData.name)
            fd.append("description", formData.description)
            fd.append("price", formData.price)
            fd.append("category", formData.category)
            fd.append("isAvailable", formData.available)
            if (formData.image instanceof File) {
                fd.append("file", formData.image)
            }

            // console.log(fd)

            const url = initialData
                ? `${server}/api/food/edit-food` // PUT endpoint
                : `${server}/api/food/add-food`  // POST endpoint
            const method = initialData ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: fd
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || "Failed to save food item")
            }
            else {
                alert(data.message || "Food item saved successfully")
                setLoading(false)
                onSave(formData)
            }
        } catch (err) {
            console.error(err)
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='popup-overlay' onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <h2>{initialData ? "Edit Food Item" : "Add New Food Item"}</h2>

                <form className='popup-form' onSubmit={handleSubmit}>

                    <div className="popup-field">
                        <label>Item Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            required
                        />
                    </div>

                    <div className="popup-field">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            required
                        />
                    </div>

                    <div className="popup-field">
                        <label>Price</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => handleChange("price", e.target.value)}
                            required
                        />
                    </div>

                    <div className="popup-field">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                        >
                            {categoryOptions.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="popup-field checkbox">
                        <label>Available</label>
                        <input
                            type="checkbox"
                            checked={formData.available}
                            onChange={(e) => handleChange("available", e.target.checked)}
                        />
                    </div>

                    {preview && (
                        <div className="image-preview">
                            <img src={preview} alt="preview" />
                        </div>
                    )}

                    <div className="popup-field">
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleImageChange}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="pop-up-buttons">
                        <button onClick={handleUploadClick} disabled={loading}>Upload Photo</button>
                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button onClick={onClose} disabled={loading}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FoodItemForm