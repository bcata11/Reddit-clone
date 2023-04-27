import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPosts } from "../../api/axios"

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async (query, { rejectWithValue }) => {
        try {
            const posts = await getPosts(query);
            return posts.map((post) => ({
                id: post.id,
                title: post.title,
                ups: post.ups,
                author: post.author,
                url: post.url,
                comments: [],
                num_comments: post.num_comments,
                image: post.thumbnail,
                selftext: post.selftext,
                thtml: post.selftext_html,
            }))
        } catch (err) {
            rejectWithValue(err.response.data);
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: false,
        errorMessage: "",
        fullText: {},
    },
    reducers:{
      toggleFullText(state, {payload: id}) {
        state.fullText[id] = !state.fullText[id];
      }  
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.posts = action.payload;
            })
            .addCase(loadPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.errorMessage = action.payload;
                state.posts = [];
            })
    }
})

export default postsSlice.reducer;
export const {toggleFullText} = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const isPostsLoading = (state) => state.posts.loadding;
export const error = (state) => state.posts.error;
export const errMessage = (state) => state.posts.errorMessage;
