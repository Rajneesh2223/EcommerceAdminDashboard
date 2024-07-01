import multiparty from 'multiparty';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};

export async function POST(request) {
  // Convert the Next.js Request object to Node.js's IncomingMessage
  const req = request;

  const form = new multiparty.Form();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({ fields, files });
      });
    });

    console.log('Fields:', fields);
    console.log('Files:', files); // Array of objects containing file information

    // Process fields and files as needed (validation, storage, etc.)

    return NextResponse.json({ message: 'Upload successful' }); // Send success response
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }); // Send error response
  }
}
