import React, { useState, useEffect } from 'react';
import { albuns, images } from '../utils';

const Home: React.FC = () => {
  const [albumsName, setAlbumsName] = useState<string[] | null>([]);
  const [imagesURL, setImagesURL] = useState<string[] | undefined>([]);
  
  useEffect(() => {
    async function getS3AlbumsNames() {
      const names = await albuns(); 
      setAlbumsName(names);
    } 

    getS3AlbumsNames();
  }, []);

  useEffect(() => {
    async function getS3ImagesURL() {
      albumsName?.map(async (albumName) => {
        const urls = await images(albumName); 
        if(urls && urls.length > 1) {
          setImagesURL(imagesURL?.concat(urls.slice(1)));
        }  
      })
    } 

    getS3ImagesURL();
  }, [albumsName, imagesURL])

  return (
    <div>
      <h1>Albuns Names</h1>

      {albumsName && albumsName.map(albumName => (
          <p key={albumName}>
            {albumName}
          </p>
        )
      )}

      <h1>Images</h1>

      {imagesURL && imagesURL.map(imageURL => (
          <div>
            <img src={imageURL} alt='' width='50px' />
          </div>
        )
      )}
    </div>
  );
}

export default Home;