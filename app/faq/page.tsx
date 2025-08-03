'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/ui/Footer';
import { Typography } from '@/components/ui/Typography';
import { Heart, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      category: '서비스 이용',
      questions: [
        {
          question: '띠메이트는 무료로 이용할 수 있나요?',
          answer: '네, 띠메이트의 모든 기능은 완전 무료로 제공됩니다. 별도의 회원가입이나 결제 없이 자유롭게 이용하실 수 있습니다.'
        },
        {
          question: '개인정보는 어떻게 보호되나요?',
          answer: '띠메이트는 사용자의 개인정보를 수집하지 않습니다. 입력하신 생년 정보는 결과 계산에만 사용되며 저장되지 않습니다.'
        },
        {
          question: '모바일에서도 이용할 수 있나요?',
          answer: '네, 띠메이트는 반응형 웹사이트로 설계되어 스마트폰, 태블릿, PC 등 모든 기기에서 최적화된 화면으로 이용하실 수 있습니다.'
        },
        {
          question: '결과를 저장하거나 공유할 수 있나요?',
          answer: '현재는 결과 저장 기능은 제공하지 않지만, 결과 페이지의 URL을 복사하여 가족이나 친구들과 공유하실 수 있습니다.'
        }
      ]
    },
    {
      category: '12간지와 궁합',
      questions: [
        {
          question: '12간지는 과학적으로 증명된 이론인가요?',
          answer: '12간지는 수천 년간 전해져 내려온 동양의 전통 문화이며, 과학적으로 증명된 이론은 아닙니다. 하지만 오랜 경험과 관찰을 바탕으로 한 지혜가 담긴 문화 유산으로 이해해주세요.'
        },
        {
          question: '띠가 다르면 정말 성격이 다른가요?',
          answer: '개인의 성격은 띠 외에도 환경, 교육, 경험 등 다양한 요인에 의해 형성됩니다. 띠는 성격을 이해하는 하나의 참고 자료로 활용해주세요.'
        },
        {
          question: '불화 등급이 나왔는데 정말 안 맞는 건가요?',
          answer: '전혀 그렇지 않습니다. 띠 궁합은 서로를 이해하는 가이드일 뿐이며, 어떤 관계든 서로에 대한 이해와 노력이 있다면 좋은 관계를 만들어갈 수 있습니다.'
        },
        {
          question: '양력과 음력 중 어느 것을 기준으로 하나요?',
          answer: '띠메이트는 양력을 기준으로 계산합니다. 단, 1월 생의 경우 음력 설날 이전에 태어났다면 전년도 띠에 해당할 수 있으니 참고해주세요.'
        },
        {
          question: '같은 띠끼리의 궁합은 어떤가요?',
          answer: '같은 띠끼리는 서로를 잘 이해할 수 있지만, 때로는 너무 비슷해서 발전이 없을 수 있습니다. 서로의 장점을 인정하고 격려하는 것이 중요합니다.'
        }
      ]
    },
    {
      category: '기술 및 오류',
      questions: [
        {
          question: '결과가 나오지 않아요.',
          answer: '생년을 1900년부터 현재까지의 범위에서 정확한 4자리 숫자로 입력해주세요. 문제가 지속되면 페이지를 새로고침 후 다시 시도해보세요.'
        },
        {
          question: '광고가 너무 많이 나와요.',
          answer: '띠메이트는 무료 서비스 제공을 위해 최소한의 광고를 게재하고 있습니다. 광고는 사용자 경험을 해치지 않는 선에서 배치하려고 노력하고 있습니다.'
        },
        {
          question: '페이지 로딩이 느려요.',
          answer: '인터넷 연결 상태를 확인해보시고, 브라우저 캐시를 삭제한 후 다시 시도해보세요. 문제가 지속되면 다른 브라우저를 이용해보세요.'
        },
        {
          question: '특정 브라우저에서 작동하지 않아요.',
          answer: '띠메이트는 Chrome, Firefox, Safari, Edge 등 최신 브라우저에서 최적화되어 있습니다. 오래된 브라우저를 사용하신다면 업데이트 후 이용해주세요.'
        }
      ]
    },
    {
      category: '기타',
      questions: [
        {
          question: '다른 가족 구성원(형제자매, 조부모)의 궁합도 볼 수 있나요?',
          answer: '현재는 부모-자녀 관계에 특화된 서비스를 제공하고 있습니다. 하지만 입력된 두 사람의 띠 궁합 결과는 다른 관계에도 참고하실 수 있습니다.'
        },
        {
          question: '결과에 오류가 있는 것 같아요.',
          answer: '띠 계산이나 궁합 결과에 오류가 있다고 생각되시면, 생년을 정확히 입력했는지 다시 한 번 확인해주세요. 지속적인 문제가 있다면 문의해주세요.'
        },
        {
          question: '서비스 개선 사항을 제안하고 싶어요.',
          answer: '사용자의 소중한 의견은 서비스 개선에 큰 도움이 됩니다. 개선 사항이나 새로운 기능에 대한 제안이 있으시면 언제든 문의해주세요.'
        },
        {
          question: '띠메이트를 다른 사람에게 추천하고 싶어요.',
          answer: '감사합니다! 띠메이트 URL(ttimate.com)을 복사하여 가족, 친구들과 자유롭게 공유해주세요. 더 많은 가족이 화목한 관계를 만들어갈 수 있도록 도와주세요.'
        }
      ]
    }
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
        <div className="mx-auto max-w-4xl">
          {/* 제목 섹션 */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-3">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <Typography variant="h1" className="mb-3 text-2xl text-gray-800 sm:text-3xl">
              자주 묻는 질문
            </Typography>
            <Typography variant="muted" className="text-sm text-gray-600 sm:text-base">
              띠메이트 이용에 관한 궁금한 점들을 확인해보세요
            </Typography>
          </div>

          {/* FAQ 섹션들 */}
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <Typography variant="h2" className="mb-4 text-xl font-bold text-gray-800">
                {section.category}
              </Typography>
              
              <div className="space-y-3">
                {section.questions.map((faq, questionIndex) => {
                  const globalIndex = sectionIndex * 100 + questionIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <Card key={questionIndex} className="border-0 bg-white/90 shadow-lg backdrop-blur-sm">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
                      >
                        <Typography variant="h3" className="text-sm font-semibold text-gray-800 sm:text-base">
                          {faq.question}
                        </Typography>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 flex-shrink-0 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-500" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="border-t border-gray-100 p-4 pt-3">
                          <Typography className="text-sm text-gray-600 leading-relaxed">
                            {faq.answer}
                          </Typography>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {/* 추가 도움말 */}
          <Card className="border-purple-200 bg-purple-50 p-6">
            <Typography variant="h3" className="mb-4 text-center text-lg font-semibold text-purple-800">
              더 궁금한 점이 있으신가요?
            </Typography>
            <div className="space-y-3 text-center">
              <Typography className="text-gray-700">
                위에서 답을 찾지 못하셨나요? 
                띠메이트는 사용자의 편의를 위해 지속적으로 개선되고 있습니다.
              </Typography>
              <Typography className="text-gray-700">
                서비스 이용 중 문제가 발생하거나 개선 사항이 있으시면 언제든 문의해주세요.
              </Typography>
            </div>
          </Card>

          {/* CTA 섹션 */}
          <div className="mt-8 text-center">
            <Typography variant="h3" className="mb-4 text-lg font-semibold text-gray-800">
              이제 띠 궁합을 확인해보세요!
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

export default FAQPage;