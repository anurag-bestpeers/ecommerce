import { configureStore } from "@reduxjs/toolkit";
import productData from "./productSlice";


export const store=configureStore({
    reducer:{
        product:productData
    }
})