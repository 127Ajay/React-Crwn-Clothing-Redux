import { User_Action_Type } from "./user.types";

export const User_Initial_State = {
    currentUser: null,
};

export const userReducer = (state = User_Initial_State, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case User_Action_Type.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            return state;
    }
};
