'use client';

import { useState } from 'react';
import NewsCard from './NewsCard';
import Activity from './Activity';
import NeighborList from './NeighborList';
import './loginModalstyle.css';
import Link from 'next/link';

export default function LoginModal({ userInfo }) {
  const isLogin = !!userInfo;
  const [activeTab, setActiveTab] = useState('소식');

  const handleLogout = () => {
    console.log('로그아웃');
    window.location.href = '/blogHome'; // 로그아웃 후 리다이렉션
  };

  if (!isLogin) {
    return (
      <div className="ugc-login" style={{ border: '1px solid #ccc' }}>
        <p className="top-text">네이버를 보다 편리하고 안전하게 이용하세요.</p>
        <button className="login-button">
          <Link href="/login" style={{ textDecoration: 'none', color: 'white' }}>
            <strong>NAVER</strong>로그인
          </Link>
        </button>
        <div className="login-footer">
          <div className="left-links"></div>
          <div className="right-link">
            <Link href="/register" style={{ textDecoration: 'none', color: 'black' }}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mypage-widget">
      {/* 프로필 박스 */}
      <div className="profile-box">
        <div className="profile-left">
          <div className="avatar"></div>
          <div>
            <div className="nickname">{userInfo.nickname || '로그인 사용자'}</div>
            <div className="visit">
              오늘 <span className="green">0명</span> 방문
            </div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      {/* 상단 탭 */}
      <div className="top-tabs">
        <div className="tab active">
          <Link href="/blog/my-blog" style={{ textDecoration: 'none', color: 'inherit' }}>
            내 블로그
          </Link>
        </div>
        <div className="tab">
          <Link href="/blog-editor" style={{ textDecoration: 'none', color: 'inherit' }}>
            ✏ 글쓰기
          </Link>
        </div>
      </div>

      {/* 하단 탭 */}
      <div className="sub-tabs">
        <div
          className={`sub-tab ${activeTab === '소식' ? 'active' : ''}`}
          onClick={() => setActiveTab('소식')}
        >
          내 소식
        </div>
        <div
          className={`sub-tab ${activeTab === '활동' ? 'active' : ''}`}
          onClick={() => setActiveTab('활동')}
        >
          내 활동
        </div>
        <div
          className={`sub-tab ${activeTab === '이웃' ? 'active' : ''}`}
          onClick={() => setActiveTab('이웃')}
        >
          이웃 목록
        </div>
      </div>

      {/* 아래에 바뀌는 영역 */}
      <div className="tab-content">
        {activeTab === '소식' && <NewsCard />}
        {activeTab === '활동' && <Activity />}
        {activeTab === '이웃' && <NeighborList UserId={userInfo.id} />}
      </div>
    </div>
  );
}
