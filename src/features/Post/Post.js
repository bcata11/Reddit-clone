import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import './Post.css';
import acc from './acc.png'

import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments, selectError, selectSelectedPost, selectSelectedPostId, selectStatus } from './postSlice';
import Comment from './Comments/Comment';
import { Link } from 'react-router-dom';

const Post = () => {
    const postId = useSelector(selectSelectedPostId);
    const post = useSelector(selectSelectedPost);
    console.log(post);
    const comments = useSelector(selectComments);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);

    const [upvotes, setUpvotes] = useState(post.ups)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchComments(postId))
    }, [dispatch, postId]);

    const handleUpvote = () => {
        setUpvotes(upvotes + 1); // Update upvotes state with current value + 1
      };
      
      const handleDownvote = () => {
        setUpvotes(upvotes - 1); // Update upvotes state with current value - 1
      };

    let content;

    if (status === 'loading') {
        content = (<h2>Loading post...</h2>)
    } else if( status === "fulfilled") {
        content = ( 
            <>
            <div className='post'>
                <div className='upvotes'>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} className="comi" onClick={handleUpvote}/>
                    <h2 className="votes">{upvotes}</h2>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} className="comi" onClick={handleDownvote}/>
                </div>
                <div className="containerpost">
                    <div className="postcontent">
                        <div className="postinitials">
                            <img src={acc} alt="" />
                            <Link to={post.url}><h4>{post.subreddit_name_prefixed}</h4></Link>
                            <p>Posted By {post.author}</p>
                        </div>
                        <div className="titlecontent">
                            <h2 className="titlu">{post.title}</h2>
                        </div>
                        <div className="continutcontent">
                            <p>{post.selftext}</p>
                            <img src={post.thumbnail} alt="thumbnail" />
                        </div>
                        <div className="buttonsa">
                            <Link >
                                <p> <FontAwesomeIcon icon={faComment} className="comi" />{}Comments</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="commentscontainer">
                <ul>
                    {comments.map((comment) => {
                        return <Comment comment={comment} key={comment.id} />;
                    })}
                </ul>
            </div>
        </>
        )
    } else if(status === 'rejected') {
        content = (<h2>{error}</h2>)
    }

    return <>{content}</>
}

export default Post