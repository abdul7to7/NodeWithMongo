import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false); // State to handle loading during updates
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/cart/get-cart",
          {
            headers: { token },
          }
        );
        setCart(response.data.cart);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch cart. Redirecting to login...");
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId, action) => {
    setUpdating(true);
    const token = localStorage.getItem("token");

    try {
      const url =
        action == "increase"
          ? `http://localhost:3000/cart/add-to-cart/${productId}`
          : `http://localhost:3000/cart/remove-to-cart/${productId}`;
      await axios.get(url, {
        headers: { token },
      });

      // Refresh cart after update
      const response = await axios.get("http://localhost:3000/cart/get-cart", {
        headers: { token },
      });
      setCart(response.data.cart);
    } catch (err) {
      alert("Failed to update item quantity.");
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    setUpdating(true);
    const token = localStorage.getItem("token");

    try {
      await axios.get("http://localhost:3000/cart/clear-cart", {
        headers: { token },
      });
      setCart([]); // Clear cart in UI
    } catch (err) {
      alert("Failed to clear cart.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart &&
              cart.items.map((item) => (
                <li key={item.productId}>
                  <span>
                    {item.product.name} - ${item.product.price} x{" "}
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, "decrease")}
                    disabled={item.quantity === 1 || updating}
                  >
                    -
                  </button>
                  <button
                    onClick={() => updateQuantity(item.productId, "increase")}
                    disabled={updating}
                  >
                    +
                  </button>
                </li>
              ))}
          </ul>
          <button onClick={clearCart} disabled={updating}>
            Clear Cart
          </button>
        </>
      )}
    </>
  );
}

export default Cart;
