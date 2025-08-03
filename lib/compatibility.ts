/**
 * 띠메이트 - 띠 궁합 분석 시스템
 * 자녀와 부모의 띠 궁합을 계산하고 분석합니다.
 */

import { ZodiacAnimal } from './zodiac';

// 궁합 점수 타입 (0-100)
export type CompatibilityScore = number;

// 궁합 등급
export type CompatibilityGrade = '최고' | '좋음' | '보통' | '주의' | '불화';

// 관계 유형 정의
export type RelationshipType = 'lover' | 'family' | 'friend';

// 궁합 결과 인터페이스
export interface CompatibilityResult {
  childAnimal: ZodiacAnimal;
  parentAnimal: ZodiacAnimal;
  score: CompatibilityScore;
  grade: CompatibilityGrade;
  summary: string;
  description: string;
  positiveAspects: string[];
  challenges: string[];
  advice: string[];
  relationshipType: RelationshipType;
}

// 띠 궁합 매트릭스 (대흉=10, 흉=30, 길=70, 대길=90)
// 이미지의 궁합표 기준으로 점수 할당
const COMPATIBILITY_MATRIX: Record<ZodiacAnimal, Record<ZodiacAnimal, number>> = {
  '쥐': {
    '쥐': 50, '소': 70, '호랑이': 50, '토끼': 50, '용': 70, '뱀': 50, 
    '말': 10, '양': 30, '원숭이': 70, '닭': 30, '개': 50, '돼지': 50
  },
  '소': {
    '쥐': 70, '소': 50, '호랑이': 50, '토끼': 50, '용': 30, '뱀': 70, 
    '말': 30, '양': 10, '원숭이': 50, '닭': 70, '개': 30, '돼지': 50
  },
  '호랑이': {
    '쥐': 50, '소': 50, '호랑이': 50, '토끼': 50, '용': 50, '뱀': 30, 
    '말': 70, '양': 50, '원숭이': 10, '닭': 30, '개': 70, '돼지': 70
  },
  '토끼': {
    '쥐': 30, '소': 50, '호랑이': 50, '토끼': 50, '용': 30, '뱀': 50, 
    '말': 30, '양': 70, '원숭이': 30, '닭': 10, '개': 70, '돼지': 70
  },
  '용': {
    '쥐': 70, '소': 30, '호랑이': 50, '토끼': 30, '용': 30, '뱀': 50, 
    '말': 50, '양': 50, '원숭이': 70, '닭': 70, '개': 10, '돼지': 30
  },
  '뱀': {
    '쥐': 50, '소': 70, '호랑이': 30, '토끼': 50, '용': 50, '뱀': 50, 
    '말': 50, '양': 50, '원숭이': 30, '닭': 70, '개': 30, '돼지': 10
  },
  '말': {
    '쥐': 10, '소': 30, '호랑이': 70, '토끼': 50, '용': 50, '뱀': 50, 
    '말': 30, '양': 50, '원숭이': 50, '닭': 50, '개': 70, '돼지': 50
  },
  '양': {
    '쥐': 30, '소': 10, '호랑이': 50, '토끼': 70, '용': 50, '뱀': 50, 
    '말': 50, '양': 50, '원숭이': 50, '닭': 50, '개': 30, '돼지': 70
  },
  '원숭이': {
    '쥐': 70, '소': 50, '호랑이': 10, '토끼': 30, '용': 70, '뱀': 30, 
    '말': 50, '양': 50, '원숭이': 50, '닭': 50, '개': 50, '돼지': 30
  },
  '닭': {
    '쥐': 30, '소': 70, '호랑이': 30, '토끼': 10, '용': 70, '뱀': 70, 
    '말': 50, '양': 50, '원숭이': 50, '닭': 30, '개': 30, '돼지': 50
  },
  '개': {
    '쥐': 50, '소': 30, '호랑이': 70, '토끼': 70, '용': 10, '뱀': 30, 
    '말': 70, '양': 30, '원숭이': 50, '닭': 30, '개': 50, '돼지': 50
  },
  '돼지': {
    '쥐': 50, '소': 50, '호랑이': 70, '토끼': 70, '용': 30, '뱀': 10, 
    '말': 50, '양': 70, '원숭이': 30, '닭': 50, '개': 50, '돼지': 30
  }
};

