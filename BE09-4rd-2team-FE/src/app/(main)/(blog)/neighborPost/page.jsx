'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from '@/src/app/(main)/(blog)/common/BlogList';
import Header from '@/src/app/(main)/searching/Header';
import MenuTabs from '@/src/components/header/MenuTabs';
import LoginModal from '@/src/app/(main)/(loginmodal)/LoginModal';
import { savedUserInfo } from '@/src/app/(main)/(neighbor)/services/neighborApi';

const API_BASE = process.env.NEXT_PUBLIC_API_BLOG;

export default function NeighborPost() {
  const [blogs, setBlogs] = useState([]);
  const [pageable, setPageable] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
    alert('로그아웃 되었습니다.');
    router.push('/blogHome'); // 로그인 페이지로 이동
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      router.push('/login'); // 로그인 페이지로 이동
      return;
    }
    savedUserInfo()
      .then(res => {
        setUserInfo(res.data); // 여기서 유저 정보 상태로 저장
      })
      .catch(err => {
        console.error('유저 정보 불러오기 실패:', err);
        setUserInfo(null);
      });

    setLoading(true);
    setError('');
    const url = `${API_BASE}/blog-service/posts/neighbors?page=${page}&size=${size}`;
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async res => {
        if (res.status === 401) {
          // 인증 만료/실패
          alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
          router.push('/login');
          return;
        }
        const data = await res.json();
        const result = data.data || {};
        setBlogs(result.content || []);
        setPageable({
          totalPages: result.totalPages,
          number: result.number,
          first: result.first,
          last: result.last,
        });
      })
      .catch(e => {
        setBlogs([]);
        setPageable({});
        setError('API 요청 실패');
        console.error('API 에러:', e);
      })
      .finally(() => setLoading(false));
  }, [page, size, router]);

  const handlePageChange = newPage => setPage(newPage);

  return (
    <div>
      <Header />
      <MenuTabs />
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '0 16px',
          maxWidth: '1032px',
          margin: '0 auto',
          fontFamily: 'NanumGothic',
        }}
      >
        <div style={{ flex: 1, maxWidth: '720px' }}>
          <h2>이웃새글</h2>
          {loading && <div>로딩중...</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          {!loading && !error && (
            <BlogList blogs={blogs} pageable={pageable} onPageChange={handlePageChange} />
          )}
        </div>
        <div style={{ width: '256px' }}>
          <LoginModal userInfo={userInfo} />
        </div>
      </div>
    </div>
  );
}
