import { Metadata } from 'next';
import { SITE_URL } from '@/utils/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

export function generateMetadata({
  title,
  description,
  image = '/og-image.png',
  url = SITE_URL,
  type = 'website'
}: MetaTagsProps): Metadata {
  const fullTitle = `${title} | Quantum Tea Brewing`;
  const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Quantum Tea Brewing',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: '@quantumtea'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url
    }
  };
}