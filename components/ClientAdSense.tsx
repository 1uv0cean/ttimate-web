'use client';

import { useEffect } from 'react';

// 전역 스크립트 로드 상태
let adsenseScriptLoaded = false;

export const ClientAdSense = () => {
  useEffect(() => {
    // 이미 로드된 경우 중복 로드 방지
    if (adsenseScriptLoaded) return;
    
    // 클라이언트에서만 AdSense 스크립트 로드
    if (typeof window !== 'undefined') {
      // 기존 스크립트 확인
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      if (existingScript) {
        adsenseScriptLoaded = true;
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427543231397985';
      script.async = true;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        adsenseScriptLoaded = true;
        // 스크립트 로드 완료 시 초기화
        window.adsbygoogle = window.adsbygoogle || [];
      };
      
      script.onerror = () => {
        console.warn('AdSense 스크립트 로드 실패');
        adsenseScriptLoaded = true; // 재시도 방지
      };
      
      document.head.appendChild(script);
    }
  }, []);

  return null;
};