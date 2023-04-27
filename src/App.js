
import './App.css';
import Searchbar from './features/searchBar/Searchbar';
import Subreddits from './features/subreddits/subreddit';
import { Route, Routes } from "react-router-dom"
import Post from './features/Post/Post';
import { activeSubreddit } from './features/subreddits/subRedditsSlice';
import { useSelector } from 'react-redux';


function App() {
 
  const active = useSelector(activeSubreddit)


  return (
    <>
      <Searchbar />
      <Routes>
        <Route path="/" element={<Subreddits />} />
        {/* <Route path={`${active}comments/${postId}`} element={<Post />}/> */}
        <Route path='/r/:subredditName/comments/:postId/:postName' element={<Post />}/>

        <Route path={active} element={<Subreddits />} />

      </Routes>
    </>
  );
}

export default App;
