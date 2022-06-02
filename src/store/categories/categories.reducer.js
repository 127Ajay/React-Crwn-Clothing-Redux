import { Categories_Action_Type } from "./categories.types";

export const Categories_Initial_State = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (
    state = Categories_Initial_State,
    action = {}
) => {
    const { type, payload } = action;
    switch (type) {
        case Categories_Action_Type.Fetch_Categories_Start:
            return { ...state, isLoading: true };
        case Categories_Action_Type.Fetch_Categories_Success:
            return {
                ...state,
                categories: payload,
                isLoading: false,
            };
        case Categories_Action_Type.Fetch_Categories_Failed:
            return { ...state, isLoading: false, error: payload };
        default:
            return state;
    }
};
