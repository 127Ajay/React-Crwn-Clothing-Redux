import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from "./categories.action";

import { Categories_Action_Type } from "./categories.types";

export function* fetchCategoriesAsync() {
    try {
        const categoriesArr = yield call(
            getCategoriesAndDocuments,
            "categories"
        );
        yield put(fetchCategoriesSuccess(categoriesArr));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        Categories_Action_Type.Fetch_Categories_Start,
        fetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}
