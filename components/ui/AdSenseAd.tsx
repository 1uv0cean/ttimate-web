'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // 이미 로드된 경우 중복 실행 방지
    if (loadedRef.current) return;

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          const insElement = adRef.current.querySelector('ins');
          
          // ins 요소가 존재하고 아직 광고가 로드되지 않은 경우에만 실행
          if (insElement && !insElement.hasAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            loadedRef.current = true;

            // 광고 로드 후 플레이스홀더 숨기기
            setTimeout(() => {
              const placeholder = adRef.current?.parentElement?.querySelector('.absolute.inset-0') as HTMLElement;
              if (placeholder && insElement.hasAttribute('data-adsbygoogle-status')) {
                placeholder.style.display = 'none';
              }
            }, 1000);
          }
        }
      } catch (error) {
        console.error('AdSense 광고 로드 중 오류:', error);
      }
    };

    // AdSense 스크립트가 로드될 때까지 대기
    const checkAdSense = setInterval(() => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        clearInterval(checkAdSense);
        loadAd();
      }
    }, 100);

    // 5초 후 타임아웃
    const timeout = setTimeout(() => {
      clearInterval(checkAdSense);
    }, 5000);

    return () => {
      clearInterval(checkAdSense);
      clearTimeout(timeout);
    };
  }, [slot]);

  return (
    <div ref={adRef} className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1427543231397985"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
};

// 미리 정의된 광고 유닛들
export const AdUnits = {
  // 로딩 중 광고 (정사각형)
  LOADING: '4869775532',
} as const;

// 로딩 광고 컴포넌트
export const LoadingAd = () => (
  <AdSenseAd
    slot={AdUnits.LOADING}
    format="rectangle"
    className="mx-auto"
    style={{ display: 'block', width: '300px', height: '250px' }}
  />
);
