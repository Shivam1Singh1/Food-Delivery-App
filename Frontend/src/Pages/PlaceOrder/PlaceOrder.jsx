import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const PlaceOrder = () => {
  const { cartItems, food_list, url, token } = useContext(StoreContext);
  let subtotal = 0;

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });

  // Handler function to update state
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };


  // Function to handle placing the order
  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    // Prepare order data to send to the server
    let orderData = {
      address: data,
      items: orderItems,
      amount: total + 120,
    }
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token }
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };


  // Calculate subtotal based on items in cart
  food_list.forEach(item => {
    if (cartItems[item._id] > 0) {
      subtotal += item.price * cartItems[item._id];
    }
  });

  // Determine delivery fee
  const deliveryFee = subtotal > 0 ? 120 : 0;
  const total = subtotal + deliveryFee;

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (total===0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder='First Name'
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder='Last Name'
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="email"
          placeholder='Email address'
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          required
        />
        <input
          type="text"
          placeholder='Street'
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder='City'
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder='State'
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            placeholder='Zip Code'
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            required
          />
          <input
            type="text"
            placeholder='Country'
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            required
          />
        </div>
        <input
          type="text"
          placeholder='Phone'
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <hr />
            {subtotal > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{deliveryFee}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{total}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
