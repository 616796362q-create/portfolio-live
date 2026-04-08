import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PROJECTS_PATH = path.join(process.cwd(), 'src/data/projects.json');

export async function GET() {
  try {
    const data = fs.readFileSync(PROJECTS_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you'd validate the session/auth here
    
    fs.writeFileSync(PROJECTS_PATH, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ message: 'Projects updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save projects' }, { status: 500 });
  }
}
