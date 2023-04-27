import { createSlice } from "@reduxjs/toolkit";
import getSubs from "../../api/axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subReddits: [],
        activeSubreddit: "/r/Home/",
        status: 'idle',
        error: null
    },
    reducers: {
        setActiveSubreddit: (state, action) => {
            state.activeSubreddit = action.payload;
        },
        addSubreddit: (state, action) => {
            state.subReddits.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loadSubs.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loadSubs.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.subReddits = action.payload;
          })
          .addCase(loadSubs.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      }
})

export const { setActiveSubreddit, addSubreddit } = subredditsSlice.actions;
export const activeSubreddit = (state) => state.subreddits.activeSubreddit;


export const loadSubs = createAsyncThunk(
    'subreddits/getSubs',
    async () => {
      try {
        const subs = await getSubs();
        return subs.map(item => ({
          name: item.display_name,
          url: item.url,
          id: item.id,
          icon: item.icon_img,
          subscribers: item.subscribers,
        }));

      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );

export default subredditsSlice.reducer;