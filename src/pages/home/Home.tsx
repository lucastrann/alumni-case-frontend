import React from 'react';
import '../Pages.css'
import CreatePost from '../../components/CreatePost';

const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='title'>Homepage</div>
        <CreatePost/>
      </div>
    </>
  );
};

export default Home;