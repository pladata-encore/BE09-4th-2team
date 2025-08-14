'use client';
import { useState, useEffect } from 'react';
import ChoiceMenu from '@/src/app/(main)/(blog)/common/ChoiceMenu';
import BlogList from '@/src/app/(main)/(blog)/common/BlogList';
import Header from '@/src/app/(main)/searching/Header';
import MenuTabs from '@/src/components/header/MenuTabs';
import LoginModal from '@/src/app/(main)/(loginmodal)/LoginModal';
import axios from 'axios';

export default function BlogHome() {
  const [data, setData] = useState({
    content: [],
    totalPages: 1,
    number: 0,
    first: true,
    last: true,
  });
  const [selected, setSelected] = useState('전체');

  // 페이지 변경 및 최초 진입 시 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BLOG}/blog-service/posts/all`, {
        params: { page: data.number, size: 10 },
      })
      .then(res => setData(res.data.data ?? {}));
    // eslint-disable-next-line
  }, [data.number]);

  // 페이지네이션 핸들러
  const onPageChange = newPage => {
    setData(prev => ({ ...prev, number: newPage }));
  };

  const blogs = data.content || [];
  const categories = ['전체', ...new Set(blogs.map(b => b.subTopicName))];
  const filtered = selected === '전체' ? blogs : blogs.filter(b => b.subTopicName === selected);

  return (
    <div style={{ fontFamily: 'NanumGothic' }}>
      <Header />
      <MenuTabs />
      <div style={{ textAlign: 'center', margin: '54px 0' }}>
        <p style={{ lineHeight: '2' }}>
          로그아웃 상태입니다. <br /> 로그인하여 이웃새글을 확인해보세요.
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '24px',
          padding: '0 16px',
          maxWidth: '1032px',
          margin: '0 auto',
        }}
      >
        <div style={{ flex: 1, maxWidth: '720px' }}>
          <ChoiceMenu categories={categories} selected={selected} onSelect={setSelected} />
          <BlogList blogs={filtered} pageable={data} onPageChange={onPageChange} />
        </div>
        <div style={{ width: '256px' }}>
          <LoginModal userInfo={null} />
        </div>
      </div>
    </div>
  );
}
