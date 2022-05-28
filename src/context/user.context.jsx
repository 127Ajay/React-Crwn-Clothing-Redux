import { createContext, useReducer, useEffect } from "react";
import {
    onAuthStateChangedListner,
    createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import { CreateAction } from "../utils/reducer/reducer.utils";

//acutal value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

const Initial_State = {
    currentUser: null,
};

export const User_Action_Type = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
    const { type, payload } = action;
    console.log("dispatched");
    switch (type) {
        case User_Action_Type.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch] = useReducer(userReducer, Initial_State);
    console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(CreateAction(User_Action_Type.SET_CURRENT_USER, user));
    };

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListner((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
