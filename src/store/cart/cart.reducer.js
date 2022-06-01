import { Cart_Action_Type } from "./cart.types";

export const Cart_Initial_State = {
    cartItems: [],
    cartCount: 0,
    total: 0,
    isCartOpen: false,
};

export const cartReducer = (state = Cart_Initial_State, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case Cart_Action_Type.Set_Cart_Items:
            return {
                ...state,
                cartItems: payload,
            };
        case Cart_Action_Type.Set_Is_Cart_Open:
            return {
                ...state,
                isCartOpen: payload,
            };
        default:
            return state;
    }
};
