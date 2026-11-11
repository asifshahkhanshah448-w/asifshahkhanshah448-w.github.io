import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'LUXESTAY | Luxury Hotels, Resorts & Private Villas',
  description: 'Experience unparalleled elegance, five-star hospitality, and curated luxury stays around the globe with LUXESTAY.',
  openGraph: {
    title: 'LUXESTAY | Luxury Hotels, Resorts & Private Villas',
    description: 'Experience unparalleled elegance, five-star hospitality, and curated luxury stays around the globe with LUXESTAY.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUXESTAY | Luxury Hotels, Resorts & Private Villas',
    description: 'Experience unparalleled elegance, five-star hospitality, and curated luxury stays around the globe with LUXESTAY.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
