import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Here you would typically use a library like nodemailer to send email
    // or a tool like Prisma to save to a database.
    console.log('--- NEW PROJECT INQUIRY ---');
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log('---------------------------');

    // Simulating database latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { message: `Thank you, ${name}! Your inquiry was received.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error processing inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
