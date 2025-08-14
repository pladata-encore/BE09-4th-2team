'use client';

import SympathyItem from '@/src/components/sympathy/SympathyItem';
import { useState, useEffect } from 'react';
import api from '@/src/lib/axios'; // 전역 api 인스턴스 사용 (JWT 인터셉터 포함)

export default function SympathyListPage({ postId = 1 }) {
  const [likedUsers, setLikedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 백엔드 API 호출 함수 - JWT 토큰 자동 추가됨
  const fetchPostLikeUsers = async postId => {
    try {
      setLoading(true);
      // 전역 api 인스턴스 사용 (JWT 인터셉터가 자동으로 Authorization 헤더 추가)
      const response = await api.get(`/posts/${postId}/likes`);
      setLikedUsers(response.data.likedUsers || []);
    } catch (error) {
      console.error('공감한 블로거 목록 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchPostLikeUsers(postId);
  }, [postId]);

  // 로딩 중일 때
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>;
  }

  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e1e5e9',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111827',
          }}
        >
          이 글에 공감한 블로거
        </h1>
      </div>

      {likedUsers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          아직 공감한 블로거가 없습니다.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 왼쪽 열 */}
          <div>
            {likedUsers.slice(0, Math.ceil(likedUsers.length / 2)).map((userItem, index) => (
              <SympathyItem key={userItem.user.id || index} blogger={userItem.user} />
            ))}
          </div>

          {/* 오른쪽 열 */}
          <div>
            {likedUsers.slice(Math.ceil(likedUsers.length / 2)).map((userItem, index) => (
              <SympathyItem key={userItem.user.id || index} blogger={userItem.user} />
            ))}
          </div>
        </div>
      )}

      <div
        style={{
          padding: '17px 0 20px',
          textAlign: 'center',
          borderTop: '1px solid #eee',
          marginTop: '20px',
        }}
      >
        <span style={{ marginRight: '20px', cursor: 'not-allowed', color: '#ccc' }}>&lt; 이전</span>
        <span style={{ cursor: 'pointer' }}>다음 &gt;</span>
      </div>
    </div>
  );
}
