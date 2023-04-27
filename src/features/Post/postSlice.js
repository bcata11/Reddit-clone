import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostComments } from "../../api/axios";

const initialState = {
    selectedPostId: '',
    selectedPost: {},
    comments: [],
    status: 'idle',
    error: null,
};


export const fetchComments = createAsyncThunk(
    'post/fetchComments',
    async (postId) => {
        try{
            const comments = await getPostComments(postId);
            // console.log(comments)
            return comments
        } catch (err) {
            console.log(err.response.data)
        }
        
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setSelectedPostId: (state, action) => {
            state.selectedPostId = action.payload;
        },
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
})



export default postSlice.reducer;

export const { setSelectedPost, setSelectedPostId } = postSlice.actions;

export const selectSelectedPostId = (state) => state.post.selectedPostId;
export const selectSelectedPost = (state) => state.post.selectedPost;
export const selectComments = (state) => state.post.comments;
export const selectStatus = (state) => state.post.status;
export const selectError = (state) => state.post.error;