// 관계 유형별 설명 데이터
const RELATIONSHIP_DESCRIPTIONS: Record<RelationshipType, {
  labels: { first: string; second: string };
  context: string;
}> = {
  lover: {
    labels: { first: '나', second: '연인' },
    context: '연인 관계에서'
  },
  family: {
    labels: { first: '자녀', second: '부모' },
    context: '가족 관계에서'
  },
  friend: {
    labels: { first: '본인', second: '상대방' },
    context: '친구 관계에서'
  }
};

// 궁합 설명 매트릭스
const COMPATIBILITY_DESCRIPTIONS: Record<string, {
  summary: string;
  description: string;
  positiveAspects: string[];
  challenges: string[];
  advice: string[];
}> = {
  // 좋은 궁합 (길 = 70점)
  '쥐-소': {
    summary: '서로를 이해하고 보완하는 좋은 관계',
    description: '쥐띠 자녀의 영리함과 소띠 부모의 성실함이 만나 안정적이면서도 발전적인 관계를 형성합니다.',
    positiveAspects: ['상호 보완', '안정적 관계', '꾸준한 발전', '신뢰 구축'],
    challenges: ['속도 차이', '관점 차이'],
    advice: ['서로의 속도를 맞춰주세요', '꾸준한 대화가 중요합니다', '서로의 장점을 인정해주세요']
  },
  '쥐-용': {
    summary: '지혜와 리더십이 조화를 이루는 훌륭한 관계',
    description: '쥐띠 자녀의 영리함과 용띠 부모의 카리스마가 만나 서로를 발전시키는 좋은 관계를 형성합니다.',
    positiveAspects: ['상호 존중', '성장 지향', '목표 공유', '열정적 교감'],
    challenges: ['경쟁심', '완벽주의'],
    advice: ['서로의 성취를 축하해주세요', '실패도 성장의 과정임을 인정하세요', '여유를 가지세요']
  },
  '쥐-원숭이': {
    summary: '영리함과 재치가 만나는 즐거운 관계',
    description: '쥐띠 자녀와 원숭이띠 부모는 서로의 영리함을 인정하고 즐거운 대화를 나누며 좋은 관계를 유지합니다.',
    positiveAspects: ['지적 교감', '유머러스함', '창의적 사고', '활발한 소통'],
    challenges: ['산만함', '일관성 부족'],
    advice: ['집중력을 기르는 활동을 함께하세요', '규칙적인 생활습관을 만드세요', '서로의 아이디어를 존중하세요']
  },
  '소-뱀': {
    summary: '신중하고 안정적인 신뢰의 관계',
    description: '소띠 자녀와 뱀띠 부모는 서로의 신중함을 이해하고 깊은 신뢰를 바탕으로 안정적인 관계를 구축합니다.',
    positiveAspects: ['깊은 신뢰', '안정감', '현실적 조언', '지속성'],
    challenges: ['변화 저항', '과도한 신중함'],
    advice: ['새로운 도전도 함께 해보세요', '감정 표현을 더 자주하세요', '유연성을 기르세요']
  },
  '소-닭': {
    summary: '성실함과 꼼꼼함이 만나는 생산적인 관계',
    description: '소띠 자녀와 닭띠 부모는 서로의 성실함을 인정하고 함께 목표를 달성해가는 좋은 관계입니다.',
    positiveAspects: ['목표 지향적', '계획적', '상호 지원', '책임감'],
    challenges: ['융통성 부족', '스트레스'],
    advice: ['휴식도 중요함을 기억하세요', '작은 성공도 축하하세요', '유연한 사고를 가지세요']
  },
  '호랑이-말': {
    summary: '활동적이고 모험적인 역동적 관계',
    description: '호랑이띠 자녀와 말띠 부모는 서로의 활동성을 이해하고 함께 새로운 도전을 즐기는 관계입니다.',
    positiveAspects: ['활동성', '모험심', '열정', '자유로움'],
    challenges: ['충동성', '일관성 부족'],
    advice: ['계획도 중요함을 기억하세요', '서로의 안전을 생각하세요', '꾸준함을 기르세요']
  },
  '호랑이-개': {
    summary: '정의감과 충성심으로 결속된 든든한 관계',
    description: '호랑이띠 자녀와 개띠 부모는 강한 정의감과 서로에 대한 충성심으로 든든한 관계를 형성합니다.',
    positiveAspects: ['정의감', '충성심', '보호본능', '신뢰'],
    challenges: ['고집', '융통성 부족'],
    advice: ['다른 관점도 수용하세요', '유연성을 기르세요', '대화로 문제를 해결하세요']
  },
  '호랑이-돼지': {
    summary: '용기와 관대함이 조화를 이루는 따뜻한 관계',
    description: '호랑이띠 자녀의 용기와 돼지띠 부모의 관대함이 만나 서로를 지지하는 따뜻한 관계를 만듭니다.',
    positiveAspects: ['상호 지지', '관대함', '용기', '따뜻함'],
    challenges: ['과보호', '독립성 부족'],
    advice: ['적절한 거리도 필요합니다', '독립심을 기르세요', '서로의 성장을 응원하세요']
  },
  '토끼-양': {
    summary: '온화하고 평화로운 조화로운 관계',
    description: '토끼띠 자녀와 양띠 부모는 평화를 사랑하고 예술적 감각을 공유하며, 따뜻하고 안정적인 가정을 만듭니다.',
    positiveAspects: ['평화로움', '예술성', '배려심', '조화'],
    challenges: ['소극성', '결단력 부족'],
    advice: ['적극성도 필요합니다', '도전을 두려워하지 마세요', '자신감을 기르세요']
  },
  '토끼-개': {
    summary: '신뢰와 안정감이 넘치는 편안한 관계',
    description: '토끼띠 자녀와 개띠 부모는 서로를 신뢰하고 안정적인 환경에서 편안한 관계를 유지합니다.',
    positiveAspects: ['신뢰', '안정감', '충실함', '편안함'],
    challenges: ['변화 회피', '모험 부족'],
    advice: ['새로운 경험도 중요합니다', '변화를 받아들이세요', '도전정신을 기르세요']
  },
  '토끼-돼지': {
    summary: '친절함과 관대함이 만나는 행복한 관계',
    description: '토끼띠 자녀와 돼지띠 부모는 서로의 친절함을 나누며 행복하고 만족스러운 관계를 만들어갑니다.',
    positiveAspects: ['친절함', '관대함', '만족감', '행복'],
    challenges: ['현실감각 부족', '낙관주의'],
    advice: ['현실적 계획도 필요합니다', '절제를 배우세요', '목표를 설정하세요']
  },
  '용-원숭이': {
    summary: '야망과 지혜가 만나는 성공적인 관계',
    description: '용띠 자녀의 야망과 원숭이띠 부모의 지혜가 만나 서로를 발전시키는 성공적인 관계를 형성합니다.',
    positiveAspects: ['야망', '지혜', '성공지향', '발전'],
    challenges: ['경쟁심', '스트레스'],
    advice: ['협력의 중요성을 기억하세요', '휴식도 필요합니다', '과정도 즐기세요']
  },
  '용-닭': {
    summary: '리더십과 실행력이 조화를 이루는 생산적 관계',
    description: '용띠 자녀의 리더십과 닭띠 부모의 실행력이 만나 목표를 효과적으로 달성하는 관계입니다.',
    positiveAspects: ['리더십', '실행력', '목표달성', '효율성'],
    challenges: ['완벽주의', '압박감'],
    advice: ['실수도 괜찮다는 것을 인정하세요', '과정을 즐기세요', '여유를 가지세요']
  },
  '뱀-닭': {
    summary: '지혜와 정확성이 만나는 완벽한 조합',
    description: '뱀띠 자녀의 지혜와 닭띠 부모의 정확성이 만나 서로의 장점을 극대화하는 관계입니다.',
    positiveAspects: ['지혜', '정확성', '신중함', '완성도'],
    challenges: ['과도한 분석', '느린 진행'],
    advice: ['때로는 직관도 믿으세요', '속도도 중요합니다', '유연성을 기르세요']
  },
  '말-개': {
    summary: '자유와 충성이 균형을 이루는 좋은 관계',
    description: '말띠 자녀의 자유로움과 개띠 부모의 충성심이 균형을 이루며 서로를 이해하는 관계입니다.',
    positiveAspects: ['균형', '이해', '자유', '충성'],
    challenges: ['가치관 차이', '독립성 문제'],
    advice: ['서로의 가치를 인정하세요', '적절한 거리를 유지하세요', '대화를 자주하세요']
  },
  '양-돼지': {
    summary: '예술성과 낙천성이 어우러지는 행복한 관계',
    description: '양띠 자녀의 예술성과 돼지띠 부모의 낙천성이 만나 즐겁고 창의적인 관계를 만듭니다.',
    positiveAspects: ['예술성', '낙천성', '창의성', '즐거움'],
    challenges: ['현실감 부족', '계획성 부족'],
    advice: ['목표를 구체화하세요', '계획을 세우세요', '현실감각을 기르세요']
  },

  // 좋은 궁합 (80-89점) - 일부 예시

  // 보통 궁합 (60-79점) - 일부 예시
  '쥐-호랑이': {
    summary: '노력하면 발전할 수 있는 관계',
    description: '서로 다른 성향이지만 상호 이해와 노력을 통해 좋은 관계를 만들어갈 수 있습니다.',
    positiveAspects: ['다양한 관점', '서로 배움', '성장 기회', '새로운 경험'],
    challenges: ['성향 차이', '소통 방식 차이'],
    advice: ['충분한 대화시간을 가지세요', '서로의 차이를 인정해주세요', '공통관심사를 찾아보세요']
  },

  // 주의 궁합 (40-59점) - 일부 예시
  '소-호랑이': {
    summary: '서로 다른 성향으로 인한 주의가 필요한 관계',
    description: '소띠 자녀의 신중함과 호랑이띠 부모의 적극성이 때로 충돌할 수 있어 상호 이해가 필요합니다.',
    positiveAspects: ['서로 다른 강점', '균형잡힌 관점', '새로운 시각'],
    challenges: ['성향 충돌', '의사결정 차이', '속도 차이'],
    advice: ['서로의 입장을 이해해주세요', '타협점을 찾는 노력이 필요합니다', '작은 성공을 함께 축하해주세요']
  },

  // 불화 궁합 (대흉 = 10점) 
  '쥐-말': {
    summary: '극도로 상반된 성향으로 어려운 관계',
    description: '쥐띠 자녀의 신중함과 말띠 부모의 자유분방함이 충돌하기 쉽습니다. 많은 인내와 이해가 필요합니다.',
    positiveAspects: ['서로 다른 관점 학습', '인내심 개발', '성장의 기회'],
    challenges: ['가치관 충돌', '생활 패턴 차이', '소통 어려움'],
    advice: ['서로의 차이를 인정하세요', '중재자를 활용하세요', '공통점을 찾으세요']
  },
  '소-양': {
    summary: '충돌이 잦은 매우 어려운 관계',
    description: '소띠 자녀의 고집과 양띠 부모의 변덕스러움이 만나 갈등이 자주 발생할 수 있습니다.',
    positiveAspects: ['인내심 학습', '타협 능력 개발', '성숙의 기회'],
    challenges: ['고집과 충돌', '이해 부족', '감정적 갈등'],
    advice: ['전문가의 도움을 받으세요', '타협점을 찾으세요', '감정 조절이 중요합니다']
  },
  '호랑이-원숭이': {
    summary: '권위와 장난기가 충돌하는 어려운 관계',
    description: '호랑이띠 자녀의 권위적 성향과 원숭이띠 부모의 장난스러움이 충돌하여 갈등이 발생합니다.',
    positiveAspects: ['다양성 인정', '유연성 학습', '관계 성장'],
    challenges: ['권위 충돌', '진지함 부족', '신뢰 문제'],
    advice: ['서로를 존중하세요', '경계를 설정하세요', '진지한 대화가 필요합니다']
  },
  '토끼-닭': {
    summary: '소통이 매우 어려운 불협화음 관계',
    description: '토끼띠 자녀의 조용함과 닭띠 부모의 비판적 성향이 충돌하여 소통이 어렵습니다.',
    positiveAspects: ['인내심 개발', '이해력 향상', '성숙한 관계'],
    challenges: ['소통 단절', '비판과 회피', '감정적 거리'],
    advice: ['소통 방법을 바꿔보세요', '중립적 대화를 시도하세요', '전문가 상담을 고려하세요']
  },
  '용-개': {
    summary: '자존심과 충성심이 충돌하는 어려운 관계',
    description: '용띠 자녀의 자존심과 개띠 부모의 직설적 충고가 충돌하여 갈등이 발생합니다.',
    positiveAspects: ['겸손 학습', '현실 직시', '성장 기회'],
    challenges: ['자존심 충돌', '비판 수용 어려움', '권위 문제'],
    advice: ['서로의 입장을 이해하세요', '부드러운 대화법을 사용하세요', '인정과 칭찬이 필요합니다']
  },
  '뱀-돼지': {
    summary: '가치관이 극도로 다른 어려운 관계',
    description: '뱀띠 자녀의 신비주의와 돼지띠 부모의 현실주의가 충돌하여 이해가 어렵습니다.',
    positiveAspects: ['다양성 인정', '포용력 개발', '넓은 시야'],
    challenges: ['가치관 충돌', '생활방식 차이', '이해 부족'],
    advice: ['서로의 세계관을 존중하세요', '공통 관심사를 찾으세요', '인내심을 가지세요']
  }
};

