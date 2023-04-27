import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from "@fortawesome/free-regular-svg-icons"
import { faArrowAltCircleDown } from "@fortawesome/free-regular-svg-icons"
import acc from './acc.png';
import CommentReplies from './CommentReplies';


const Comment = ({ comment }) => {
  return (
    <div className="comments">
      <div className="comment">
        <div className="info">
          <img src={acc} alt="" />
          <h5>{comment.author}</h5>
          <p>{comment.created_utc} ago</p>
        </div>
        <div className="commentcontent">
          <p>{comment.body}</p>
        </div>
        <div className='upvotescom'>
          <FontAwesomeIcon icon={faArrowAltCircleUp} className="comicom" />
          <h2 className="votescom">{comment.score}</h2>
          <FontAwesomeIcon icon={faArrowAltCircleDown} className="comicom" />
        </div>
        <ul className='listareplieuri'>
          <CommentReplies comment={comment} />
        </ul>

      </div>
    </div>
  )
}

export default Comment