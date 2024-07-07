import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const url = "https://food-delivery-app-clnc.onrender.com";
    const [food_list, setFoodList] = useState([]);

    // Function to add an item to the cart
    const addToCart = async (itemId) => {
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] === 1) {
            const newCartItems = { ...cartItems };
            delete newCartItems[itemId];
            setCartItems(newCartItems);
        } else if (cartItems[itemId] > 1) {
            setCartItems(prev => ({
                ...prev,
                [itemId]: prev[itemId] - 1
            }));
        }
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        } else {

        }
    };

    // Calculate total amount of items in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list", error);
        }
    };
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.CartData);

    }



    // Update localStorage when token changes
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (token) {
                localStorage.setItem("token", token);
               // await loadCartData(localStorage.getItem("token"));
            } else {
                localStorage.removeItem("token");
            }
            //await loadCartData(localStorage.getItem("token"));
        }

        loadData();
    }, [token]); // Only run when `token` changes

    // Context value with state and functions
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    // Provide context value to children components
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
