import { useState } from "react";
import Products from "./mainContainer/Products";
import Cart from "./mainContainer/Cart";
import ManageProducts from "./mainContainer/ManageProducts";

const Home = () => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState("Products");

  // Content for each category
  const renderContent = () => {
    switch (activeCategory) {
      case "Products":
        return <Products />;
      case "Cart":
        return <Cart />;
      case "Manage Products":
        return <ManageProducts />;
      case "Logout":
        return <div>Logged out</div>;
      default:
        return <div>Welcome to the application</div>;
    }
  };

  return (
    <>
      <header>
        <h3 onClick={() => setActiveCategory("Products")}>Products</h3>
        <h3 onClick={() => setActiveCategory("Cart")}>Cart</h3>
        <h3 onClick={() => setActiveCategory("Manage Products")}>
          Manage Product
        </h3>
        <h3 onClick={() => setActiveCategory("Logout")}>Logout</h3>
      </header>
      <div className="mainContainer">{renderContent()}</div>
    </>
  );
};

export default Home;
