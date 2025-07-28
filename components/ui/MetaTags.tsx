'use client';

import { useEffect } from 'react';

interface MetaTagsProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
}

export const MetaTags = ({ 
  title = '띠메이트 - 띠 궁합 결과',
  description = '자녀와 부모의 띠 궁합 결과를 확인하세요',
  ogImage,
  ogUrl
}: MetaTagsProps) => {
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    // 동적으로 메타 태그 업데이트
    if (title) {
      document.title = `${title} | 띠메이트`;
    }

    // 메타 태그 업데이트 함수
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
      }
      
      if (metaTag) {
        metaTag.content = content;
      } else {
        metaTag = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', property);
        }
        metaTag.content = content;
        document.head.appendChild(metaTag);
      }
    };

    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description);
      updateMetaTag('twitter:description', description);
    }

    if (title) {
      updateMetaTag('og:title', title);
      updateMetaTag('twitter:title', title);
    }

    if (ogImage) {
      updateMetaTag('og:image', ogImage);
      updateMetaTag('twitter:image', ogImage);
    }

    if (ogUrl) {
      updateMetaTag('og:url', ogUrl);
      updateMetaTag('url', ogUrl);
    }
  }, [title, description, ogImage, ogUrl]);

  return null;
};