import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../../api/axios";

const initialState = {
    selectedSubreddit: '/r/Home',
    posts: [],
    searchTermFilter: '',
    status: 'idle',
    error: null,
}

export const fetchPosts = createAsyncThunk(
    'subreddit/fetchPosts',
    async (subreddit) => {
        try {
            const posts = await getPosts(subreddit);
            // console.log(posts)
            return posts
        } catch (err) {
            console.log(err.response.data)
        }
    }
)

export const postsContainerSlice = createSlice({
    name: 'postsContainer',
    initialState,
    reducers: {
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
        setSearchTermFilter: (state, action) => {
            state.searchTermFilter = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message;
        })
    },
})

export default postsContainerSlice.reducer;
export const { setSearchTermFilter, setSelectedSubreddit} = postsContainerSlice.actions;

export const selectSelectedSubreddit = (state) => state.postsContainer.selectedSubreddit;
export const selectSubredditPosts = (state) => state.postsContainer.posts;
export const selectSubredditStatus = (state) => state.postsContainer.status;
export const selectSubredditError = (state) => state.postsContainer.error;
export const selectSearchTermFilter = (state) => state.postsContainer.searchTermFilter;
