import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTestData } from './../../actions/action-creators/test';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTestData())
  }, [])


return (
  <div className="Home">
    <h1>Home Component</h1>
  </div>
);
}


export default Home;
