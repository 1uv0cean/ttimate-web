'use client';

import { AdBanner } from '@/components/ui/AdBanner';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { Heart, Minus, Sparkles, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const CompatibilityPage = () => {
  const compatibilityLevels = [
    {
      grade: '최고',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      description: '서로를 완벽하게 이해하고 보완하는 관계',
      traits: ['자연스러운 소통', '상호 존중과 이해', '갈등 시 빠른 해결', '긍정적 시너지'],
      advice: '이미 좋은 관계이므로 현재의 조화를 유지하며 더욱 발전시켜 나가세요.',
    },
    {
      grade: '좋음',
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      description: '서로 다른 점을 인정하며 조화롭게 지내는 관계',
      traits: ['서로의 차이점 인정', '안정적인 관계', '건설적인 대화', '상호 성장'],
      advice: '서로의 장점을 더욱 인정하고 격려하면 더 좋은 관계로 발전할 수 있습니다.',
    },
    {
      grade: '보통',
      icon: <Minus className="h-5 w-5 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      description: '노력을 통해 좋은 관계를 만들어갈 수 있는 관계',
      traits: ['상황에 따른 조화', '노력이 필요한 소통', '서로 다른 관점', '발전 가능성'],
      advice: '서로를 이해하려는 노력과 인내심을 가지고 꾸준히 소통해보세요.',
    },
    {
      grade: '주의',
      icon: <TrendingDown className="h-5 w-5 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800',
      description: '서로 다른 성향으로 인해 신중한 접근이 필요한 관계',
      traits: ['성향의 차이', '오해 발생 가능', '특별한 배려 필요', '인내심 요구'],
      advice: '서로의 차이를 인정하고 더 많은 대화와 이해의 시간을 가져보세요.',
    },
    {
      grade: '불화',
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      description: '갈등이 발생하기 쉬우나 노력으로 극복 가능한 관계',
      traits: ['빈번한 의견 차이', '감정적 충돌 가능', '많은 인내 필요', '특별한 노력 요구'],
      advice:
        '서로의 다른 점을 단점이 아닌 개성으로 받아들이고 더 많은 이해와 배려를 실천해보세요.',
    },
  ];

  const compatibilityFactors = [
    {
      title: '오행(五行) 이론',
      description: '목(木), 화(火), 토(土), 금(金), 수(水)의 상생상극 관계',
      details: [
        '상생: 서로를 도와주고 발전시키는 관계',
        '상극: 서로 충돌하거나 견제하는 관계',
        '상생관계에서는 자연스러운 조화가 이루어집니다',
        '상극관계에서도 이해와 배려로 좋은 관계를 만들 수 있습니다',
      ],
    },
    {
      title: '성격적 특성',
      description: '각 띠가 가진 고유한 성격과 기질의 조화',
      details: [
        '활발한 성격과 차분한 성격의 균형',
        '외향적 성향과 내향적 성향의 보완',
        '감성적 접근과 논리적 접근의 조화',
        '개인의 성향 차이를 존중하는 것이 중요합니다',
      ],
    },
    {
      title: '생활 패턴',
      description: '일상생활에서의 습관과 선호도의 일치',
      details: [
        '규칙적인 생활 vs 자유로운 생활',
        '계획적인 성향 vs 즉흥적인 성향',
        '안정 추구 vs 변화 추구',
        '서로 다른 패턴도 이해하면 조화롭게 지낼 수 있습니다',
      ],
    },
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
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              띠 궁합의 이해
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              12간지 궁합의 원리와 각 등급별 특징을 알아보세요
            </Typography>
          </div>

          {/* 궁합 등급별 설명 */}
          <div className="mb-8">
            <Typography variant="h2" className="mb-6 text-center text-xl font-bold text-gray-800">
              궁합 등급별 특징
            </Typography>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {compatibilityLevels.map((level, index) => (
                <Card key={index} className={`border-0 p-4 shadow-lg ${level.color}`}>
                  <div className="mb-3 flex items-center gap-2">
                    {level.icon}
                    <Typography variant="h3" className={`text-lg font-bold ${level.textColor}`}>
                      {level.grade} 궁합
                    </Typography>
                  </div>

                  <Typography className="mb-3 text-sm text-gray-700">
                    {level.description}
                  </Typography>

                  <div className="mb-3">
                    <Typography variant="h4" className="mb-2 text-sm font-semibold text-gray-700">
                      특징
                    </Typography>
                    <ul className="space-y-1">
                      {level.traits.map((trait, traitIndex) => (
                        <li key={traitIndex} className="flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-gray-400" />
                          <div>
                            <Typography className="text-xs text-gray-600">{trait}</Typography>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-white/70 p-3">
                    <Typography variant="h4" className="mb-1 text-sm font-semibold text-gray-700">
                      조언
                    </Typography>
                    <Typography className="text-xs text-gray-600">{level.advice}</Typography>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 광고 배치 - 콘텐츠 중간 */}
          <div className="mb-8 mx-auto max-w-md">
            <AdBanner size="medium" placeholder={false} />
          </div>

          {/* 궁합 판단 요소 */}
          <div className="mb-8">
            <Typography variant="h2" className="mb-6 text-center text-xl font-bold text-gray-800">
              궁합 판단 요소
            </Typography>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {compatibilityFactors.map((factor, index) => (
                <Card key={index} className="border-0 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                  <Typography variant="h3" className="mb-2 text-lg font-bold text-purple-700">
                    {factor.title}
                  </Typography>
                  <Typography className="mb-4 text-sm text-gray-600">
                    {factor.description}
                  </Typography>
                  <ul className="space-y-2">
                    {factor.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-400" />
                        <div>
                          <Typography className="text-xs text-gray-600">{detail}</Typography>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* 중요한 메시지 */}
          <Card className="mb-8 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
            <Typography variant="h3" className="mb-4 text-center text-lg font-bold text-purple-800">
              기억해주세요
            </Typography>
            <div className="space-y-3 text-center">
              <Typography className="text-gray-700">
                띠 궁합은 관계를 이해하는 하나의 방법일 뿐입니다. 어떤 관계든 서로에 대한 이해와
                존중, 그리고 노력이 있다면 좋은 관계를 만들어갈 수 있습니다.
              </Typography>
              <Typography className="text-gray-700">
                '불화' 등급이라고 해서 포기할 필요는 없습니다. 오히려 서로의 차이점을 더 잘 알고
                배려한다면 더욱 특별한 관계가 될 수 있습니다.
              </Typography>
              <Typography className="font-semibold text-purple-700">
                가장 중요한 것은 서로를 사랑하고 이해하려는 마음입니다. ❤️
              </Typography>
            </div>
          </Card>

          {/* CTA 섹션 */}
          <div className="text-center">
            <Typography variant="h3" className="mb-4 text-lg font-semibold text-gray-800">
              우리 가족의 띠 궁합을 확인해보세요
            </Typography>
            <Button size="lg" asChild className="px-8">
              <Link href="/">궁합 확인하기</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompatibilityPage;
