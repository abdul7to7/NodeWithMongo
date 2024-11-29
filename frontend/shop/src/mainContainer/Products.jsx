import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartActionLoading, setCartActionLoading] = useState({}); // Tracks loading state for add/remove actions
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/product/get-products",
          {
            headers: {
              token: token,
            },
          }
        );
        setProducts(response.data.products); // Assuming each product includes `inCart`
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Redirecting to login...");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleCartAction = async (productId, action) => {
    const token = localStorage.getItem("token");
    setCartActionLoading((prevState) => ({ ...prevState, [productId]: true }));

    try {
      const endpoint =
        action === "add"
          ? `http://localhost:3000/cart/add-to-cart/${productId}`
          : `http://localhost:3000/cart/delete-product-from-cart/${productId}`;

      const method = "get";

      await axios({
        method,
        url: endpoint,
        headers: { token },
      });

      // Update product `inCart` state locally
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? { ...product, inCart: action === "add" }
            : product
        )
      );
    } catch (err) {
      alert(
        `Failed to ${action === "add" ? "add" : "remove"} product from cart.`
      );
    } finally {
      setCartActionLoading((prevState) => ({
        ...prevState,
        [productId]: false,
      }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button
              onClick={() =>
                handleCartAction(product._id, product.inCart ? "remove" : "add")
              }
              disabled={cartActionLoading[product._id]}
            >
              {cartActionLoading[product._id]
                ? product.inCart
                  ? "Removing..."
                  : "Adding..."
                : product.inCart
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
