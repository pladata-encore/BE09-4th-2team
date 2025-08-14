/* Header.jsx */
import Link from 'next/link';
import React, { useState } from 'react';

export default function Header({ title, content, onOpenPublishOptions }) {
  // props로 전달 받음
  // 데이터(상태)는 부모가 소유하고,
  // 자식은 props로 전달받아 출력하거나 이벤트 발생시킴.

  // 저장 버튼 동작
  const handleSave = () => {
    const blogPost = { title, content };
    console.log('저장:', blogPost);
  };

  // 발행 버튼 동작 : props 전달 받아 발행설정창 실행
  const handlePublish = () => {
    const blogPost = { title, content };
    console.log('발행!', blogPost);
    onOpenPublishOptions(); // 부모 함수 실행
  };

  return (
    <header className="header">
      <div className="logo-area">
        <Link href="https://www.naver.com">
          <img src="/images/editor/header/n-logo.svg" alt="Naver Logo" className="logo-img" />
        </Link>

        <Link href="/">
          <img
            src="/images/editor/header/blog-logo.svg"
            alt="Naver Blog Logo"
            className="logo-img blog-logo"
          />
        </Link>
      </div>

      {/* 저장/발행 버튼 */}
      <div className="space-x-2">
        <button onClick={handleSave}>저장</button>
        <button onClick={handlePublish} className="publish-btn">
          발행
        </button>
      </div>
    </header>
  );
}
