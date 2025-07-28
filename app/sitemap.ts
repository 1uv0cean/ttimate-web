import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ttimate.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-07-28'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/result`,
      lastModified: new Date('2025-07-28'),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    // 연도별 페이지 추가 (주요 연도들)
    ...generateYearlyPages(baseUrl),
  ];
}

function generateYearlyPages(baseUrl: string) {
  const currentYear = 2025;
  const startYear = 1950;
  const pages = [];
  
  // 10년 단위로 주요 연도 페이지 생성
  for (let year = startYear; year <= currentYear; year += 10) {
    pages.push({
      url: `${baseUrl}/year/${year}`,
      lastModified: new Date('2025-07-28'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    });
  }
  
  return pages;
}