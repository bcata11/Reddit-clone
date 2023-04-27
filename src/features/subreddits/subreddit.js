import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { activeSubreddit, loadSubs } from './subRedditsSlice';
import logo from "./logo.png"

import { setActiveSubreddit } from './subRedditsSlice';
import './subreddits.css'
// import Posts from '../posts/posts';
import PostsContainer from '../PostsContainer/PostsContainer';
import { Link } from 'react-router-dom'


const Subreddits = (props) => {
  const dispatch = useDispatch();
  const subreddits = useSelector((state) => state.subreddits.subReddits);
  // const activeSubredditt = useSelector(activeSubreddit);
  //nu folosim

  useEffect(() => {
    dispatch(loadSubs())

  }, [dispatch])


  return (
    <div className="supercontinut">
      <div className='subreddits'>
        <h4 className='titlusubreddits'>FEATURED SUBREDDITS</h4>
        <ul className='listasubs'>
          {subreddits.map(item => (
            <Link to="/" key={item.id} className="link">
              <li className="subreddit" onClick={() => dispatch(setActiveSubreddit(item.url))}>
                <div className='fosta'>
                  <img src={item.icon ? item.icon : logo} alt="icon" />
                  <div className='detaliisubr'>
                    <h5>{item.name}</h5>
                    <p>{item.subscribers} subscribers</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <PostsContainer />


    </div>
  )
}

export default Subreddits;