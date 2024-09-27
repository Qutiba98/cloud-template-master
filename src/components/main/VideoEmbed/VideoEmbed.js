import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoEmbed.css'; // Import the CSS for styling the video

const VideoEmbed = () => {
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(false);

  const API_KEY = 'AIzaSyBRcFwkHw5OIWO-t7hQYK5DO3naMl5pbWw'; // Replace with your actual API key
  const VIDEO_ID = '77lMCiiMilo'; // The ID of the YouTube video you want to fetch

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,player&id=${VIDEO_ID}&key=${API_KEY}`
        );
        if (response.data.items && response.data.items.length > 0) {
          setVideoData(response.data.items[0]);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
        setError(true);
      }
    };

    fetchVideoDetails();
  }, [VIDEO_ID, API_KEY]);

  if (error) {
    return <p>Failed to load video.</p>;
  }

  return (
    <div className="video-wrapper">
      <h2 className='title-md'>Check out what we offer on our cloud storage service</h2>
      <div className="video-container">
        {videoData ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: videoData.player.embedHtml }} />
          </>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default VideoEmbed;
