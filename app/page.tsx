'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';
import { Typography } from '@/components/ui/Typography';
import { validateYear } from '@/lib/zodiac';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [childYear, setChildYear] = useState('');
  const [parentYear, setParentYear] = useState('');
  const [errors, setErrors] = useState<{ child?: string; parent?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // 입력값 검증
    const childYearNum = parseInt(childYear);
    const parentYearNum = parseInt(parentYear);

    const childValidation = validateYear(childYearNum);
    const parentValidation = validateYear(parentYearNum);

    if (!childValidation.isValid || !parentValidation.isValid) {
      setErrors({
        child: childValidation.error,
        parent: parentValidation.error,
      });
      setIsLoading(false);
      return;
    }

    // 결과 페이지로 이동
    const params = new URLSearchParams({
      child: childYear,
      parent: parentYear,
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500 sm:h-8 sm:w-8" />
              <Typography variant="h2" className="text-xl font-bold text-pink-600 sm:text-2xl">
                띠메이트
              </Typography>
              <Sparkles className="h-6 w-6 text-purple-500 sm:h-8 sm:w-8" />
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-lg">
          {/* 소개 섹션 */}
          <div className="mb-8 text-center sm:mb-12">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              자녀와 부모의 띠 궁합
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              생년을 입력하여 띠를 확인하고
              <br />
              부모와 자녀의 특별한 궁합을 알아보세요
            </Typography>
          </div>

          {/* 입력 폼 */}
          <Card className="border-0 bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Section padding="none">
                <Typography
                  variant="h3"
                  className="mb-6 text-center text-lg font-semibold text-gray-700"
                >
                  생년 입력
                </Typography>

                <div className="space-y-4">
                  <Input
                    label="자녀 생년"
                    type="number"
                    placeholder="예: 2010"
                    value={childYear}
                    onChange={(e) => setChildYear(e.target.value)}
                    error={errors.child}
                    required
                    min={1900}
                    max={new Date().getFullYear()}
                    className="text-center text-lg"
                    size="lg"
                  />

                  <Input
                    label="부모 생년"
                    type="number"
                    placeholder="예: 1985"
                    value={parentYear}
                    onChange={(e) => setParentYear(e.target.value)}
                    error={errors.parent}
                    required
                    min={1900}
                    max={new Date().getFullYear()}
                    className="text-center text-lg"
                    size="lg"
                  />
                </div>
              </Section>

              <Button
                type="submit"
                size="lg"
                loading={isLoading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-4 text-base font-semibold text-white shadow-lg hover:from-pink-600 hover:to-purple-600"
              >
                {isLoading ? '계산 중...' : '궁합 보기'}
              </Button>
            </form>
          </Card>

          {/* 안내 메시지 */}
          <div className="mt-8 text-center">
            <Typography variant="small" className="text-gray-500">
              * 양력 기준으로 계산됩니다
              <br />* 결과 확인을 위해 잠시 광고가 표시될 수 있습니다
            </Typography>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
