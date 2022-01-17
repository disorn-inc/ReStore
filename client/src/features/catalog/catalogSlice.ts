import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch(error) {
            console.log(error);
        }
    }
);

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle',
    }),
    reducers: {},
    extraReducers: (build => {
        build.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        build.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        build.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        });
    })
});

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);