/**
 * 점수를 등급으로 변환
 */
function getGradeFromScore(score: CompatibilityScore): CompatibilityGrade {
  if (score >= 90) return '최고';  // 대길
  if (score >= 70) return '좋음';   // 길
  if (score >= 50) return '보통';   // 무난
  if (score >= 30) return '주의';   // 흉
  return '불화';                     // 대흉
}

/**
 * 기본 궁합 설명 생성
 */
function generateDefaultDescription(
  firstAnimal: ZodiacAnimal, 
  secondAnimal: ZodiacAnimal, 
  score: number, 
  relationshipType: RelationshipType
): {
  summary: string;
  description: string;
  positiveAspects: string[];
  challenges: string[];
  advice: string[];
} {
  const grade = getGradeFromScore(score);
  const relationInfo = RELATIONSHIP_DESCRIPTIONS[relationshipType];
  
  // 관계 유형별 요약 설명
  const summaryMap: Record<RelationshipType, Record<CompatibilityGrade, string>> = {
    lover: {
      '최고': '운명적 사랑! 서로를 완벽하게 이해하고 사랑하는 최고의 연인',
      '좋음': '달콤한 사랑! 서로의 매력에 빠져 행복한 연애를 하는 좋은 궁합',
      '보통': '평범한 연애! 노력하면 더욱 깊은 사랑으로 발전할 수 있는 관계',
      '주의': '신중한 연애! 서로를 이해하려는 노력이 필요한 관계',
      '불화': '도전적 사랑! 많은 인내와 배려가 필요하지만 극복 가능한 관계'
    },
    family: {
      '최고': '완벽한 가족! 서로를 완벽하게 이해하고 지원하는 이상적인 가족 관계',
      '좋음': '화목한 가족! 서로의 장점을 살리며 따뜻한 가정을 만드는 좋은 궁합',
      '보통': '안정적인 가족! 서로 노력하면 더욱 발전할 수 있는 가족 관계',
      '주의': '주의 깊은 관계! 세대 차이 이해와 배려가 중요한 가족 관계',
      '불화': '특별한 노력! 가족 간 갈등을 극복하려는 진심어린 노력이 필요'
    },
    friend: {
      '최고': '평생 친구! 서로를 완벽하게 이해하고 신뢰하는 최고의 우정',
      '좋음': '좋은 친구! 서로의 장점을 인정하며 즐거운 우정을 나누는 관계',
      '보통': '무난한 친구! 서로 노력하면 더욱 깊은 우정으로 발전 가능한 관계',
      '주의': '조심스러운 관계! 오해를 피하고 신중하게 우정을 쌓아가야 하는 관계',
      '불화': '어려운 우정! 갈등을 극복하려는 특별한 노력과 이해가 필요'
    }
  };

  // 관계 유형별 상세 설명
  const descriptionMap: Record<RelationshipType, Record<CompatibilityGrade, string>> = {
    lover: {
      '최고': `${firstAnimal}띠와 ${secondAnimal}띠는 연인으로서 천생연분입니다. 서로의 감정을 잘 이해하고 사랑을 표현하는 방식이 잘 맞아 행복한 연애를 할 수 있습니다.`,
      '좋음': `${firstAnimal}띠와 ${secondAnimal}띠는 연인으로서 서로를 보완하며 달콤한 사랑을 키워갈 수 있습니다. 서로의 매력을 인정하고 존중하는 관계입니다.`,
      '보통': `${firstAnimal}띠와 ${secondAnimal}띠는 연인으로서 평범하지만 안정적인 관계를 유지할 수 있습니다. 노력하면 더 깊은 사랑으로 발전할 수 있습니다.`,
      '주의': `${firstAnimal}띠와 ${secondAnimal}띠는 연인으로서 서로 다른 연애 스타일로 인해 갈등이 생길 수 있습니다. 상대방을 이해하려는 노력이 필요합니다.`,
      '불화': `${firstAnimal}띠와 ${secondAnimal}띠는 연인으로서 성격과 가치관 차이로 많은 어려움을 겪을 수 있습니다. 진정한 사랑이 있다면 극복 가능합니다.`
    },
    family: {
      '최고': `${firstAnimal}띠 ${relationInfo.labels.first}와 ${secondAnimal}띠 ${relationInfo.labels.second}는 가족으로서 서로를 완벽하게 이해하고 지지하는 이상적인 관계입니다.`,
      '좋음': `${firstAnimal}띠 ${relationInfo.labels.first}와 ${secondAnimal}띠 ${relationInfo.labels.second}는 가족으로서 서로의 장점을 살리며 화목한 가정을 만들어갑니다.`,
      '보통': `${firstAnimal}띠 ${relationInfo.labels.first}와 ${secondAnimal}띠 ${relationInfo.labels.second}는 가족으로서 평범하지만 안정적인 관계를 유지할 수 있습니다.`,
      '주의': `${firstAnimal}띠 ${relationInfo.labels.first}와 ${secondAnimal}띠 ${relationInfo.labels.second}는 가족으로서 세대 차이나 가치관 차이로 갈등이 있을 수 있습니다.`,
      '불화': `${firstAnimal}띠 ${relationInfo.labels.first}와 ${secondAnimal}띠 ${relationInfo.labels.second}는 가족으로서 많은 갈등을 겪을 수 있지만, 가족애로 극복할 수 있습니다.`
    },
    friend: {
      '최고': `${firstAnimal}띠와 ${secondAnimal}띠는 친구로서 서로를 완벽하게 이해하고 신뢰하는 평생 친구가 될 수 있습니다.`,
      '좋음': `${firstAnimal}띠와 ${secondAnimal}띠는 친구로서 서로의 장점을 인정하며 즐거운 우정을 나눌 수 있는 좋은 관계입니다.`,
      '보통': `${firstAnimal}띠와 ${secondAnimal}띠는 친구로서 평범하지만 꾸준한 우정을 유지할 수 있는 안정적인 관계입니다.`,
      '주의': `${firstAnimal}띠와 ${secondAnimal}띠는 친구로서 서로 다른 성향으로 인해 오해가 생길 수 있어 조심스러운 관계입니다.`,
      '불화': `${firstAnimal}띠와 ${secondAnimal}띠는 친구로서 성격 차이로 갈등이 많을 수 있지만, 서로를 이해하면 좋은 친구가 될 수 있습니다.`
    }
  };

  // 관계 유형별 장점
  const positiveAspectsMap: Record<RelationshipType, Record<CompatibilityGrade, string[]>> = {
    lover: {
      '최고': ['완벽한 감정적 교감', '자연스러운 스킨십', '공통된 미래 목표', '서로에 대한 깊은 이해'],
      '좋음': ['달콤한 로맨스', '서로를 보완하는 매력', '즐거운 데이트', '안정적인 애정 표현'],
      '보통': ['편안한 관계', '서로에 대한 기본적 신뢰', '성장할 수 있는 여지', '무난한 소통'],
      '주의': ['서로 다른 매력 발견', '관계 개선의 기회', '인내심 발달', '더 깊은 이해 가능'],
      '불화': ['극복을 통한 성장', '진정한 사랑 확인', '강한 의지력', '서로에 대한 새로운 발견']
    },
    family: {
      '최고': ['완벽한 가족 조화', '서로에 대한 무조건적 사랑', '가족 전통 계승', '안정적인 가정 환경'],
      '좋음': ['따뜻한 가족애', '서로를 지지하는 관계', '건전한 가정 문화', '상호 존중'],
      '보통': ['평화로운 가정', '기본적인 가족 유대', '안정적인 생활', '무난한 소통'],
      '주의': ['세대 차이 극복 기회', '서로 배울 점', '가족 관계 개선', '인내심 발달'],
      '불화': ['가족애를 통한 극복', '더 깊은 이해', '관계 개선 의지', '가족 결속력 강화']
    },
    friend: {
      '최고': ['완벽한 우정', '서로에 대한 절대적 신뢰', '평생 동반자', '무조건적 지지'],
      '좋음': ['즐거운 우정', '서로를 이해하는 관계', '좋은 추억 공유', '상호 격려'],
      '보통': ['안정적인 우정', '기본적인 신뢰', '꾸준한 관계', '무난한 교류'],
      '주의': ['서로 다른 관점 학습', '우정 발전 가능성', '관계 개선 기회', '인내심 기르기'],
      '불화': ['극복을 통한 성장', '진정한 우정 확인', '서로에 대한 새로운 이해', '관계 발전 의지']
    }
  };

  // 관계 유형별 도전 과제
  const challengesMap: Record<RelationshipType, Record<CompatibilityGrade, string[]>> = {
    lover: {
      '최고': ['완벽함에 대한 부담', '질투나 독점욕', '미래에 대한 과도한 기대'],
      '좋음': ['연애 초기의 설렘 유지', '서로 다른 연애 스타일', '미래 계획의 차이'],
      '보통': ['연애의 매너리즘', '감정 표현의 어려움', '서로에 대한 무관심'],
      '주의': ['잦은 의견 충돌', '연애 가치관 차이', '감정적 거리감'],
      '불화': ['극심한 성격 차이', '자주 발생하는 갈등', '이별 위기']
    },
    family: {
      '최고': ['과도한 기대', '완벽주의 성향', '외부 시선에 대한 부담'],
      '좋음': ['서로 다른 생활 패턴', '세대 간 취향 차이', '역할 분담 문제'],
      '보통': ['일상의 권태감', '소통 부족', '서로에 대한 무관심'],
      '주의': ['세대 차이로 인한 갈등', '가치관 충돌', '의사소통 장벽'],
      '불화': ['극심한 가치관 차이', '자주 발생하는 가족 갈등', '감정적 상처']
    },
    friend: {
      '최고': ['과도한 의존', '질투나 경쟁심', '완벽한 관계에 대한 부담'],
      '좋음': ['서로 다른 관심사', '시간 투자의 차이', '친구 간 경계'],
      '보통': ['만남의 빈도 조절', '관심의 감소', '새로운 친구들과의 균형'],
      '주의': ['자주 발생하는 오해', '성향 차이로 인한 갈등', '신뢰 부족'],
      '불화': ['극심한 성격 차이', '자주 발생하는 다툼', '우정의 지속 어려움']
    }
  };

  // 관계 유형별 조언
  const adviceMap: Record<RelationshipType, Record<CompatibilityGrade, string[]>> = {
    lover: {
      '최고': ['서로의 사랑을 자주 표현하세요', '공통의 꿈을 함께 키워나가세요', '현재의 행복을 소중히 여기세요'],
      '좋음': ['데이트 시간을 자주 가지세요', '서로의 취미를 존중해주세요', '미래 계획을 함께 세우세요'],
      '보통': ['충분한 대화시간을 가지세요', '서로의 차이를 인정하고 존중해주세요', '작은 것에도 감사를 표현하세요'],
      '주의': ['인내심을 가지고 소통하세요', '서로의 감정을 이해하려 노력하세요', '전문가의 도움을 받는 것도 좋습니다'],
      '불화': ['감정적 대립을 피하세요', '중재자의 도움을 받아보세요', '서로에게 시간과 공간을 주세요']
    },
    family: {
      '최고': ['가족 시간을 소중히 하세요', '서로의 장점을 격려해주세요', '전통을 함께 이어가세요'],
      '좋음': ['규칙적인 대화를 나누세요', '서로의 역할을 존중해주세요', '가족의 화합을 위해 노력하세요'],
      '보통': ['충분한 대화시간을 가지세요', '서로의 차이를 인정하고 존중해주세요', '작은 것에도 감사를 표현하세요'],
      '주의': ['세대 차이를 이해하려 노력하세요', '서로의 입장을 헤아려보세요', '가족 상담을 받아보세요'],
      '불화': ['감정적 갈등을 피하세요', '중립적인 대화를 시도하세요', '전문가의 도움을 받으세요']
    },
    friend: {
      '최고': ['우정을 소중히 여기세요', '서로의 성공을 축하해주세요', '평생 친구로 지내세요'],
      '좋음': ['정기적으로 만나는 시간을 가지세요', '서로의 관심사를 공유하세요', '어려울 때 도움을 주고받으세요'],
      '보통': ['충분한 대화시간을 가지세요', '서로의 차이를 인정하고 존중해주세요', '작은 것에도 감사를 표현하세요'],
      '주의': ['오해가 생기지 않도록 주의하세요', '서로의 경계를 존중하세요', '솔직한 대화를 나누세요'],
      '불화': ['불필요한 경쟁을 피하세요', '거리를 두는 것도 좋습니다', '공통 관심사를 찾아보세요']
    }
  };

  return {
    summary: summaryMap[relationshipType][grade],
    description: descriptionMap[relationshipType][grade],
    positiveAspects: positiveAspectsMap[relationshipType][grade],
    challenges: challengesMap[relationshipType][grade],
    advice: adviceMap[relationshipType][grade]
  };
}

