import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsPath = path.join(process.cwd(), 'js', 'script.js');
    const jsContent = await fs.readFile(jsPath, 'utf-8');

    return new Response(jsContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('console.error("Error loading script.js: ' + (error instanceof Error ? error.message : String(error)) + '");', {
      status: 500,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  }
}
