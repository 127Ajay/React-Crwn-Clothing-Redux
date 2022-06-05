import { takeLatest, all, call, put } from "redux-saga/effects";

import { User_Action_Type } from "./user.types";

import {
    signInSuccess,
    signInFailed,
    signUpFailed,
    signUpSuccess,
    signOutFailed,
    signOutSuccess,
} from "./user.action";

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotfromUserAuth(userAuth, AdditionalDetail) {
    try {
        const userSnapShot = yield call(
            createUserDocumentFromAuth,
            userAuth,
            AdditionalDetail
        );
        yield put(
            signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotfromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotfromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(User_Action_Type.Google_Sign_In_Start, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield call(getSnapshotfromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(User_Action_Type.Email_Sign_In_Start, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(User_Action_Type.Check_User_Session, isUserAuthenticated);
}

export function* signInAfterSignUp({ payload: { user, AdditionalDetail } }) {
    yield call(getSnapshotfromUserAuth, user, AdditionalDetail);
}

export function* onSignUpSuccess() {
    yield takeLatest(User_Action_Type.Sign_Up_Success, signInAfterSignUp);
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* onSignUpStart() {
    yield takeLatest(User_Action_Type.Sign_Up_Start, signUp);
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* onSignOutStart() {
    yield takeLatest(User_Action_Type.Sign_Out_Start, signOut);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
