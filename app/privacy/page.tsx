'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { ArrowLeft, Heart, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const PrivacyPage = () => {
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
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              개인정보처리방침
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600">
              최종 수정일: 2025년 7월 29일
            </Typography>
          </div>

          <Card className="border-0 bg-white/90 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            <div className="prose prose-gray max-w-none">
              <Typography className="mb-6 text-gray-700">
                띠메이트(이하 '서비스')는 이용자의 개인정보를 중요시하며, 개인정보보호법을 준수하고
                있습니다. 본 개인정보처리방침은 이용자가 제공한 개인정보가 어떠한 용도와 방식으로
                이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              </Typography>

              <div className="space-y-8">
                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    1. 수집하는 개인정보 항목
                  </Typography>
                  <Typography className="text-gray-700">
                    띠메이트는 서비스 제공을 위해 최소한의 개인정보를 수집합니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• 입력 정보: 자녀 생년, 부모 생년 (띠 계산용)</li>
                    <li>• 자동 수집 정보: 서비스 이용 기록, 접속 로그, 쿠키</li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    2. 개인정보의 수집 및 이용 목적
                  </Typography>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 띠 궁합 계산 및 결과 제공</li>
                    <li>• 서비스 개선 및 통계 분석</li>
                    <li>• 서비스 이용에 대한 통계 수집</li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    3. 개인정보의 보유 및 이용 기간
                  </Typography>
                  <Typography className="text-gray-700">
                    띠메이트는 입력된 생년 정보를 즉시 계산에만 사용하며, 별도로 저장하지 않습니다.
                    단, 서비스 이용 기록 등은 관련 법령에 따라 일정 기간 보관될 수 있습니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    4. 개인정보의 제3자 제공
                  </Typography>
                  <Typography className="text-gray-700">
                    띠메이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의
                    경우에는 예외로 합니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• 이용자가 사전에 동의한 경우</li>
                    <li>
                      • 법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라
                      수사기관의 요구가 있는 경우
                    </li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    5. 개인정보의 안전성 확보 조치
                  </Typography>
                  <Typography className="text-gray-700">
                    띠메이트는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                  </Typography>
                  <ul className="mt-3 space-y-2 text-gray-700">
                    <li>• SSL 인증서를 통한 데이터 전송 암호화</li>
                    <li>• 개인정보 접근 권한 제한</li>
                    <li>• 정기적인 보안 점검 실시</li>
                  </ul>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    6. 쿠키(Cookie)의 운영
                  </Typography>
                  <Typography className="text-gray-700">
                    서비스는 개인화되고 맞춤화된 서비스를 제공하기 위해 이용자의 정보를 저장하고
                    수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데
                    이용되는 서버가 이용자의 브라우저에게 보내는 작은 텍스트 파일로 이용자의
                    컴퓨터에 저장됩니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    7. 이용자의 권리
                  </Typography>
                  <Typography className="text-gray-700">
                    이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보의
                    처리에 대한 동의 철회나 삭제를 요구할 수 있습니다.
                  </Typography>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    8. 개인정보 관리 책임자
                  </Typography>
                  <Typography className="text-gray-700">
                    띠메이트는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                    이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                    지정하고 있습니다.
                  </Typography>
                  <div className="mt-3 rounded-lg bg-gray-50 p-4">
                    <Typography className="text-sm text-gray-600">
                      개인정보보호 책임자
                      <br />
                      이메일: songhwee1@gmail.com
                    </Typography>
                  </div>
                </section>

                <section>
                  <Typography variant="h3" className="mb-4 text-lg font-semibold">
                    9. 개인정보처리방침의 변경
                  </Typography>
                  <Typography className="text-gray-700">
                    본 개인정보처리방침은 법령, 정책 또는 서비스의 변경에 따라 내용이 추가, 삭제 및
                    수정이 있을 시에는 시행 전에 서비스 공지사항을 통해 공지할 것입니다.
                  </Typography>
                </section>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
