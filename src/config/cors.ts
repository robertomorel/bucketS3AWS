import { PutBucketCorsCommand } from '@aws-sdk/client-s3';
import s3, { albumBucketName } from './s3'

export default async function run() {
  // Set params
  // Create initial parameters JSON for putBucketCors
  const thisConfig = {
    AllowedHeaders: ["Authorization"],
    AllowedMethods: [],
    AllowedOrigins: ["*"],
    ExposeHeaders: [],
    MaxAgeSeconds: 3000,
  };

  // Assemble the list of allowed methods based on command line parameters
  const allowedMethods: never[] = [];
  process.argv.forEach(function (val, index, array) {
    if (val.toUpperCase() === "POST") {
      allowedMethods.push("POST" as never);
    }
    if (val.toUpperCase() === "GET") {
      allowedMethods.push("GET" as never);
    }
    if (val.toUpperCase() === "PUT") {
      allowedMethods.push("PUT" as never);
    }
    if (val.toUpperCase() === "PATCH") {
      allowedMethods.push("PATCH" as never);
    }
    if (val.toUpperCase() === "DELETE") {
      allowedMethods.push("DELETE" as never);
    }
    if (val.toUpperCase() === "HEAD") {
      allowedMethods.push("HEAD" as never);
    }
  });

  // Copy the array of allowed methods into the config object
  thisConfig.AllowedMethods = allowedMethods;

  // Create array of configs then add the config object to it
  const corsRules = new Array(thisConfig);

  // Create CORS params
  const corsParams = {
    Bucket: albumBucketName,
    CORSConfiguration: { CORSRules: corsRules },
  };

  try {
    const data = await s3.send(new PutBucketCorsCommand(corsParams));
    console.log("Success: ", data);
  } catch (err) {
    console.log("Error Cors: ", err);
  }
}