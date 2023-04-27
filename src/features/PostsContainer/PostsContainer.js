import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../posts/posts.css'

import {
    selectSubredditError,
    selectSearchTermFilter,
    selectSelectedSubreddit,
    selectSubredditPosts,
    selectSubredditStatus,
    fetchPosts
} from './PostsContainerSlice';
import Posts from '../posts/posts';
import { activeSubreddit, setActiveSubreddit } from '../subreddits/subRedditsSlice';
//incercam varianta din subreddit


const PostsContainer = () => {
    const active = useSelector(activeSubreddit);
    //selected subreddit in subreddit slice

    const posts = useSelector(selectSubredditPosts);
    const status = useSelector(selectSubredditStatus);
    const error = useSelector(selectSubredditError);
    const searchTermFilter = useSelector(selectSearchTermFilter);

    const dispatch = useDispatch();

    const filterPostsBySearchTerm = (posts) => {
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchTermFilter.toLowerCase()));
    }


    useEffect(() => {
        dispatch(fetchPosts(active))
    }, [dispatch, active]);
    //useeffectul cu subredditul din subreddits


    let content;

    if (status === 'loading') {
        content = (<>
            <h2>LOADING POSTS</h2>
        </>)
    } else if (status === 'succeeded') {
        const filteredPosts = filterPostsBySearchTerm(posts)
        content = filteredPosts.map((post) => {
            return <Posts post={post} key={post.id} />
        })
    } else if (status === 'failed') {
        content = (<><h2>Failed</h2></>)
    }



    return (
        <div className='listaposturi'>
            {content}
        </div>
    )
}

export default PostsContainer