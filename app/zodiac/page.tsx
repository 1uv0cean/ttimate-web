'use client';

import { AdBanner } from '@/components/ui/AdBanner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { getZodiacInfo, getZodiacEmoji } from '@/lib/zodiac';
import { Heart, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

const ZodiacPage = () => {
  const zodiacAnimals = [
    { name: '쥐', years: [1960, 1972, 1984, 1996, 2008, 2020, 2032] },
    { name: '소', years: [1961, 1973, 1985, 1997, 2009, 2021, 2033] },
    { name: '호랑이', years: [1962, 1974, 1986, 1998, 2010, 2022, 2034] },
    { name: '토끼', years: [1963, 1975, 1987, 1999, 2011, 2023, 2035] },
    { name: '용', years: [1964, 1976, 1988, 2000, 2012, 2024, 2036] },
    { name: '뱀', years: [1965, 1977, 1989, 2001, 2013, 2025, 2037] },
    { name: '말', years: [1966, 1978, 1990, 2002, 2014, 2026, 2038] },
    { name: '양', years: [1967, 1979, 1991, 2003, 2015, 2027, 2039] },
    { name: '원숭이', years: [1968, 1980, 1992, 2004, 2016, 2028, 2040] },
    { name: '닭', years: [1969, 1981, 1993, 2005, 2017, 2029, 2041] },
    { name: '개', years: [1970, 1982, 1994, 2006, 2018, 2030, 2042] },
    { name: '돼지', years: [1971, 1983, 1995, 2007, 2019, 2031, 2043] },
  ];

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
        <div className="mx-auto max-w-6xl">
          {/* 제목 섹션 */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              12간지 띠별 상세 정보
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              각 띠의 성격, 특징, 그리고 해당 연도를 확인해보세요
            </Typography>
          </div>

          {/* 띠별 정보 그리드 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {zodiacAnimals.map((zodiac, index) => {
              const info = getZodiacInfo(zodiac.years[0]);
              const emoji = getZodiacEmoji(zodiac.name);
              
              return (
                <Card key={index} className="border-0 bg-white/90 p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{emoji.split(' ')[0]}</div>
                    <Typography variant="h3" className="text-xl font-bold text-gray-800 mb-1">
                      {zodiac.name}띠
                    </Typography>
                    <Typography variant="small" className="text-gray-500">
                      {info.character}
                    </Typography>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Typography variant="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        성격 특징
                      </Typography>
                      <Typography className="text-sm text-gray-600">
                        {info.traits}
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        장점
                      </Typography>
                      <Typography className="text-sm text-gray-600">
                        {info.strengths}
                      </Typography>
                    </div>

                    <div>
                      <Typography variant="h4" className="text-sm font-semibold text-gray-700 mb-1">
                        주의할 점
                      </Typography>
                      <Typography className="text-sm text-gray-600">
                        {info.weaknesses}
                      </Typography>
                    </div>

                    <div className="border-t pt-3">
                      <Typography variant="h4" className="text-sm font-semibold text-gray-700 mb-2">
                        해당 연도
                      </Typography>
                      <div className="flex flex-wrap gap-1">
                        {zodiac.years.slice(0, 6).map((year) => (
                          <span
                            key={year}
                            className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700"
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                      <Typography className="mt-1 text-xs text-gray-500">
                        12년 주기로 반복됩니다
                      </Typography>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* 광고 배치 - 콘텐츠 중간 */}
          <div className="mt-8 mx-auto max-w-md">
            <AdBanner size="medium" placeholder={false} />
          </div>

          {/* 추가 정보 섹션 */}
          <Card className="mt-8 border-purple-200 bg-purple-50 p-6">
            <Typography variant="h3" className="mb-4 text-center text-lg font-semibold text-purple-800">
              12간지의 역사와 의미
            </Typography>
            <div className="space-y-4 text-gray-700">
              <Typography>
                12간지(十二干支)는 중국에서 시작되어 동아시아 전체에 퍼진 전통적인 시간 체계입니다. 
                각각의 동물이 가진 특성과 성격이 그 해에 태어난 사람들의 기질에 영향을 준다고 여겨져 왔습니다.
              </Typography>
              <Typography>
                12간지는 단순한 점술이 아니라, 수천 년간 축적된 동양의 철학과 지혜가 담긴 문화 유산입니다. 
                각 띠의 특성을 이해하면 자신과 타인을 더 깊이 이해하는 데 도움이 됩니다.
              </Typography>
              <Typography>
                띠메이트에서는 이러한 전통적인 지혜를 현대적으로 해석하여, 
                가족 간의 이해와 소통을 돕는 실용적인 가이드를 제공합니다.
              </Typography>
            </div>
          </Card>

          {/* 궁합 확인 CTA */}
          <div className="mt-8 text-center">
            <Typography variant="h3" className="mb-4 text-lg font-semibold text-gray-800">
              내 띠와 가족의 띠 궁합이 궁금하다면?
            </Typography>
            <Button size="lg" asChild className="px-8">
              <Link href="/">띠 궁합 확인하기</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ZodiacPage;