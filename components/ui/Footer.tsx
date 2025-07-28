'use client';

import { useEffect, useState } from 'react';
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
    <footer className={`mt-16 border-t border-pink-100 bg-white/50 py-8 text-center ${className}`}>
      <Typography variant="small" className="px-8 text-gray-400">
        © {currentYear} 띠메이트. 가족의 행복한 관계를 응원합니다.
      </Typography>
    </footer>
  );
};
