import axios from "axios";


export const redditapi = axios.create({
    baseURL: 'https://www.reddit.com'
})

const getSubs = async () => {
    try {
        const response = await redditapi.get('/subreddits.json')
        // return response.data.children.map((subreddit) => subreddit.data)
        return response.data.data.children.map((subreddit) => subreddit.data)
    } catch (err) {
        console.error(err.response.data.message)
    }
}

export const getPosts = async (subreddit) => {
    try {
        const response = await redditapi.get(`${subreddit}.json`)
        // console.log(response.data.data.children.map((post) => post.data))
        return  response.data.data.children.map((post) => post.data)
    } catch (err) {
        console.error(err.response.data.message)
    }
}

export const getPostComments = async (postId) => {
    try{
        const response = await redditapi.get(`/comments/${postId}.json`)
        const jsonResponse = response.data;
        return jsonResponse[1].data.children.map((comment) => comment.data)
    } catch (err) {
        console.error(err.response.data.message)
    }
}

export default getSubs;


