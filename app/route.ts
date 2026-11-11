import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const indexPath = path.join(process.cwd(), 'index.html');
    const htmlContent = await fs.readFile(indexPath, 'utf-8');

    return new Response(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('Error loading static index.html: ' + (error instanceof Error ? error.message : String(error)), {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
