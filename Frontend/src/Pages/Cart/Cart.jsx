import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart,url } = useContext(StoreContext);

    const navigate = useNavigate();


    const calculateSubtotal = () => {
        return food_list.reduce((total, item) => {
            return total + (cartItems[item._id] > 0 ? item.price * cartItems[item._id] : 0);
        }, 0);
    };

    const deliveryFee = 120;
    const subtotal = calculateSubtotal();
    const total = subtotal + deliveryFee;

    const handleApplyPromoCode = () => {
        // Implement promo code functionality if required
        alert('Promo code functionality will be implemented here.');
    };

    const handleProceedToCheckout = () => {
        // Implement checkout functionality
        alert('Proceed to checkout functionality will be implemented here.');
    };

    // Condition to check if no items are selected
    if (food_list.length === 0 || subtotal === 0) {
        return (
            <div className='cart no-items-selected'>
                <p>No items selected.</p>
            </div>
        );
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className="divider" />
                {food_list.map((item) => (
                    cartItems[item._id] > 0 && (
                        <div key={item._id}>
                            <div className="cart-item">
                                <img src={url+"/images/"+item.image} alt={item.name} />
                                <p className="item-name">{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>₹{item.price * cartItems[item._id]}</p>
                                <button className='remove-button' onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                            <hr className="divider" />
                        </div>
                    )
                ))}
            </div>
            <div className="cart-summary">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>₹{subtotal}</p>
                    </div>
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>₹{deliveryFee}</p>
                    </div>
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>₹{total}</b>
                    </div>
                </div>
                <div className="cart-actions">
                    <div className="cart-promocode">
                        <p className="promocode-label">If you have a promo code, enter it here:</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Promo Code' aria-label='Enter promo code' />
                            <button onClick={handleApplyPromoCode}>Apply</button>
                        </div>
                    </div>
                    <button className="checkout-button" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
