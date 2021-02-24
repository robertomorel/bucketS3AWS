import AWS from 'aws-sdk';

export const accessKeyId = '';
export const secretAccessKey = '';

const accessparams = {
  accessKeyId,
  secretAccessKey,
  //sessionToken: data.Credentials.SessionToken,
};

const authS3 = new AWS.S3(accessparams);

export default authS3;