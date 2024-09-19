import { registerSheet,SheetDefinition,RouteDefinition } from "react-native-actions-sheet";
import SortItems from "./SortItems";
import { sortby } from "../navigations/types";
import AddComment from "./AddComment";


registerSheet('SortItems',SortItems)
registerSheet('AddComment',AddComment)

declare module 'react-native-actions-sheet'
{
    export interface Sheets
    {
        SortItems:SheetDefinition<{
            payload:{
                fn:(param:sortby)=>void,
                choosen?:sortby
            }
        }>,
        AddComment:SheetDefinition<{
            payload:{
                itemId:string,
                fn:(value:boolean)=>void,
                commentAdded:boolean
            }
        }>
    }
}