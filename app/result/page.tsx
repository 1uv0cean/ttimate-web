'use client';

import { AdBanner } from '@/components/ui/AdBanner';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { MetaTags } from '@/components/ui/MetaTags';
import { Progress } from '@/components/ui/Progress';
import { ShareModal } from '@/components/ui/ShareModal';
import { Typography } from '@/components/ui/Typography';
import {
  calculateCompatibility,
  formatCompatibilityScore,
  getCompatibilityColor,
  getGradeDescription,
  getRelationshipLabels,
  RelationshipType,
} from '@/lib/compatibility';
import { formatYear, getZodiacEmoji, getZodiacInfo } from '@/lib/zodiac';
import { getDetailedCompatibility } from '@/lib/zodiac-detailed-compatibility';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Heart,
  Info,
  Lightbulb,
  Share2,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [adShown, setAdShown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const childYear = searchParams.get('child');
  const parentYear = searchParams.get('parent');
  const relationshipType = (searchParams.get('relationship') as RelationshipType) || 'family';

  useEffect(() => {
    if (!childYear || !parentYear) {
      router.push('/');
      return;
    }

    // 로딩 후 결과 표시 (2초)
    const timer = setTimeout(() => {
      setAdShown(true);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [childYear, parentYear, router]);

  if (!childYear || !parentYear) {
    return null;
  }

  const childYearNum = parseInt(childYear);
  const parentYearNum = parseInt(parentYear);

  // 광고 표시 중
  if (loading || !adShown) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-pink-500"></div>
          </div>
          <Typography variant="h2" className="mb-4 text-gray-700">
            궁합을 분석하고 있습니다...
          </Typography>
          <div className="mx-auto max-w-md">
            <Typography variant="muted" className="mb-4 text-gray-500">
              {relationshipType === 'lover'
                ? '연인 간의 띠 궁합을 분석하고 있습니다'
                : relationshipType === 'family'
                ? '가족 간의 띠 궁합을 분석하고 있습니다'
                : '친구 간의 띠 궁합을 분석하고 있습니다'
              }
            </Typography>
            <Progress value={66} className="w-full mb-2" />
            <Typography variant="small" className="text-gray-400">
              데이터 처리 중...
            </Typography>
          </div>
          <Typography variant="small" className="mt-4 text-gray-400">
            잠시만 기다려주세요...
          </Typography>
        </div>
      </div>
    );
  }

  const childInfo = getZodiacInfo(childYearNum);
  const parentInfo = getZodiacInfo(parentYearNum);
  const compatibility = calculateCompatibility(childInfo.animal, parentInfo.animal, relationshipType);
  const gradeColors = getCompatibilityColor(compatibility.grade);
  const detailedCompatibility = getDetailedCompatibility(childInfo.animal, parentInfo.animal);
  const relationshipLabels = getRelationshipLabels(relationshipType);

  const handleShare = () => {
    setShareModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 동적 메타 태그 */}
      <MetaTags
        title={`${childYear}년생 ${relationshipLabels.first}와 ${parentYear}년생 ${relationshipLabels.second}의 띠 궁합`}
        description={`${getZodiacEmoji(childInfo.animal)} ${relationshipLabels.first}와 ${getZodiacEmoji(parentInfo.animal)} ${relationshipLabels.second}의 궁합은 ${compatibility.grade}! 띠메이트에서 상세한 분석을 확인하세요.`}
        ogImage={`/api/og?child=${childYear}&parent=${parentYear}&relationship=${relationshipType}`}
        ogUrl={`https://ttimate.com/result?child=${childYear}&parent=${parentYear}&relationship=${relationshipType}`}
      />

      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">다시 하기</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <Typography variant="h2" className="text-xl font-bold text-pink-600">
                띠메이트
              </Typography>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">공유</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* 제목 섹션 */}
          <div className="mb-8 text-center">
            <Typography variant="h1" className="mb-2 text-2xl text-gray-800 sm:text-3xl">
              띠 궁합 결과
            </Typography>
            <Typography variant="muted" className="text-gray-600">
              {formatYear(childYearNum)} 🆚 {formatYear(parentYearNum)}
            </Typography>
          </div>

          {/* 띠 정보 카드 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-blue-200 bg-blue-50 p-4 text-center sm:p-6">
              <div className="mb-3">
                <div className="mb-2 text-4xl">
                  {getZodiacEmoji(childInfo.animal).split(' ')[0]}
                </div>
                <Typography variant="h3" className="text-blue-800">
                  {childInfo.animal}띠 {relationshipLabels.first}
                </Typography>
                <Typography variant="small" className="text-blue-600">
                  {formatYear(childYearNum)} ({childInfo.element})
                </Typography>
              </div>
              <Typography variant="muted" className="text-sm text-blue-700">
                {childInfo.personality} 성격
              </Typography>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {childInfo.characteristics.slice(0, 2).map((trait, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-xs text-blue-800"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="border-purple-200 bg-purple-50 p-4 text-center sm:p-6">
              <div className="mb-3">
                <div className="mb-2 text-4xl">
                  {getZodiacEmoji(parentInfo.animal).split(' ')[0]}
                </div>
                <Typography variant="h3" className="text-purple-800">
                  {parentInfo.animal}띠 {relationshipLabels.second}
                </Typography>
                <Typography variant="small" className="text-purple-600">
                  {formatYear(parentYearNum)} ({parentInfo.element})
                </Typography>
              </div>
              <Typography variant="muted" className="text-sm text-purple-700">
                {parentInfo.personality} 성격
              </Typography>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {parentInfo.characteristics.slice(0, 2).map((trait, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-purple-100 text-xs text-purple-800"
                  >
                    {trait}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* 궁합 점수 카드 */}
          <Card className={`border-2 p-6 text-center ${gradeColors.bg} ${gradeColors.border}`}>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-center gap-2">
                <Star className={`h-6 w-6 ${gradeColors.text}`} />
                <Typography variant="h2" className={`text-2xl font-bold ${gradeColors.text}`}>
                  궁합 등급: {compatibility.grade}
                </Typography>
                <Star className={`h-6 w-6 ${gradeColors.text}`} />
              </div>
              <Typography variant="h1" className={`text-4xl font-bold ${gradeColors.text} mb-2`}>
                {formatCompatibilityScore(compatibility.score)}
              </Typography>
              <div className="mx-auto max-w-xs">
                <Progress value={compatibility.score} className="h-3" />
              </div>
            </div>
            <Typography variant="muted" className={`${gradeColors.text} font-medium`}>
              {getGradeDescription(compatibility.grade)}
            </Typography>
          </Card>

          {/* 궁합 요약 */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <Typography variant="h3" className="text-lg font-semibold">
                궁합 요약
              </Typography>
            </div>
            <Typography className="leading-relaxed text-gray-700">
              {compatibility.summary}
            </Typography>
            <div className="mt-4 rounded-lg bg-gray-50 p-4">
              <Typography variant="muted" className="text-sm">
                {compatibility.description}
              </Typography>
            </div>
          </Card>

          {/* 광고 배치 - 컨텐츠 중간 */}
          <div className="mx-auto max-w-md">
            <AdBanner size="medium" placeholder={false} />
          </div>

          {/* 장점과 도전 과제 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Typography variant="h3" className="text-lg font-semibold text-green-800">
                  긍정적 측면
                </Typography>
              </div>
              <ul className="space-y-2">
                {compatibility.positiveAspects.map((aspect, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                    <Typography variant="small" className="text-gray-700">
                      {aspect}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <Typography variant="h3" className="text-lg font-semibold text-orange-800">
                  주의사항
                </Typography>
              </div>
              <ul className="space-y-2">
                {compatibility.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></div>
                    <Typography variant="small" className="text-gray-700">
                      {challenge}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 조언 */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-500" />
              <Typography variant="h3" className="text-lg font-semibold text-purple-800">
                관계 개선 조언
              </Typography>
            </div>
            <ul className="space-y-3">
              {compatibility.advice.map((tip, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                    {index + 1}
                  </div>
                  <div>
                    <Typography className="text-gray-700">{tip}</Typography>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* 상세 궁합 분석 섹션 */}
          {detailedCompatibility && (
            <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <Typography variant="h3" className="text-lg font-semibold text-indigo-800">
                  전통 궁합 상세 분석
                </Typography>
                <Badge variant="secondary" className="bg-indigo-100 text-xs text-indigo-700">
                  12지신 전통 해석
                </Badge>
              </div>

              {/* 궁합 요약 */}
              <div className="mb-6 rounded-lg bg-white/60 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-600" />
                  <Typography variant="h4" className="font-medium text-indigo-800">
                    궁합 개관
                  </Typography>
                </div>
                <Typography className="leading-relaxed text-gray-700">
                  {detailedCompatibility.summary}
                </Typography>
              </div>

              {/* 상세 분석 그리드 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* 긍정적 측면 */}
                <div className="rounded-lg bg-green-50/80 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Typography variant="h5" className="text-sm font-semibold text-green-800">
                      긍정적 측면
                    </Typography>
                  </div>
                  <Typography variant="small" className="leading-relaxed text-green-700">
                    {detailedCompatibility.positiveAspects}
                  </Typography>
                </div>

                {/* 주의사항 */}
                <div className="rounded-lg bg-amber-50/80 p-4 backdrop-blur-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <Typography variant="h5" className="text-sm font-semibold text-amber-800">
                      주의사항
                    </Typography>
                  </div>
                  <Typography variant="small" className="leading-relaxed text-amber-700">
                    {detailedCompatibility.concerns}
                  </Typography>
                </div>

                {/* 관계 개선 조언 */}
                <div className="rounded-lg bg-purple-50/80 p-4 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                  <div className="mb-3 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-purple-600" />
                    <Typography variant="h5" className="text-sm font-semibold text-purple-800">
                      개선 조언
                    </Typography>
                  </div>
                  <Typography variant="small" className="leading-relaxed text-purple-700">
                    {detailedCompatibility.advice}
                  </Typography>
                </div>
              </div>

              {/* 전통 해석 안내 */}
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-white/40 p-4 backdrop-blur-sm">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                <div>
                  <Typography variant="small" className="text-indigo-700">
                    <span className="font-medium">전통 12지신 해석:</span> 이 분석은 수천 년간 전해 내려온 동양의 전통 12지신 궁합 이론에 바탕을 둔 것으로, 
                    각 띠의 고유한 특성과 상호작용을 통해 관계의 특징을 이해하는 데 도움을 드립니다.
                  </Typography>
                </div>
              </div>
            </Card>
          )}

          {/* 추가 정보 섹션 */}
          <Card className="border-blue-200 bg-blue-50 p-6">
            <Typography variant="h3" className="mb-4 text-lg font-semibold text-blue-800">
              띠 궁합의 의미
            </Typography>
            <div className="space-y-3 text-sm text-gray-700">
              <Typography>
                {relationshipType === 'lover'
                  ? '12간지 궁합은 단순히 운세를 예측하는 것이 아니라, 연인 간의 성격적 특성을 이해하고 서로를 사랑하는 방법을 찾는 데 도움이 됩니다.'
                  : relationshipType === 'family'
                  ? '12간지 궁합은 단순히 운세를 예측하는 것이 아니라, 가족 구성원 간의 성격적 특성을 이해하고 서로를 존중하는 방법을 찾는 데 도움이 됩니다.'
                  : '12간지 궁합은 단순히 운세를 예측하는 것이 아니라, 친구 간의 성격적 특성을 이해하고 서로를 존중하는 방법을 찾는 데 도움이 됩니다.'
                }
              </Typography>
              <Typography>
                {relationshipType === 'lover'
                  ? '두 사람은 각자의 띠 특성에 따라 다른 연애 스타일과 가치관을 가질 수 있습니다. 이러한 차이를 이해하면 더 깊고 달콤한 사랑을 만들어갈 수 있습니다.'
                  : relationshipType === 'family'
                  ? '가족 구성원은 각자의 띠 특성에 따라 다른 가치관과 생활 방식을 가질 수 있습니다. 이러한 차이를 이해하면 더 풍성하고 행복한 가족 관계를 만들어갈 수 있습니다.'
                  : '친구는 각자의 띠 특성에 따라 다른 가치관과 관심사를 가질 수 있습니다. 이러한 차이를 이해하면 더 깊고 오래 지속되는 우정을 만들어갈 수 있습니다.'
                }
              </Typography>
              <Typography className="mt-3 rounded-lg bg-white p-3 text-xs text-gray-600">
                ※ 본 궁합 결과는 전통적인 12간지 해석에 기반한 것으로, 참고용으로만 활용해주세요.
                개인의 성격과 환경에 따라 실제 관계는 다를 수 있습니다.
              </Typography>
            </div>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button size="lg" asChild className="flex-1">
              <Link href="/">새로운 궁합 보기</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare} className="flex-1">
              결과 공유하기
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* 공유 모달 */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        childYear={childYear}
        parentYear={parentYear}
        childAnimal={childInfo.animal}
        parentAnimal={parentInfo.animal}
        compatibilityGrade={compatibility.grade}
        relationshipType={relationshipType}
      />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-pink-500"></div>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
