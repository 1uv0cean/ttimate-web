'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from './Card';
import { Typography } from './Typography';
import { AdSenseAd } from './AdSenseAd';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'banner' | 'interstitial' | 'native';
  className?: string;
  placeholder?: boolean;
}

// 광고 슬롯 정의
const AD_SLOTS = {
  small: '4869775532',     // 기존 로딩 광고 슬롯 재사용
  medium: '4869775532',    // 동일한 슬롯을 다른 크기로 사용
  large: '4869775532',     // 동일한 슬롯을 다른 크기로 사용
  interstitial: '4869775532' // 전면 광고도 동일한 슬롯 사용
} as const;

export const AdBanner = ({
  size = 'medium',
  type = 'banner',
  className = '',
  placeholder = false,
}: AdBannerProps) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (placeholder) return;

    // 광고 로드 시뮬레이션 (실제 AdSenseAd 컴포넌트가 처리)
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        setAdLoaded(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [placeholder]);

  const sizeClasses = {
    small: 'min-h-[100px] sm:min-h-[120px]',
    medium: 'min-h-[90px] sm:min-h-[120px] md:min-h-[150px]',
    large: 'min-h-[150px] sm:min-h-[200px] md:min-h-[250px]',
  };

  if (placeholder) {
    return (
      <Card
        className={`${sizeClasses[size]} flex w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden ${className}`}
      >
        <div className="p-4 text-center">
          <Typography variant="small" className="mb-1 text-gray-400">
            📺 광고 영역
          </Typography>
          <Typography variant="small" className="text-xs text-gray-400">
            Google AdSense ({size})
          </Typography>
        </div>
      </Card>
    );
  }

  // 광고 슬롯 선택
  const getAdSlot = () => {
    if (type === 'interstitial') return AD_SLOTS.interstitial;
    return AD_SLOTS[size];
  };

  // 광고 스타일 설정 - 반응형
  const getAdStyle = () => {
    const baseStyle = { 
      display: 'block',
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
      minHeight: '50px'
    };
    return baseStyle;
  };

  return (
    <div ref={adContainerRef} className={`${sizeClasses[size]} w-full overflow-hidden ${className}`}>
      {!adLoaded ? (
        <Card className="flex h-full w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="p-4 text-center">
            <div className="animate-pulse">
              <Typography variant="small" className="text-gray-400">
                광고 로딩 중...
              </Typography>
            </div>
          </div>
        </Card>
      ) : (
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-white">
          <AdSenseAd
            slot={getAdSlot()}
            format="fluid"
            responsive={true}
            style={getAdStyle()}
            className="w-full"
            layoutKey="-fb+5w+4e-db+86"
          />
        </div>
      )}
    </div>
  );
};

// 전면 광고 컴포넌트
interface InterstitialAdProps {
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // 초 단위
}

export const InterstitialAd = ({ isVisible, onClose, duration = 5 }: InterstitialAdProps) => {
  const [countdown, setCountdown] = useState(duration);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      setCountdown(duration);
      setCanClose(false);
    }
  }, [isVisible, duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-2xl overflow-hidden">
        {/* 닫기 버튼 */}
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300"
          >
            ✕
          </button>
        )}

        {/* 카운트다운 */}
        {!canClose && (
          <div className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
            {countdown}
          </div>
        )}

        {/* 광고 내용 */}
        <div className="p-6">
          <Typography variant="h3" className="mb-4 text-center text-gray-800">
            잠시만 기다려주세요
          </Typography>

          <AdBanner size="large" type="interstitial" />

          <Typography variant="small" className="mt-4 text-center text-gray-500">
            {canClose
              ? '광고 시청이 완료되었습니다. 결과를 확인하세요!'
              : `${countdown}초 후 결과를 볼 수 있습니다`}
          </Typography>
        </div>
      </div>
    </div>
  );
};

// AdSense 스크립트 로드 함수
export const loadAdSenseScript = () => {
  if (typeof window === 'undefined') return;

  // 이미 로드되었는지 확인
  if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1427543231397985';
  script.crossOrigin = 'anonymous';

  document.head.appendChild(script);
};

// 광고 블록 감지 함수
export const detectAdBlocker = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const adTest = document.createElement('div');
    adTest.innerHTML = '&nbsp;';
    adTest.className = 'adsbox';
    adTest.style.position = 'absolute';
    adTest.style.left = '-10000px';

    document.body.appendChild(adTest);

    setTimeout(() => {
      const isBlocked = adTest.offsetHeight === 0;
      document.body.removeChild(adTest);
      resolve(isBlocked);
    }, 100);
  });
};