/**
 * 띠 궁합을 계산합니다
 * @param firstAnimal 첫 번째 사람의 띠
 * @param secondAnimal 두 번째 사람의 띠
 * @param relationshipType 관계 유형
 * @returns 궁합 결과
 */
export function calculateCompatibility(
  firstAnimal: ZodiacAnimal, 
  secondAnimal: ZodiacAnimal, 
  relationshipType: RelationshipType = 'family'
): CompatibilityResult {
  const score = COMPATIBILITY_MATRIX[firstAnimal][secondAnimal];
  const grade = getGradeFromScore(score);
  
  // 관계 유형에 따른 맞춤 설명 생성 (기존 고정 설명은 사용하지 않음)
  const compatibility = generateDefaultDescription(firstAnimal, secondAnimal, score, relationshipType);

  return {
    childAnimal: firstAnimal,
    parentAnimal: secondAnimal,
    score,
    grade,
    relationshipType,
    ...compatibility
  };
}

/**
 * 여러 부모와의 궁합을 계산합니다 (아버지, 어머니)
 * @param childAnimal 자녀의 띠
 * @param fatherAnimal 아버지의 띠
 * @param motherAnimal 어머니의 띠 (선택사항)
 * @param relationshipType 관계 유형
 * @returns 궁합 결과 배열
 */
