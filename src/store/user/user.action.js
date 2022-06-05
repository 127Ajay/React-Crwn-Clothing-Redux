import { CreateAction } from "../../utils/reducer/reducer.utils";

import { User_Action_Type } from "./user.types";

export const setCurrentUser = (user) =>
    CreateAction(User_Action_Type.SET_CURRENT_USER, user);

export const checkUserSession = () =>
    CreateAction(User_Action_Type.Check_User_Session);

export const googleSignInStart = () =>
    CreateAction(User_Action_Type.Google_Sign_In_Start);

export const emailSignInStart = (email, password) =>
    CreateAction(User_Action_Type.Email_Sign_In_Start, { email, password });

export const signInSuccess = (userAuth) =>
    CreateAction(User_Action_Type.Sign_In_Success, userAuth);

export const signInFailed = (error) =>
    CreateAction(User_Action_Type.Sign_In_Failed, error);

export const SignUpStart = (email, password, displayName) =>
    CreateAction(User_Action_Type.Sign_Up_Start, {
        email,
        password,
        displayName,
    });

export const signUpSuccess = (user, additionalDetails) =>
    CreateAction(User_Action_Type.Sign_Up_Success, { user, additionalDetails });

export const signUpFailed = (error) =>
    CreateAction(User_Action_Type.Sign_Up_Failed, error);

export const signOutStart = () => CreateAction(User_Action_Type.Sign_Out_Start);

export const signOutSuccess = () =>
    CreateAction(User_Action_Type.Sign_Out_Success);

export const signOutFailed = (error) =>
    CreateAction(User_Action_Type.Sign_Out_Failed, error);
