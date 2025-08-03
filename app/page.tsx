'use client';

import { AdBanner } from '@/components/ui/AdBanner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography';
import { validateYear } from '@/lib/zodiac';
import { Heart, Sparkles, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();
  const [childYear, setChildYear] = useState('');
  const [parentYear, setParentYear] = useState('');
  const [relationshipType, setRelationshipType] = useState('family');
  const [errors, setErrors] = useState<{ child?: string; parent?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const relationshipOptions = [
    { value: 'lover', label: '🥰 연인' },
    { value: 'family', label: '👨‍👩‍👧‍👦 가족' },
    { value: 'friend', label: '👥 지인' },
  ];

  // 페이지 포커스 시 로딩 상태 초기화
  useEffect(() => {
    const handleFocus = () => {
      setIsLoading(false);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsLoading(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

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
      relationship: relationshipType,
    });

    router.push(`/result?${params.toString()}`);
    
    // 페이지 이동 후 로딩 상태 초기화 (약간의 지연 후)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
              띠로 알아보는 특별한 궁합
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              생년을 입력하여 띠를 확인하고
              <br />
              연인, 가족, 지인과의 궁합을 알아보세요
            </Typography>
            <Typography variant="small" className="mt-2 text-gray-500">
              관계를 이해하고 소통을 돕는 전통 띠 궁합 서비스
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
                  궁합 정보 입력
                </Typography>

                <div className="space-y-4">
                  <Select
                    label="관계 유형"
                    options={relationshipOptions}
                    value={relationshipType}
                    onValueChange={setRelationshipType}
                    leftIcon={<Users className="h-4 w-4" />}
                    size="lg"
                  />

                  <Input
                    label={relationshipType === 'family' ? "자녀 생년" : relationshipType === 'lover' ? "나의 생년" : "본인 생년"}
                    type="number"
                    placeholder="예: 2000"
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
                    label={relationshipType === 'family' ? "부모 생년" : relationshipType === 'lover' ? "상대방 생년" : "상대방 생년"}
                    type="number"
                    placeholder="예: 1998"
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

          {/* 광고 배치 - 입력 폼 아래 */}
          <div className="mt-8 mx-auto max-w-md">
            <AdBanner size="medium" placeholder={false} />
          </div>

          {/* 서비스 소개 */}
          <Card className="mt-8 border-gray-200 bg-gray-50 p-6">
            <Typography
              variant="h3"
              className="mb-4 text-center text-lg font-semibold text-gray-700"
            >
              띠메이트 서비스 소개
            </Typography>
            <div className="space-y-3 text-sm text-gray-600">
              <Typography>
                {relationshipType === 'lover' 
                  ? '띠메이트는 동양의 전통적인 12간지 띠를 기반으로 연인 간의 성격적 조화와 애정 궁합을 분석하는 서비스입니다.'
                  : relationshipType === 'family'
                  ? '띠메이트는 동양의 전통적인 12간지 띠를 기반으로 가족 구성원 간의 성격적 조화를 분석하는 서비스입니다.'
                  : '띠메이트는 동양의 전통적인 12간지 띠를 기반으로 친구나 지인 간의 성격적 조화와 우정을 분석하는 서비스입니다.'
                }
              </Typography>
              <Typography>
                {relationshipType === 'lover'
                  ? '각 띠가 가진 고유한 성격적 특성과 오행(五行) 이론을 바탕으로, 연인 관계를 더 깊이 이해하고 서로를 사랑하는 데 도움을 드립니다.'
                  : relationshipType === 'family'
                  ? '각 띠가 가진 고유한 성격적 특성과 오행(五行) 이론을 바탕으로, 가족 관계를 더 깊이 이해하고 서로를 존중하는 데 도움을 드립니다.'
                  : '각 띠가 가진 고유한 성격적 특성과 오행(五行) 이론을 바탕으로, 친구 관계를 더 깊이 이해하고 서로를 존중하는 데 도움을 드립니다.'
                }
              </Typography>
              <div className="mt-4 rounded-lg bg-white p-4">
                <Typography variant="h4" className="mb-2 font-semibold text-gray-700">
                  12간지란?
                </Typography>
                <Typography className="text-gray-600">
                  쥐, 소, 호랑이, 토끼, 용, 뱀, 말, 양, 원숭이, 닭, 개, 돼지의 12가지 동물로
                  이루어진 동양의 전통적인 시간 체계입니다. 각 띠는 12년 주기로 반복되며, 태어난
                  해의 띠가 그 사람의 기본적인 성격과 기질에 영향을 준다고 여겨집니다.
                </Typography>
              </div>
            </div>
          </Card>

          {/* 이용 방법 */}
          <Card className="mt-6 border-purple-200 bg-purple-50 p-6">
            <Typography
              variant="h3"
              className="mb-4 text-center text-lg font-semibold text-purple-700"
            >
              이용 방법
            </Typography>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-sm font-bold text-purple-700">
                  1
                </div>
                <div>
                  <Typography className="text-sm text-gray-700">
                    관계 유형(연인, 가족, 지인)을 선택하고 두 사람의 태어난 연도를 입력해주세요. (양력 기준)
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-sm font-bold text-purple-700">
                  2
                </div>
                <div>
                  <Typography className="text-sm text-gray-700">
                    '궁합 보기' 버튼을 클릭하면 자동으로 띠가 계산됩니다.
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-sm font-bold text-purple-700">
                  3
                </div>
                <div>
                  <Typography className="text-sm text-gray-700">
                    {relationshipType === 'lover'
                      ? '연인 관계에 맞는 궁합 결과와 함께 더 달콤한 사랑을 위한 조언을 확인하세요.'
                      : relationshipType === 'family'
                      ? '가족 관계에 맞는 궁합 결과와 함께 더 화목한 가정을 위한 조언을 확인하세요.'
                      : '친구 관계에 맞는 궁합 결과와 함께 더 깊은 우정을 위한 조언을 확인하세요.'
                    }
                  </Typography>
                </div>
              </div>
            </div>
          </Card>

          {/* 추가 정보 링크 */}
          <Card className="mt-6 border-blue-200 bg-blue-50 p-6">
            <Typography
              variant="h3"
              className="mb-4 text-center text-lg font-semibold text-blue-700"
            >
              더 자세히 알아보기
            </Typography>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link 
                href="/zodiac" 
                className="rounded-lg bg-white p-3 text-center transition-all hover:bg-blue-100 hover:shadow-md"
              >
                <Typography className="text-sm font-semibold text-blue-700">
                  📅 12간지 띠별 정보
                </Typography>
                <Typography className="text-xs text-gray-600">
                  각 띠의 성격과 특징 알아보기
                </Typography>
              </Link>
              <Link 
                href="/compatibility" 
                className="rounded-lg bg-white p-3 text-center transition-all hover:bg-blue-100 hover:shadow-md"
              >
                <Typography className="text-sm font-semibold text-blue-700">
                  💕 궁합 가이드
                </Typography>
                <Typography className="text-xs text-gray-600">
                  띠 궁합의 원리와 해석법
                </Typography>
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
