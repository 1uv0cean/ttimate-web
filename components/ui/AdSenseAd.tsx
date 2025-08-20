'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  layoutKey?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// 전역 광고 로드 상태 추적
const loadedAds = new Set<string>();

export const AdSenseAd: React.FC<AdSenseAdProps> = ({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
  layoutKey,
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adId = `ad-${slot}`;

  useEffect(() => {
    // 이미 로드된 광고 슬롯인지 확인
    if (loadedAds.has(adId)) return;

    const loadAd = () => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle && adRef.current) {
          const insElement = adRef.current.querySelector('ins');
          
          // ins 요소가 존재하고 아직 광고가 로드되지 않은 경우에만 실행
          if (insElement && !insElement.hasAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            loadedAds.add(adId);

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
        // 오류 발생 시에도 재시도 방지를 위해 로드됨으로 표시
        loadedAds.add(adId);
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
      if (!loadedAds.has(adId)) {
        loadedAds.add(adId); // 타임아웃 시에도 재시도 방지
      }
    }, 5000);

    return () => {
      clearInterval(checkAdSense);
      clearTimeout(timeout);
    };
  }, [slot, adId]);

  return (
    <div ref={adRef} className={`adsense-container relative min-w-[320px] ${className}`} style={{ minHeight: '100px' }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minWidth: '320px',
          width: '100%',
          minHeight: '100px',
          ...style,
        }}
        data-ad-client="ca-pub-1427543231397985"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
        {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
      />
    </div>
  );
};

// 미리 정의된 광고 유닛들
export const AdUnits = {
  // 로딩 중 광고 (정사각형)
  LOADING: '4869775532',
} as const;

// 로딩 광고 컴포넌트 - 반응형
export const LoadingAd = () => (
  <AdSenseAd
    slot={AdUnits.LOADING}
    format="auto"
    className="mx-auto w-full max-w-sm sm:max-w-md"
    style={{ display: 'block', minHeight: '250px', minWidth: '320px' }}
    responsive={true}
  />
);
