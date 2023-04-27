import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     term: ""
// }

export const searchbarSlice = createSlice({
    name: 'searchbar',
    initialState: "",
    reducers: {
        searchActive: (state, action) =>  state = action.payload 
    }
})

export const {searchActive} = searchbarSlice.actions;

export default searchbarSlice.reducer;