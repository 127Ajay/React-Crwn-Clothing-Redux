import { User_Action_Type } from "./user.types";

export const User_Initial_State = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = User_Initial_State, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case User_Action_Type.Sign_In_Success:
            return {
                ...state,
                currentUser: payload,
            };
        case User_Action_Type.Sign_Out_Success:
            return {
                ...state,
                currentUser: null,
            };
        case User_Action_Type.Sign_Out_Failed:
        case User_Action_Type.Sign_Up_Failed:
        case User_Action_Type.Sign_In_Failed:
            return {
                ...state,
                error: payload,
            };
        default:
            return state;
    }
};
