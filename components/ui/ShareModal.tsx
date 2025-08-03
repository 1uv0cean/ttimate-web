'use client';

import { getRelationshipLabels, type RelationshipType } from '@/lib/compatibility';
import { getZodiacEmoji, type ZodiacAnimal } from '@/lib/zodiac';
import { Copy, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Typography } from './Typography';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  childYear: string;
  parentYear: string;
  childAnimal: ZodiacAnimal;
  parentAnimal: ZodiacAnimal;
  compatibilityGrade: string;
  relationshipType?: RelationshipType;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

export const ShareModal = ({
  isOpen,
  onClose,
  childYear,
  parentYear,
  childAnimal,
  parentAnimal,
  compatibilityGrade,
  relationshipType = 'family',
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/result?child=${childYear}&parent=${parentYear}&relationship=${relationshipType}`
      : '';

  useEffect(() => {
    // 카카오 SDK 초기화
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      // 실제 운영시에는 환경변수로 설정
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_KEY || 'demo_key');
    }
  }, []);

  const handleKakaoShare = () => {
    // 개발 환경에서는 모바일 환경 시뮬레이션
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const relationshipLabels = getRelationshipLabels(relationshipType);

    const shareText =
      relationshipType === 'lover'
        ? `${childYear}년생 ${getZodiacEmoji(childAnimal)}와 ${parentYear}년생 ${getZodiacEmoji(parentAnimal)}의 연인 궁합은 ${compatibilityGrade}!\n\n띠메이트에서 확인해보세요: ${shareUrl}`
        : relationshipType === 'family'
          ? `${childYear}년생 ${getZodiacEmoji(childAnimal)} ${relationshipLabels.first}와 ${parentYear}년생 ${getZodiacEmoji(parentAnimal)} ${relationshipLabels.second}의 가족 궁합은 ${compatibilityGrade}!\n\n띠메이트에서 확인해보세요: ${shareUrl}`
          : `${childYear}년생 ${getZodiacEmoji(childAnimal)}와 ${parentYear}년생 ${getZodiacEmoji(parentAnimal)}의 친구 궁합은 ${compatibilityGrade}!\n\n띠메이트에서 확인해보세요: ${shareUrl}`;

    if (typeof window === 'undefined') return;

    // 개발 환경에서는 Web Share API 또는 카카오톡 URL 스키마 사용
    if (process.env.NODE_ENV === 'development') {
      if (isMobile && navigator.share) {
        // 모바일의 Web Share API 사용
        const shareTitle =
          relationshipType === 'lover'
            ? '띠메이트 - 연인 궁합 결과'
            : relationshipType === 'family'
              ? '띠메이트 - 가족 궁합 결과'
              : '띠메이트 - 친구 궁합 결과';

        navigator
          .share({
            title: shareTitle,
            text: shareText,
            url: shareUrl,
          })
          .catch(() => {
            // Web Share API 실패시 링크 복사
            handleCopyLink();
          });
      } else {
        // 데스크톱에서는 카카오톡 URL 스키마 시도
        const kakaoScheme = `kakaotalk://inappbrowser?url=${encodeURIComponent(shareUrl)}`;

        // 새 창으로 카카오톡 앱 실행 시도
        const popup = window.open(kakaoScheme, '_blank');

        // 3초 후 앱이 실행되지 않으면 링크 복사로 대체
        setTimeout(() => {
          if (popup) {
            popup.close();
          }
          alert('카카오톡 앱이 설치되어 있지 않습니다. 링크를 복사했습니다.');
          handleCopyLink();
        }, 3000);
      }
      return;
    }

    // 운영 환경에서 Kakao SDK 사용
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오톡 공유를 사용할 수 없습니다. 링크를 복사했습니다.');
      handleCopyLink();
      return;
    }

    const shareTitle =
      relationshipType === 'lover'
        ? '띠메이트 - 연인 궁합 결과'
        : relationshipType === 'family'
          ? '띠메이트 - 가족 궁합 결과'
          : '띠메이트 - 친구 궁합 결과';

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: shareTitle,
          description: shareText,
          imageUrl: `${window.location.origin}/api/og?child=${childYear}&parent=${parentYear}&relationship=${relationshipType}`,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '궁합 확인하기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error('카카오톡 공유 오류:', error);
      alert('카카오톡 공유에 실패했습니다. 링크를 복사했습니다.');
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('링크 복사에 실패했습니다.');
    }
  };

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleClose}
      title="결과 공유하기"
      description="띠 궁합 결과를 친구들과 공유해보세요!"
      size="sm"
    >
      <div className="space-y-3">
        {/* 카카오톡 공유 */}
        <Button
          onClick={handleKakaoShare}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
          size="lg"
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          {process.env.NODE_ENV === 'development' ? '공유하기' : '카카오톡으로 공유'}
        </Button>

        {/* 링크 복사 */}
        <Button onClick={handleCopyLink} variant="outline" className="w-full" size="lg">
          <Copy className="mr-2 h-5 w-5" />
          {copied ? '복사되었습니다!' : '링크 복사'}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">공유 URL</span>
          </div>
        </div>

        {/* URL 표시 */}
        <div className="rounded-lg bg-gray-50 p-3">
          <Typography variant="small" className="text-xs break-all text-gray-600">
            {shareUrl}
          </Typography>
        </div>
      </div>
    </Dialog>
  );
};
