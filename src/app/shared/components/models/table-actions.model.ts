import { TABLE_ACTION } from "../enums/TABLE_ACTION.enum";

export interface TableActionsModel<T = any> {
    action: TABLE_ACTION;
    element: T;
}
