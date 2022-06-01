import { CreateAction } from "../../utils/reducer/reducer.utils";

import { Categories_Action_Type } from "./categories.types";

export const setCategories = (categoriesArr) =>
    CreateAction(Categories_Action_Type.SET_Categories, categoriesArr);
