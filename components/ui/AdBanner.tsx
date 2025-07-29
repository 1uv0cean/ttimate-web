'use client';

import { useEffect, useState } from 'react';
import { LoadingAd } from './AdSenseAd';
import { Card } from './Card';
import { Typography } from './Typography';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  type?: 'banner' | 'interstitial' | 'native';
  className?: string;
  placeholder?: boolean;
}

export const AdBanner = ({
  size = 'medium',
  type = 'banner',
  className = '',
  placeholder = false,
}: AdBannerProps) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (placeholder) return;

    // Google AdSense 코드 로드 시뮬레이션
    const loadAds = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    };

    loadAds();
  }, [placeholder]);

  const sizeClasses = {
    small: 'h-24 max-w-sm',
    medium: 'h-32 max-w-md',
    large: 'h-48 max-w-2xl',
  };

  if (placeholder) {
    return (
      <Card
        className={`${sizeClasses[size]} flex w-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}
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

  return (
    <div className={`${sizeClasses[size]} w-full ${className}`}>
      {!adLoaded ? (
        <Card className="flex h-full items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="p-4 text-center">
            <div className="animate-pulse">
              <Typography variant="small" className="text-gray-400">
                광고 로딩 중...
              </Typography>
            </div>
          </div>
        </Card>
      ) : (
        <div className="h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
          {/* 광고 컨테이너 - 실제 AdSense 코드가 들어갈 곳 */}
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="p-4 text-center">
              <LoadingAd />
            </div>
          </div>
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
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-2xl">
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
