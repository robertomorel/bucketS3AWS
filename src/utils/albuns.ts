import { ListObjectsCommand } from '@aws-sdk/client-s3';
import s3, { albumBucketName } from '../config/s3';

export async function albuns(): Promise<string[] | null> {
  console.log('Bucket: ', albumBucketName);

  const data = await s3.send(
    new ListObjectsCommand({ Delimiter: "/", Bucket: albumBucketName })
  );
  
  if (data && data.CommonPrefixes) {
    return data.CommonPrefixes.map(commonPrefix => {
      const prefix = commonPrefix.Prefix || '';
      return decodeURIComponent(prefix.replace("/", ""));
    });
  }

  return null;
}