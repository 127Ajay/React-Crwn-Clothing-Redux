import { CreateAction } from "../../utils/reducer/reducer.utils";
import { Cart_Action_Type } from "./cart.types";

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return CreateAction(Cart_Action_Type.Set_Cart_Items, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return CreateAction(Cart_Action_Type.Set_Cart_Items, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return CreateAction(Cart_Action_Type.Set_Cart_Items, newCartItems);
};

export const setIsCartOpen = (boolean) =>
    CreateAction(Cart_Action_Type.Set_Is_Cart_Open, boolean);
