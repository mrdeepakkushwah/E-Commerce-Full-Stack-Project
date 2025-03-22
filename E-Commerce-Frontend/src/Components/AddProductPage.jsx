import React, { useState } from "react";
// import axios from "axios"; // Axios to handle API requests
import './addproduct.css'

const AddProductPage = () => {
    const [productData, setProductData] = useState({
        pImage: "",
        title: "",
        description: "",
        price: "",
        stock: "",
        ratings: 0,
        isFreeShipping: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setProductData({ ...productData, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/products", productData);
            alert("Product added successfully!");
            console.log(response.data);
            setProductData({
                pImage: "",
                title: "",
                description: "",
                price: "",
                stock: "",
                ratings: 0,
                isFreeShipping: false,
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="pImage">Product Image URL:</label>
                    <input
                        type="text"
                        id="pImage"
                        name="pImage"
                        value={productData.pImage}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px", height: "100px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label htmlFor="ratings">Ratings (0-5):</label>
                    <input
                        type="number"
                        id="ratings"
                        name="ratings"
                        min="0"
                        max="5"
                        step="0.1"
                        value={productData.ratings}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "10px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        <input
                            type="checkbox"
                            name="isFreeShipping"
                            checked={productData.isFreeShipping}
                            onChange={handleChange}
                        />
                        Free Shipping
                    </label>
                </div>
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
