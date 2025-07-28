/**
 * 띠메이트 - 띠 계산 및 궁합 유틸리티
 * 양력 기준으로 띠를 계산하고 궁합을 분석합니다.
 */

// 12지 띠 정의 (쥐부터 시작)
export const ZODIAC_ANIMALS = [
  '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'
] as const;

export type ZodiacAnimal = typeof ZODIAC_ANIMALS[number];

// 띠 정보 인터페이스
export interface ZodiacInfo {
  animal: ZodiacAnimal;
  year: number;
  element: string;
  personality: string;
  characteristics: string[];
  luckyColors: string[];
  luckyNumbers: number[];
}

// 띠별 상세 정보
export const ZODIAC_INFO: Record<ZodiacAnimal, Omit<ZodiacInfo, 'animal' | 'year'>> = {
  '쥐': {
    element: '수(水)',
    personality: '영리하고 적응력이 뛰어난',
    characteristics: ['지혜로움', '근면성', '적응력', '사교성'],
    luckyColors: ['파란색', '금색', '녹색'],
    luckyNumbers: [2, 3]
  },
  '소': {
    element: '토(土)',
    personality: '성실하고 인내심이 강한',
    characteristics: ['성실함', '인내심', '신뢰성', '책임감'],
    luckyColors: ['노란색', '주황색', '빨간색'],
    luckyNumbers: [1, 9]
  },
  '호랑이': {
    element: '목(木)',
    personality: '용감하고 카리스마 있는',
    characteristics: ['용기', '리더십', '정의감', '열정'],
    luckyColors: ['주황색', '회색', '파란색'],
    luckyNumbers: [1, 3, 4]
  },
  '토끼': {
    element: '목(木)',
    personality: '온화하고 섬세한',
    characteristics: ['친절함', '예술적 감각', '평화로움', '신중함'],
    luckyColors: ['빨간색', '분홍색', '보라색'],
    luckyNumbers: [3, 4, 6]
  },
  '용': {
    element: '토(土)',
    personality: '당당하고 야심찬',
    characteristics: ['카리스마', '자신감', '창의성', '리더십'],
    luckyColors: ['금색', '은색', '회색'],
    luckyNumbers: [1, 6, 7]
  },
  '뱀': {
    element: '화(火)',
    personality: '지혜롭고 신비로운',
    characteristics: ['지혜', '직관력', '매력', '신중함'],
    luckyColors: ['검은색', '빨간색', '노란색'],
    luckyNumbers: [2, 8, 9]
  },
  '말': {
    element: '화(火)',
    personality: '자유롭고 활동적인',
    characteristics: ['자유로움', '활동성', '사교성', '낙천성'],
    luckyColors: ['노란색', '녹색'],
    luckyNumbers: [2, 3, 7]
  },
  '양': {
    element: '토(土)',
    personality: '온순하고 예술적인',
    characteristics: ['온순함', '예술성', '동정심', '평화로움'],
    luckyColors: ['녹색', '빨간색', '보라색'],
    luckyNumbers: [3, 4, 9]
  },
  '원숭이': {
    element: '금(金)',
    personality: '영리하고 재치 있는',
    characteristics: ['영리함', '재치', '호기심', '유머'],
    luckyColors: ['흰색', '파란색', '금색'],
    luckyNumbers: [1, 7, 8]
  },
  '닭': {
    element: '금(金)',
    personality: '성실하고 꼼꼼한',
    characteristics: ['성실함', '꼼꼼함', '정직함', '책임감'],
    luckyColors: ['금색', '갈색', '노란색'],
    luckyNumbers: [5, 7, 8]
  },
  '개': {
    element: '토(土)',
    personality: '충실하고 정의로운',
    characteristics: ['충실함', '정의감', '보호본능', '신뢰성'],
    luckyColors: ['빨간색', '녹색', '보라색'],
    luckyNumbers: [3, 4, 9]
  },
  '돼지': {
    element: '수(水)',
    personality: '관대하고 성실한',
    characteristics: ['관대함', '성실함', '순수함', '행운'],
    luckyColors: ['노란색', '회색', '갈색'],
    luckyNumbers: [2, 5, 8]
  }
};

/**
 * 생년을 기준으로 띠를 계산합니다 (양력 기준)
 * @param year 생년 (숫자)
 * @returns 띠 이름
 */
export function getZodiacAnimal(year: number): ZodiacAnimal {
  if (year < 1900 || year > 2100) {
    throw new Error('지원하지 않는 연도입니다. (1900-2100)');
  }
  
  // 기준년도: 1996년 = 쥐띠 (자)
  // 1996 % 12 = 4이므로, 4를 빼면 쥐띠가 인덱스 0이 됨
  const index = (year - 4) % 12;
  // 음수 처리를 위해 12를 더하고 다시 12로 나눔
  const normalizedIndex = (index + 12) % 12;
  
  return ZODIAC_ANIMALS[normalizedIndex];
}

/**
 * 생년을 기준으로 띠 정보를 가져옵니다
 * @param year 생년 (숫자)
 * @returns 띠 정보 객체
 */
export function getZodiacInfo(year: number): ZodiacInfo {
  const animal = getZodiacAnimal(year);
  const info = ZODIAC_INFO[animal];
  
  return {
    animal,
    year,
    ...info
  };
}

/**
 * 연도 유효성 검사
 * @param year 검사할 연도
 * @returns 유효성 검사 결과
 */
export function validateYear(year: number): { isValid: boolean; error?: string } {
  if (isNaN(year)) {
    return { isValid: false, error: '올바른 숫자를 입력해주세요.' };
  }
  
  if (year < 1900) {
    return { isValid: false, error: '1900년 이후 연도를 입력해주세요.' };
  }
  
  if (year > 2100) {
    return { isValid: false, error: '2100년 이전 연도를 입력해주세요.' };
  }
  
  const currentYear = new Date().getFullYear();
  if (year > currentYear) {
    return { isValid: false, error: '미래 연도는 입력할 수 없습니다.' };
  }
  
  return { isValid: true };
}

/**
 * 연도를 문자열로 변환할 때 사용
 * @param year 연도
 * @returns 포맷된 연도 문자열
 */
export function formatYear(year: number): string {
  return `${year}년`;
}

/**
 * 띠 이름을 이모지와 함께 반환
 * @param animal 띠 이름
 * @returns 이모지가 포함된 띠 이름
 */
export function getZodiacEmoji(animal: ZodiacAnimal): string {
  const emojiMap: Record<ZodiacAnimal, string> = {
    '쥐': '🐭',
    '소': '🐮',
    '호랑이': '🐯',
    '토끼': '🐰',
    '용': '🐲',
    '뱀': '🐍',
    '말': '🐴',
    '양': '🐑',
    '원숭이': '🐵',
    '닭': '🐔',
    '개': '🐕',
    '돼지': '🐷'
  };
  
  return `${emojiMap[animal]} ${animal}`;
}