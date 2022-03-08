import React from 'react'
import'./style.css'
import {Route,Routes,Link} from "react-router-dom";

import Button from '@restart/ui/esm/Button';
import Login from '../Login';
const Home = () => {
        
    return (
        <div className='hero-container'>
          <video src='/videos/video-1.mp4' autoPlay loop muted />
          <h1>ADVENTURE AWAITS</h1>

          <p>What are you waiting for?</p>
          <div className='hero-btns'>
            <Link to="/Books">
            <Button
              className='info__button'
              buttonStyle='btn--outline'
              buttonSize='btn--large'
            >
              BOOKS
            </Button>
              </Link>
            <br/>
            <Link to="/Arthers">
            <Button
              className='info__button'
              buttonStyle='btn--primary'
              buttonSize='btn--large'
              onClick={''}
            >
              ARTHERS <i className='far fa-play-circle' />
            </Button>
            </Link>

          </div>
        </div>
      );
    }
    
export default Home;
