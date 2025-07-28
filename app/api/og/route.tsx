import { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import { getZodiacInfo, getZodiacEmoji } from '@/lib/zodiac';
import { calculateCompatibility } from '@/lib/compatibility';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const childYear = searchParams.get('child');
  const parentYear = searchParams.get('parent');

  if (!childYear || !parentYear) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fdf2f8',
            background: 'linear-gradient(45deg, #fdf2f8 0%, #f3e8ff 100%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginRight: 15 }}>💝</div>
            <div style={{ color: '#ec4899' }}>띠메이트</div>
          </div>
          <div style={{ color: '#6b7280', fontSize: 24 }}>
            자녀와 부모의 띠 궁합을 알아보세요
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  try {
    const childYearNum = parseInt(childYear);
    const parentYearNum = parseInt(parentYear);
    
    const childInfo = getZodiacInfo(childYearNum);
    const parentInfo = getZodiacInfo(parentYearNum);
    const compatibility = calculateCompatibility(childInfo.animal, parentInfo.animal);

    // 궁합 등급에 따른 색상
    const gradeColors = {
      '최고': { bg: '#d1fae5', text: '#065f46', accent: '#10b981' },
      '좋음': { bg: '#dcfce7', text: '#166534', accent: '#22c55e' },
      '보통': { bg: '#fef3c7', text: '#92400e', accent: '#f59e0b' },
      '주의': { bg: '#fed7aa', text: '#9a3412', accent: '#ea580c' },
      '불화': { bg: '#fecaca', text: '#991b1b', accent: '#ef4444' }
    }[compatibility.grade];

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: gradeColors.bg,
            background: `linear-gradient(45deg, ${gradeColors.bg} 0%, #ffffff 100%)`,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* 헤더 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 40,
            fontSize: 36,
            fontWeight: 700,
            color: '#ec4899'
          }}>
            <div style={{ fontSize: 48, marginRight: 15 }}>💝</div>
            <div>띠메이트</div>
          </div>

          {/* 띠 정보 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: 80,
            marginBottom: 40
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '30px 40px',
              borderRadius: 20,
              border: '3px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ fontSize: 60, marginBottom: 10 }}>
                {getZodiacEmoji(childInfo.animal).split(' ')[0]}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#1e40af' }}>
                {childInfo.animal}띠 자녀
              </div>
              <div style={{ fontSize: 18, color: '#6b7280' }}>
                {childYear}년생
              </div>
            </div>

            <div style={{ 
              fontSize: 48, 
              color: gradeColors.accent,
              fontWeight: 700
            }}>
              VS
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'rgba(147, 51, 234, 0.1)',
              padding: '30px 40px',
              borderRadius: 20,
              border: '3px solid rgba(147, 51, 234, 0.3)'
            }}>
              <div style={{ fontSize: 60, marginBottom: 10 }}>
                {getZodiacEmoji(parentInfo.animal).split(' ')[0]}
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#7c3aed' }}>
                {parentInfo.animal}띠 부모
              </div>
              <div style={{ fontSize: 18, color: '#6b7280' }}>
                {parentYear}년생
              </div>
            </div>
          </div>

          {/* 궁합 결과 */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: 'white',
            padding: '40px 60px',
            borderRadius: 25,
            border: `4px solid ${gradeColors.accent}`,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              fontSize: 28, 
              fontWeight: 700,
              color: gradeColors.text,
              marginBottom: 15
            }}>
              궁합 등급: {compatibility.grade}
            </div>
            <div style={{ 
              fontSize: 56, 
              fontWeight: 900,
              color: gradeColors.accent,
              marginBottom: 15
            }}>
              {compatibility.score}%
            </div>
            <div style={{ 
              fontSize: 20,
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: 500
            }}>
              {compatibility.summary}
            </div>
          </div>

          {/* 하단 */}
          <div style={{ 
            position: 'absolute',
            bottom: 30,
            fontSize: 16,
            color: '#9ca3af'
          }}>
            ttimate.com에서 자세한 분석 확인하기
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fef2f2',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div style={{ color: '#dc2626', marginBottom: 20 }}>⚠️</div>
          <div style={{ color: '#dc2626' }}>오류가 발생했습니다</div>
          <div style={{ color: '#6b7280', fontSize: 20, marginTop: 10 }}>
            다시 시도해주세요
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}