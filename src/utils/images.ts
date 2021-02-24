import { ListObjectsCommand } from '@aws-sdk/client-s3';
import s3, { albumBucketName, region } from '../config/s3';

export async function images(albumName = ''): Promise<string[] | null> {
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  console.log('Album Photos Key: ', albumPhotosKey);
  const data = await s3.send(
    new ListObjectsCommand({
      Prefix: albumPhotosKey,
      Bucket: albumBucketName,
    })
  );
  
  if(data && data.Contents) {
    const href = `https://s3.${region}.amazonaws.com/`;
    const bucketUrl = `${href}${albumBucketName}/`;

    return data.Contents.map(photo => {
      const photoKey = photo.Key || '';
      const fullURL = bucketUrl + encodeURIComponent(photoKey);
      return fullURL;
    });
  }

  return null;
}