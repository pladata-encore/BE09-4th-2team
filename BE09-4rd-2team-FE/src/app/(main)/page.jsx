'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null: 체크 전, true/false: 결과
  const router = useRouter();

  useEffect(() => {
    // accessToken 존재 여부로 로그인 체크
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  // 페이지 진입시 바로 분기 라우팅
  useEffect(() => {
    if (isLoggedIn === null) return; // 체크 전
    if (isLoggedIn) {
      router.replace('/neighborPost'); // 로그인 시 이웃새글로
    } else {
      router.replace('/blogHome'); // 비로그인 시 전체글로 (아래 참조)
    }
  }, [isLoggedIn, router]);

  // 로딩중 메시지
  if (isLoggedIn === null) return <div>로딩중...</div>;

  // 분기 라우팅이므로 실제 렌더링 없음 (위에서 이동)
  return null;
}
