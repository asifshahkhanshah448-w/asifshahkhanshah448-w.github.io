import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const cssPath = path.join(process.cwd(), 'css', 'style.css');
    const cssContent = await fs.readFile(cssPath, 'utf-8');

    return new Response(cssContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('/* Error loading style.css: ' + (error instanceof Error ? error.message : String(error)) + ' */', {
      status: 500,
      headers: { 'Content-Type': 'text/css; charset=utf-8' },
    });
  }
}