export function calculateFamilyCompatibility(
  childAnimal: ZodiacAnimal,
  fatherAnimal: ZodiacAnimal,
  motherAnimal?: ZodiacAnimal,
  relationshipType: RelationshipType = 'family'
): CompatibilityResult[] {
  const results: CompatibilityResult[] = [];
  
  // 아버지와의 궁합
  results.push(calculateCompatibility(childAnimal, fatherAnimal, relationshipType));
  
  // 어머니와의 궁합 (있는 경우)
  if (motherAnimal && motherAnimal !== fatherAnimal) {
    results.push(calculateCompatibility(childAnimal, motherAnimal, relationshipType));
  }
  
  return results;
}

/**
 * 궁합 결과를 색상으로 반환
 * @param grade 궁합 등급
 * @returns Tailwind CSS 클래스명
 */
export function getCompatibilityColor(grade: CompatibilityGrade): {
  bg: string;
  text: string;
  border: string;
} {
  const colorMap: Record<CompatibilityGrade, { bg: string; text: string; border: string }> = {
    '최고': { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
    '좋음': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    '보통': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    '주의': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    '불화': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' }
  };
  
  return colorMap[grade];
}

/**
 * 궁합 점수를 백분율로 변환
 * @param score 궁합 점수
 * @returns 백분율 문자열
 */
export function formatCompatibilityScore(score: CompatibilityScore): string {
  return `${score}%`;
}

/**
 * 궁합 등급의 설명을 반환
 * @param grade 궁합 등급
 * @returns 등급 설명
 */
export function getGradeDescription(grade: CompatibilityGrade): string {
  const descriptions: Record<CompatibilityGrade, string> = {
    '최고': '대길(大吉)! 천생연분으로 서로를 완벽하게 이해하는 최상의 관계',
    '좋음': '길(吉)! 서로의 장점을 살리며 행복한 관계를 만들어가는 좋은 궁합',
    '보통': '무난! 평범하지만 안정적인 관계로 노력하면 발전 가능',
    '주의': '흉(凶)! 갈등이 있을 수 있어 특별한 이해와 배려가 필요',
    '불화': '대흉(大凶)! 극도로 어려운 관계로 많은 인내와 노력이 필요'
  };
  
  return descriptions[grade];
}

/**
 * 관계 유형에 따른 라벨을 반환
 * @param relationshipType 관계 유형
 * @returns 관계 라벨
 */
export function getRelationshipLabels(relationshipType: RelationshipType): { first: string; second: string; context: string } {
  const relationInfo = RELATIONSHIP_DESCRIPTIONS[relationshipType];
  return {
    first: relationInfo.labels.first,
    second: relationInfo.labels.second,
    context: relationInfo.context
  };
}