'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { BookOpen, Heart, Info, Sparkles, Target, Users } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
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
        <div className="mx-auto max-w-4xl">
          {/* 제목 섹션 */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                <Info className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              띠메이트 서비스 소개
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              전통 12간지로 알아보는 가족 간의 특별한 이해
            </Typography>
          </div>

          {/* 서비스 개요 */}
          <Card className="mb-6 border-0 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-pink-500" />
              <Typography variant="h3" className="text-lg font-semibold">
                띠메이트란?
              </Typography>
            </div>
            <div className="space-y-4 text-gray-700">
              <Typography>
                띠메이트는 동양의 전통적인 12간지(十二干支) 문화를 바탕으로 부모와 자녀 간의 성격적
                조화를 분석하고 이해를 돕는 서비스입니다.
              </Typography>
              <Typography>
                각 띠가 가진 고유한 성격적 특성과 오행(五行) 이론을 통해 가족 구성원 간의 관계를 더
                깊이 이해하고, 서로를 존중하며 소통하는 방법을 제시합니다.
              </Typography>
            </div>
          </Card>

          {/* 12간지 설명 */}
          <Card className="mb-6 border-purple-200 bg-purple-50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <Typography variant="h3" className="text-lg font-semibold text-purple-800">
                12간지의 의미
              </Typography>
            </div>
            <div className="space-y-4">
              <Typography className="text-gray-700">
                12간지는 쥐(子), 소(丑), 호랑이(寅), 토끼(卯), 용(辰), 뱀(巳), 말(午), 양(未),
                원숭이(申), 닭(酉), 개(戌), 돼지(亥)의 12가지 동물로 이루어진 동양의 전통적인 시간
                체계입니다.
              </Typography>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { animal: '쥐', year: '子', trait: '지혜롭고 재치있음' },
                  { animal: '소', year: '丑', trait: '성실하고 인내심' },
                  { animal: '호랑이', year: '寅', trait: '용맹하고 정의로움' },
                  { animal: '토끼', year: '卯', trait: '온화하고 신중함' },
                  { animal: '용', year: '辰', trait: '당당하고 열정적' },
                  { animal: '뱀', year: '巳', trait: '신비롭고 직관적' },
                  { animal: '말', year: '午', trait: '활발하고 자유로움' },
                  { animal: '양', year: '未', trait: '온순하고 예술적' },
                  { animal: '원숭이', year: '申', trait: '영리하고 재주있음' },
                  { animal: '닭', year: '酉', trait: '부지런하고 정확함' },
                  { animal: '개', year: '戌', trait: '충직하고 정직함' },
                  { animal: '돼지', year: '亥', trait: '순수하고 낙천적' },
                ].map((item, index) => (
                  <div key={index} className="rounded-lg bg-white p-3 text-center">
                    <Typography variant="h4" className="mb-1 font-bold text-purple-700">
                      {item.animal}띠 ({item.year})
                    </Typography>
                    <Typography variant="small" className="text-gray-600">
                      {item.trait}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 서비스 특징 */}
          <Card className="mb-6 border-blue-200 bg-blue-50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-500" />
              <Typography variant="h3" className="text-lg font-semibold text-blue-800">
                서비스 특징
              </Typography>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-4">
                <Typography variant="h4" className="mb-2 font-semibold text-gray-700">
                  📊 과학적 분석
                </Typography>
                <Typography className="text-sm text-gray-600">
                  전통 이론과 현대 심리학을 결합하여 가족 관계를 다각도로 분석합니다.
                </Typography>
              </div>
              <div className="rounded-lg bg-white p-4">
                <Typography variant="h4" className="mb-2 font-semibold text-gray-700">
                  💡 맞춤형 조언
                </Typography>
                <Typography className="text-sm text-gray-600">
                  각 띠 조합에 따른 구체적이고 실용적인 관계 개선 방안을 제시합니다.
                </Typography>
              </div>
              <div className="rounded-lg bg-white p-4">
                <Typography variant="h4" className="mb-2 font-semibold text-gray-700">
                  🌟 긍정적 접근
                </Typography>
                <Typography className="text-sm text-gray-600">
                  모든 관계의 장점을 발견하고 발전시킬 수 있는 방향을 안내합니다.
                </Typography>
              </div>
            </div>
          </Card>

          {/* 활용 방법 */}
          <Card className="mb-6 border-green-200 bg-green-50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              <Typography variant="h3" className="text-lg font-semibold text-green-800">
                이런 분들께 추천합니다
              </Typography>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                <div>
                  <Typography className="text-gray-700">
                    자녀와의 관계를 더 깊이 이해하고 싶은 부모님
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                <div>
                  <Typography className="text-gray-700">
                    가족 간의 갈등을 현명하게 해결하고 싶은 분
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                <div>
                  <Typography className="text-gray-700">
                    동양 전통 문화에 관심이 있으신 분
                  </Typography>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                <div>
                  <Typography className="text-gray-700">
                    가족의 개성을 존중하며 화목한 가정을 만들고 싶은 분
                  </Typography>
                </div>
              </div>
            </div>
          </Card>

          {/* 면책 조항 */}
          <Card className="mb-6 border-gray-200 bg-gray-50 p-6">
            <Typography variant="h4" className="mb-3 font-semibold text-gray-700">
              이용 안내
            </Typography>
            <div className="space-y-2 text-sm text-gray-600">
              <Typography>
                • 본 서비스는 전통 12간지 이론에 기반한 참고 자료이며, 과학적으로 증명된 것은
                아닙니다.
              </Typography>
              <Typography>
                • 개인의 성격과 관계는 띠 외에도 다양한 요인에 의해 형성됩니다.
              </Typography>
              <Typography>
                • 결과는 긍정적인 관계 개선을 위한 가이드라인으로 활용해주세요.
              </Typography>
              <Typography>• 모든 콘텐츠의 저작권은 띠메이트에 있습니다.</Typography>
            </div>
          </Card>

          {/* CTA 버튼 */}
          <div className="text-center">
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

export default AboutPage;
