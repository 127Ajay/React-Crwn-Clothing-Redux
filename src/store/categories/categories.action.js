import { CreateAction } from "../../utils/reducer/reducer.utils";

import { Categories_Action_Type } from "./categories.types";

export const fetchCategoriesStart = () =>
    CreateAction(Categories_Action_Type.Fetch_Categories_Start);

export const fetchCategoriesSuccess = (categoriesArr) =>
    CreateAction(
        Categories_Action_Type.Fetch_Categories_Success,
        categoriesArr
    );

export const fetchCategoriesFailed = (error) =>
    CreateAction(Categories_Action_Type.Fetch_Categories_Failed, error);
