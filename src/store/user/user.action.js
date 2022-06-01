import { CreateAction } from "../../utils/reducer/reducer.utils";

import { User_Action_Type } from "./user.types";

export const setCurrentUser = (user) =>
    CreateAction(User_Action_Type.SET_CURRENT_USER, user);
