'use client';

import { useEffect, useState } from 'react';
import { Typography } from './Typography';
import { Card } from './Card';

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
  placeholder = false 
}: AdBannerProps) => {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (placeholder) return;

    // Google AdSense 코드 로드 시뮬레이션
    const loadAds = () => {
      // 실제 운영 시 아래 코드 사용
      // if (typeof window !== 'undefined' && window.adsbygoogle) {
      //   (window.adsbygoogle = window.adsbygoogle || []).push({});
      // }
      
      // 현재는 시뮬레이션
      setTimeout(() => setAdLoaded(true), 1000);
    };

    loadAds();
  }, [placeholder]);

  const sizeClasses = {
    small: 'h-24 max-w-sm',
    medium: 'h-32 max-w-md', 
    large: 'h-48 max-w-2xl'
  };

  const typeConfig = {
    banner: {
      width: '728',
      height: '90',
      slot: 'banner-slot'
    },
    interstitial: {
      width: '320', 
      height: '480',
      slot: 'interstitial-slot'
    },
    native: {
      width: '300',
      height: '250', 
      slot: 'native-slot'
    }
  };

  if (placeholder) {
    return (
      <Card className={`${sizeClasses[size]} w-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <Typography variant="small" className="text-gray-400 mb-1">
            📺 광고 영역
          </Typography>
          <Typography variant="small" className="text-gray-400 text-xs">
            Google AdSense ({size})
          </Typography>
        </div>
      </Card>
    );
  }

  return (
    <div className={`${sizeClasses[size]} w-full ${className}`}>
      {!adLoaded ? (
        <Card className="h-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="animate-pulse">
              <Typography variant="small" className="text-gray-400">
                광고 로딩 중...
              </Typography>
            </div>
          </div>
        </Card>
      ) : (
        <div className="h-full w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* 광고 컨테이너 - 실제 AdSense 코드가 들어갈 곳 */}
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="text-center p-4">
              <Typography variant="small" className="text-gray-600 mb-2">
                🎯 맞춤 광고
              </Typography>
              <Typography variant="small" className="text-gray-500 text-xs">
                실제 서비스에서는 여기에 광고가 표시됩니다
              </Typography>
            </div>
          </div>
          
          {/* 실제 AdSense 코드 예시 (주석 처리됨) */}
          {/*
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
            data-ad-slot={typeConfig[type].slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          */}
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

export const InterstitialAd = ({ 
  isVisible, 
  onClose, 
  duration = 5 
}: InterstitialAdProps) => {
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative">
        {/* 닫기 버튼 */}
        {canClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}

        {/* 카운트다운 */}
        {!canClose && (
          <div className="absolute top-2 right-2 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {countdown}
          </div>
        )}

        {/* 광고 내용 */}
        <div className="p-6">
          <Typography variant="h3" className="text-center mb-4 text-gray-800">
            잠시만 기다려주세요
          </Typography>
          
          <AdBanner size="large" type="interstitial" />
          
          <Typography variant="small" className="text-center mt-4 text-gray-500">
            {canClose 
              ? '광고 시청이 완료되었습니다. 결과를 확인하세요!' 
              : `${countdown}초 후 결과를 볼 수 있습니다`
            }
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
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID';
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