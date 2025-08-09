import { ClientAdSense } from '@/components/ClientAdSense';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ttimate.com'),
  title: {
    default: '띠메이트 - 자녀와 부모의 띠 궁합',
    template: '%s | 띠메이트',
  },
  description:
    '자녀와 부모의 생년을 입력하여 띠를 확인하고 특별한 궁합을 알아보세요. 12지 띠별 성격과 궁합 분석을 통해 더 좋은 가족 관계를 만들어보세요.',
  keywords: [
    '띠궁합',
    '띠',
    '12지',
    '궁합',
    '가족관계',
    '부모 자녀',
    '띠운세',
    '띠성격',
    '한국전통',
    '십이지',
    '띠 궁합',
    '사주',
    '운세',
    '출산 사주',
  ],
  authors: [{ name: '띠메이트' }],
  creator: '띠메이트',
  publisher: '띠메이트',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://ttimate.com',
    siteName: '띠메이트',
    title: '띠메이트 - 자녀와 부모의 띠 궁합',
    description: '자녀와 부모의 생년을 입력하여 띠를 확인하고 특별한 궁합을 알아보세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '띠메이트 - 띠 궁합 분석 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '띠메이트 - 자녀와 부모의 띠 궁합',
    description: '자녀와 부모의 생년을 입력하여 띠를 확인하고 특별한 궁합을 알아보세요.',
    images: ['/og-image.png'],
    creator: '@ttimate',
  },
  verification: {
    google: 'your-google-verification-code',
    // naver: 'your-naver-verification-code',
  },
  category: 'entertainment',
  alternates: {
    canonical: 'https://ttimate.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <head>
        {/* Google AdSense 소유권 확인 */}
        <meta name="google-adsense-account" content="ca-pub-1427543231397985" />

        {/* 카카오톡 SDK */}
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" async />

        {/* JSON-LD 구조화 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "띠메이트",
              "description": "자녀와 부모의 띠 궁합을 분석하는 무료 서비스",
              "url": "https://ttimate.com",
              "applicationCategory": "EntertainmentApplication",
              "operatingSystem": "Web Browser",
              "datePublished": "2025-07-28",
              "dateModified": "2025-07-28",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KRW"
              },
              "author": {
                "@type": "Organization",
                "name": "띠메이트"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250"
              }
            }`,
          }}
        />

        {/* 추가적인 메타 태그 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="띠메이트" />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* 미리 연결할 도메인 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientAdSense />
        {children}

        {/* Google Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
