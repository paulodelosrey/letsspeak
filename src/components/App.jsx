import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function App() {
  const [image, setImage] = useState(null);
  const [timer, setTimer] = useState(20);
  const [rating, setRating] = useState(5);
  const [showRating, setShowRating] = useState(false);

  const UNSPLASH_ACCESS_KEY = '28nt2bBBhx66fHrVCuL2tUXW3TJkLpu8fOGJ3TqtvHc';

  const fetchImage = async () => {
    console.log('fetchImage called');
    setImage(null);
    setTimer(20);
    setShowRating(false);
    try {
      console.log('Making API request...');
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: UNSPLASH_ACCESS_KEY,
          orientation: 'landscape',
          content_filter: 'high',
        },
      });
      console.log('API response:', response.data);
      setImage(response.data.urls.regular);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (image && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowRating(true);
    }
    return () => clearInterval(interval);
  }, [image, timer]);

  return (
    <div className="App">
      <h1>Let's talk in English</h1>
      <p>Describe the image in  20 seconds and rate your response from 1 to 10</p>
      <button onClick={fetchImage}>Get new image</button>
      {image ? (
        <div>
          <img src={image} alt="Random" style={{ maxWidth: '100%', marginTop: '20px' }} />
          {timer > 0 && <p>Time left: {timer} seconds</p>}
        </div>
      ) : (
        <p>No image to show</p>
      )}
      {showRating && (
        <div>
          <input
            type="range"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <p>Your rating: {rating}</p>
        </div>
      )}
    </div>
  );
}

export default App;