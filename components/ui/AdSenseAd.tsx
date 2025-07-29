'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense 광고 로드 중 오류:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
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
