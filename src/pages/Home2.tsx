import React, { useState, useEffect } from 'react';
import authS3 from '../config/authS3';

const url = '';
const url_rec = '';

const BUCKET_NAME = '';
const IMG_URL = '';
const IMG_URL_RECOMMENDATIONS = '';


const Home2: React.FC = () => {
  const [imageURL, setImageURL] = useState<string>('');
  const [imageURLRec, setImageURLRec] = useState<string>('');

  useEffect(() => {
    const getUrl = () => {
      authS3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: IMG_URL,
        Expires: 60 * 5, // time in seconds: e.g. 60 * 5 = 5 mins
      }, (err, url) => {
        if (err) throw err;
        console.log('Image URL: ', url);
        setImageURL(url);
      });
    }

    const getUrlRecommendations = () => {
      authS3.getSignedUrl('getObject', {
        Bucket: BUCKET_NAME,
        Key: IMG_URL_RECOMMENDATIONS,
        Expires: 60 * 5, // time in seconds: e.g. 60 * 5 = 5 mins
      }, (err, url) => {
        if (err) throw err;
        console.log('Image URL: ', url);
        setImageURLRec(url);
      });
    }

    const getFile = (async () => {
      try {
        const file = await authS3
          .getObject({ Bucket: BUCKET_NAME, Key: IMG_URL })
          .promise();
        console.log(file.Body);
      } catch (err) {
        console.log(err);
      }
    });

    getUrl();
    getUrlRecommendations();
    getFile();
  }, [])

  return (
    <div>
      <h1>Home 2</h1>
      <span>Image</span>
      <img src={imageURL} alt='' />
      <img src={imageURLRec} alt='' />
    </div>
  );
}

export default Home2;