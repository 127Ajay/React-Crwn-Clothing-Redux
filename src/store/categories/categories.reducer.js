import { Categories_Action_Type } from "./categories.types";

export const Categories_Initial_State = {
    categories: [],
};

export const categoriesReducer = (
    state = Categories_Initial_State,
    action = {}
) => {
    const { type, payload } = action;
    console.log("dispatched from Categories Reducer");
    switch (type) {
        case Categories_Action_Type.SET_Categories:
            return {
                ...state,
                categories: payload,
            };
        default:
            return state;
    }
};
