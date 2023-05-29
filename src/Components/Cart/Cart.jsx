import CartItem from "./CartItem";
import "./Cart.css";

function Cart({ cartItems, setCartItems, onClick, onClose }) {
  return (
    <>
      <div className="cart-modal" id="cart-container-modal">
        <div className="cart-left">
          <div className="cart-header">
            <button className="cart-close-btn" onClick={onClose}>
              CLOSE
            </button>
          </div>

          <div className="cart-content">
            <div className="all-cart-items">
              {cartItems.map((item, index) => (
                <CartItem
                  item={item}
                  key={index}
                  index={index}
                  setCartItems={setCartItems}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="cart-right"></div>
      </div>
    </>
  );
}

export default Cart;