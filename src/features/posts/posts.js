import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-regular-svg-icons"
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import acc from './acc.png'
import './posts.css'

import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { activeSubreddit } from '../subreddits/subRedditsSlice'
import { toggleFullText } from './postsSlice'
import { setSelectedPost, setSelectedPostId } from '../Post/postSlice';
import { useState } from 'react'


const Posts = ({ post }) => {
    const { permalink, id, title, ups, author, is_video, media, thumbnail, num_comments, selftext } = post;

    const dispatch = useDispatch();

    const fullText = useSelector(state => state.posts.fullText)
    const active = useSelector(activeSubreddit);

    const handlePostSelect = () => {
        dispatch(setSelectedPostId(id));
        dispatch(setSelectedPost(post));
    };

    const handleToggleFullText = (id) => {
        dispatch(toggleFullText(id))
    }

    const [upvotes, setUpvotes] = useState(ups);

    const handleUpvote = () => {
        setUpvotes(upvotes + 1); // Update upvotes state with current value + 1
    };

    const handleDownvote = () => {
        setUpvotes(upvotes - 1); // Update upvotes state with current value - 1
    };

    let mediaCont;
    if (thumbnail !== 'self') {
        mediaCont = (<img src={thumbnail} alt="" className='pozasub' />)
    } else if (thumbnail === 'self' && is_video) {
        mediaCont = (<video
            src={media.reddit_video.fallback_url}
            controls
            loop={true}
            preload='auto'
            className="pozasub"
        />)
    } else if (thumbnail !== 'self' && is_video) {
        mediaCont = (<img src={thumbnail} alt="" className='pozasub' />)
    }

    return (

        <div className="content">
            <div className='contwraper'>

                <header className='headp'>
                    <img src={acc} alt={author} className='pozar' />
                    <div className='scristit'>
                        <h3><Link className='link' to={active}>{active}</Link></h3>
                        <p className="author"> Posted by {author}</p>
                    </div>
                </header>

                <div className="postbody">
                    <div className='contentb'>
                        <Link className='link subtit' to={`${permalink}`} > <h2 className="title" onClick={handlePostSelect}>{title}</h2></Link>
                        <p className='paragraftext' >
                            {selftext.length <= 500 ? selftext : (
                                fullText[id] ? selftext : `${selftext.slice(0, 300)}...`
                            )}
                            {selftext.length > 500 && (
                                fullText[id] ? (
                                    <p onClick={() => handleToggleFullText(id)}>Read less</p>
                                ) : (
                                    <p onClick={() => handleToggleFullText(id)}>Read more</p>
                                )
                            )}

                        </p>
                        <div className="buttonsa">
                            <Link className='link' to={`${permalink}`}>
                                <p onClick={handlePostSelect}> <FontAwesomeIcon icon={faComment} className="comi" />{num_comments} Comments</p>
                            </Link>
                        </div>
                    </div>
                    <div className="containterpoza">
                        {mediaCont}
                    </div>
                </div>
            </div>
            {/* upvotes */}
            <div className='upvotes'>
                <FontAwesomeIcon icon={faArrowAltCircleUp} className="comi" onClick={handleUpvote} />
                <h2 className="votes">{upvotes}</h2>
                <FontAwesomeIcon icon={faArrowAltCircleDown} className="comi"onClick={handleDownvote} />
            </div>
        </div>

    )
}

export default Posts