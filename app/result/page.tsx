'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { getZodiacInfo, getZodiacEmoji, formatYear } from '@/lib/zodiac';
import { calculateCompatibility, getCompatibilityColor, formatCompatibilityScore, getGradeDescription } from '@/lib/compatibility';
import { Heart, ArrowLeft, Share2, Sparkles, Star, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { MetaTags } from '@/components/ui/MetaTags';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [adShown, setAdShown] = useState(false);
  const [loading, setLoading] = useState(true);

  const childYear = searchParams.get('child');
  const parentYear = searchParams.get('parent');

  useEffect(() => {
    if (!childYear || !parentYear) {
      router.push('/');
      return;
    }

    // 광고 시뮬레이션 (3초 후 결과 표시)
    const timer = setTimeout(() => {
      setAdShown(true);
      setLoading(false);
    }, 3000);

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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          </div>
          <Typography variant="h2" className="mb-4 text-gray-700">
            궁합을 분석하고 있습니다...
          </Typography>
          <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300 max-w-md mx-auto">
            <Typography variant="muted" className="text-gray-500">
              📺 광고 영역<br />
              (Google AdSense)
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
  const compatibility = calculateCompatibility(childInfo.animal, parentInfo.animal);
  const gradeColors = getCompatibilityColor(compatibility.grade);

  const handleShare = async () => {
    const shareData = {
      title: '띠메이트 - 띠 궁합 결과',
      text: `${getZodiacEmoji(childInfo.animal)} 자녀와 ${getZodiacEmoji(parentInfo.animal)} 부모의 궁합은 ${compatibility.grade}!`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback: 클립보드에 URL 복사
        navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      }
    } else {
      // Fallback: 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 동적 메타 태그 */}
      <MetaTags
        title={`${childYear}년생 자녀와 ${parentYear}년생 부모의 띠 궁합`}
        description={`${getZodiacEmoji(childInfo.animal)} 자녀와 ${getZodiacEmoji(parentInfo.animal)} 부모의 궁합은 ${compatibility.grade}! 띠메이트에서 상세한 분석을 확인하세요.`}
        ogImage={`/api/og?child=${childYear}&parent=${parentYear}`}
        ogUrl={`https://ttimate.com/result?child=${childYear}&parent=${parentYear}`}
      />
      
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
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
              <Typography variant="h2" className="text-pink-600 text-xl font-bold">
                띠메이트
              </Typography>
            </div>

            <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">공유</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* 제목 섹션 */}
          <div className="text-center mb-8">
            <Typography variant="h1" className="mb-2 text-2xl sm:text-3xl text-gray-800">
              띠 궁합 결과
            </Typography>
            <Typography variant="muted" className="text-gray-600">
              {formatYear(childYearNum)} 🆚 {formatYear(parentYearNum)}
            </Typography>
          </div>

          {/* 띠 정보 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4 sm:p-6 text-center bg-blue-50 border-blue-200">
              <div className="mb-3">
                <div className="text-4xl mb-2">{getZodiacEmoji(childInfo.animal).split(' ')[0]}</div>
                <Typography variant="h3" className="text-blue-800">
                  {childInfo.animal}띠 자녀
                </Typography>
                <Typography variant="small" className="text-blue-600">
                  {formatYear(childYearNum)} ({childInfo.element})
                </Typography>
              </div>
              <Typography variant="muted" className="text-sm text-blue-700">
                {childInfo.personality} 성격
              </Typography>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {childInfo.characteristics.slice(0, 2).map((trait, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                    {trait}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-4 sm:p-6 text-center bg-purple-50 border-purple-200">
              <div className="mb-3">
                <div className="text-4xl mb-2">{getZodiacEmoji(parentInfo.animal).split(' ')[0]}</div>
                <Typography variant="h3" className="text-purple-800">
                  {parentInfo.animal}띠 부모
                </Typography>
                <Typography variant="small" className="text-purple-600">
                  {formatYear(parentYearNum)} ({parentInfo.element})
                </Typography>
              </div>
              <Typography variant="muted" className="text-sm text-purple-700">
                {parentInfo.personality} 성격
              </Typography>
              <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {parentInfo.characteristics.slice(0, 2).map((trait, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                    {trait}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* 궁합 점수 카드 */}
          <Card className={`p-6 text-center border-2 ${gradeColors.bg} ${gradeColors.border}`}>
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className={`h-6 w-6 ${gradeColors.text}`} />
                <Typography variant="h2" className={`text-2xl font-bold ${gradeColors.text}`}>
                  궁합 등급: {compatibility.grade}
                </Typography>
                <Star className={`h-6 w-6 ${gradeColors.text}`} />
              </div>
              <Typography variant="h1" className={`text-4xl font-bold ${gradeColors.text} mb-2`}>
                {formatCompatibilityScore(compatibility.score)}
              </Typography>
              <div className="max-w-xs mx-auto">
                <Progress 
                  value={compatibility.score} 
                  className="h-3"
                />
              </div>
            </div>
            <Typography variant="muted" className={`${gradeColors.text} font-medium`}>
              {getGradeDescription(compatibility.grade)}
            </Typography>
          </Card>

          {/* 궁합 요약 */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-pink-500" />
              <Typography variant="h3" className="text-lg font-semibold">
                궁합 요약
              </Typography>
            </div>
            <Typography className="text-gray-700 leading-relaxed">
              {compatibility.summary}
            </Typography>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <Typography variant="muted" className="text-sm">
                {compatibility.description}
              </Typography>
            </div>
          </Card>

          {/* 장점과 도전 과제 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <Typography variant="h3" className="text-lg font-semibold text-green-800">
                  긍정적 측면
                </Typography>
              </div>
              <ul className="space-y-2">
                {compatibility.positiveAspects.map((aspect, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <Typography variant="small" className="text-gray-700">
                      {aspect}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <Typography variant="h3" className="text-lg font-semibold text-orange-800">
                  주의사항
                </Typography>
              </div>
              <ul className="space-y-2">
                {compatibility.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <Typography variant="small" className="text-gray-700">
                      {challenge}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* 조언 */}
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-purple-500" />
              <Typography variant="h3" className="text-lg font-semibold text-purple-800">
                관계 개선 조언
              </Typography>
            </div>
            <ul className="space-y-3">
              {compatibility.advice.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <Typography className="text-gray-700">
                    {tip}
                  </Typography>
                </li>
              ))}
            </ul>
          </Card>

          {/* 광고 배너 */}
          <Card className="p-6 bg-gray-50 border-dashed border-gray-300">
            <div className="text-center">
              <Typography variant="muted" className="text-gray-500 mb-2">
                📺 광고
              </Typography>
              <div className="bg-white p-8 rounded border-2 border-dashed border-gray-200">
                <Typography variant="small" className="text-gray-400">
                  Google AdSense 광고 영역<br />
                  (실제 운영 시 광고 코드가 여기에 삽입됩니다)
                </Typography>
              </div>
            </div>
          </Card>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button size="lg" asChild className="flex-1">
              <Link href="/">
                새로운 궁합 보기
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare} className="flex-1">
              결과 공유하기
            </Button>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="mt-16 py-8 text-center border-t border-pink-100 bg-white/50">
        <Typography variant="small" className="text-gray-400">
          © 2024 띠메이트. 가족의 행복한 관계를 응원합니다.
        </Typography>
      </footer>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}