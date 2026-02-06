import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { script, language, versionIndex } = await req.json();

    // These are safe here because this code never reaches the user's browser
    const clientId = 'a9cf9017d56953a4486a9d42e06e47ba';
    const clientSecret = 'af80b1e3fd5b9721093399aa2c2ec14d29c7ffbfdc9f486a2f069edba284828d';

    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId,
        clientSecret,
        script,
        language,
        versionIndex,
      }),
    });

    const data = await response.json();

    // Forward JDoodle's response back to your frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error('JDoodle API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}