// TODO: For now I am using aws sdk to store files.
// For this to function I need to find a better service.
import { S3Client } from '@aws-sdk/client-s3';
import { Content } from 'next/font/google';
import uniqid from 'uniqid';

export async function POST(req: any) {
    const data = await req.formData();

    if (data.get('file')) {

       const file = data.get('file');

       const s3Client = new S3Client({
            region: 'us-east-1',
            credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const extension = file.name.split('.').slice(-1);
        const uniqueFileName = uniqid() + '.' + extension;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        s3Client.send(new PutObjectCommand({
            Bucket: 'my-bucket',
            Key: uniqueFileName,
            Body: file,
            ACL: 'public-read',
            ContentType: buffer,
        }));

        return Response.json('https://my-bucket.s3.amazonaws.com/' + uniqueFileName);

    }

    return Response.json(true);
}