import { createContext, useReducer } from "react";

import { CreateAction } from "../utils/reducer/reducer.utils";

const Initial_State = {
    cartItems: [],
    cartCount: 0,
    total: 0,
    isCartOpen: false,
};

export const Cart_Action_Type = {
    Set_Cart_Items: "Set_Cart_Items",
    Set_Is_Cart_Open: "Set_Is_Cart_Open",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case Cart_Action_Type.Set_Cart_Items:
            return {
                ...state,
                ...payload,
            };
        case Cart_Action_Type.Set_Is_Cart_Open:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandeled type ${type} in cartReducer`);
    }
};

const addCartItem = (cartItems, productToAdd) => {
    //TODO: find if cartItems contains new added item
    const exisitngcartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    //TODO: if found incrment the qunatity count
    if (exisitngcartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    //return new generate cartitems
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    //TODO: find if cartItems to remove
    const exisitngcartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //TODO: check if qunatity  == 1, if true then remove item from cart else decrease quantity by 1
    if (exisitngcartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0,
});

export const CartProvider = ({ children }) => {
    const [{ cartItems, cartCount, total, isCartOpen }, dispatch] = useReducer(
        cartReducer,
        Initial_State
    );

    const updateCartItemReducer = (newCartitems) => {
        const newCartCount = newCartitems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );

        const newTotal = newCartitems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        dispatch(
            CreateAction(Cart_Action_Type.Set_Cart_Items, {
                cartItems: newCartitems,
                cartCount: newCartCount,
                total: newTotal,
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(CreateAction(Cart_Action_Type.Set_Is_Cart_Open, bool));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        cartItems,
        cartCount,
        removeItemFromCart,
        clearItemFromCart,
        total,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
