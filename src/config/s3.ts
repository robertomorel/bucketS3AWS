import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client } from '@aws-sdk/client-s3';

// Initialize the Amazon Cognito credentials provider
export const region = 'us-east-1';
export const albumBucketName = '';
export const identityPoolId = '';

const s3 = new S3Client({
  region,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region }),
    identityPoolId, 
  }),
});

export default s3;