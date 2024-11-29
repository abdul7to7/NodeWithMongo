import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [addingProduct, setAddingProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/admin/all-products",
          {
            headers: {
              token,
            },
          }
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setAddingProduct(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/admin/add-product",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      setFormData({ name: "", price: "", description: "" }); // Clear form
    } catch (err) {
      alert("Failed to add product.");
    } finally {
      setAddingProduct(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/admin/delete-product/${productId}`,
        {
          headers: {
            token,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (err) {
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>Manage Products</h3>

      {/* Add Product Form */}
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        ></textarea>
        <button type="submit" disabled={addingProduct}>
          {addingProduct ? "Adding..." : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageProducts;
