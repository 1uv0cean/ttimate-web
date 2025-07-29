'use client';

import { useEffect } from 'react';

export const ClientAdSense = () => {
  useEffect(() => {
    // 클라이언트에서만 AdSense 스크립트 로드
    if (typeof window !== 'undefined' && !document.querySelector('[data-ad-client="ca-pub-1427543231397985"]')) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427543231397985';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }, []);

  return null;
};