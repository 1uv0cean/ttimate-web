'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Typography } from './Typography';

interface FooterProps {
  className?: string;
}

export const Footer = ({ className = '' }: FooterProps) => {
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={`mt-16 border-t border-pink-100 bg-white/50 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/" className="text-gray-600 hover:text-pink-600 transition-colors">
              홈
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/about" className="text-gray-600 hover:text-pink-600 transition-colors">
              서비스 소개
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/privacy" className="text-gray-600 hover:text-pink-600 transition-colors">
              개인정보처리방침
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="text-gray-600 hover:text-pink-600 transition-colors">
              이용약관
            </Link>
          </div>
          <Typography variant="small" className="text-gray-400">
            © {currentYear} 띠메이트. 가족의 행복한 관계를 응원합니다.
          </Typography>
        </div>
      </div>
    </footer>
  );
};
