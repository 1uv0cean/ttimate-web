'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { ArrowLeft, FileText, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 border-b border-pink-100 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>홈으로</span>
              </Link>
            </Button>

            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <Typography variant="h2" className="text-xl font-bold text-pink-600">
                띠메이트
              </Typography>
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              이용약관
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600">
              최종 수정일: 2025년 7월 29일
            </Typography>
          </div>

          <Card className="border-0 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            <div className="prose prose-gray max-w-none">
              <div className="space-y-8">
                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제1조 (목적)
                  </Typography>
                  <Typography className="text-gray-700">
                    본 약관은 띠메이트(이하 '서비스')가 제공하는 띠 궁합 서비스의 이용과 관련하여
                    서비스와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
                    목적으로 합니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제2조 (용어의 정의)
                  </Typography>
                  <ul className="space-y-2 text-gray-700">
                    <li>
                      • "서비스"란 띠메이트가 제공하는 12간지 띠 궁합 분석 서비스를 의미합니다.
                    </li>
                    <li>
                      • "이용자"란 본 약관에 따라 서비스가 제공하는 서비스를 받는 자를 말합니다.
                    </li>
                    <li>
                      • "콘텐츠"란 서비스가 제공하는 띠 궁합 분석 결과 및 관련 정보를 의미합니다.
                    </li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제3조 (약관의 효력 및 변경)
                  </Typography>
                  <Typography className="text-gray-700">
                    1. 본 약관은 서비스를 이용하는 모든 이용자에게 적용됩니다.
                    <br />
                    2. 서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수
                    있습니다.
                    <br />
                    3. 약관이 변경되는 경우 서비스는 변경사항을 시행일자 7일 전부터 공지사항을 통해
                    공지합니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제4조 (서비스의 제공)
                  </Typography>
                  <Typography className="text-gray-700">
                    1. 서비스는 다음과 같은 서비스를 제공합니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• 생년월일 기반 12간지 띠 확인</li>
                    <li>• 부모와 자녀 간의 띠 궁합 분석</li>
                    <li>• 관계 개선을 위한 조언 제공</li>
                    <li>• 기타 서비스가 정하는 부가 서비스</li>
                  </ul>
                  <Typography className="mt-3 text-gray-700">
                    2. 서비스는 연중무휴 24시간 제공함을 원칙으로 하나, 시스템 점검 등의 필요에 의해
                    일시적으로 서비스가 중단될 수 있습니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제5조 (이용자의 의무)
                  </Typography>
                  <Typography className="text-gray-700">
                    이용자는 다음 행위를 하여서는 안 됩니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• 타인의 정보를 무단으로 수집하거나 이용하는 행위</li>
                    <li>• 서비스의 운영을 방해하거나 안정성을 해치는 행위</li>
                    <li>• 서비스의 콘텐츠를 무단으로 복제, 배포하는 행위</li>
                    <li>• 기타 관련 법령에 위배되는 행위</li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제6조 (콘텐츠의 관리)
                  </Typography>
                  <Typography className="text-gray-700">
                    1. 서비스가 제공하는 모든 콘텐츠의 저작권은 서비스에 있습니다.
                    <br />
                    2. 이용자는 서비스가 제공하는 콘텐츠를 개인적인 용도로만 사용할 수 있으며,
                    상업적 이용은 금지됩니다.
                    <br />
                    3. 이용자가 서비스 내에서 생성한 데이터(입력한 생년 정보 등)는 서비스 종료 시
                    자동으로 삭제됩니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제7조 (서비스 이용의 제한)
                  </Typography>
                  <Typography className="text-gray-700">
                    서비스는 다음의 경우 이용자의 서비스 이용을 제한할 수 있습니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• 본 약관을 위반한 경우</li>
                    <li>• 서비스의 정상적인 운영을 방해한 경우</li>
                    <li>• 기타 서비스가 필요하다고 판단되는 경우</li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제8조 (면책조항)
                  </Typography>
                  <Typography className="text-gray-700">
                    1. 서비스가 제공하는 띠 궁합 분석은 전통 12간지 이론에 기반한 참고 자료이며,
                    과학적으로 증명된 것은 아닙니다.
                    <br />
                    2. 서비스는 이용자가 서비스를 통해 얻은 정보로 인한 손해에 대해 책임지지
                    않습니다.
                    <br />
                    3. 서비스는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해
                    책임지지 않습니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    제9조 (분쟁의 해결)
                  </Typography>
                  <Typography className="text-gray-700">
                    1. 서비스와 이용자 간에 발생한 분쟁은 상호 협의 하에 해결함을 원칙으로 합니다.
                    <br />
                    2. 협의가 이루어지지 않을 경우, 대한민국 법령에 따라 관할 법원에서 해결합니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    부칙
                  </Typography>
                  <Typography className="text-gray-700">
                    본 약관은 2025년 7월 29일부터 시행됩니다.
                  </Typography>
                </section>

                <div className="mt-8 rounded-lg bg-gray-50 p-4">
                  <Typography className="text-sm text-gray-600">
                    문의사항이 있으시면 다음 연락처로 문의해 주세요:
                    <br />
                    이메일: songhwee1@gmail.com
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
