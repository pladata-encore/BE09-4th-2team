import React, { useState } from 'react';
import '@/src/components/post/my-blog-box/MyPostBoxFooterIcons.css';
import PostPage from '@/src/app/(main)/(blog)/post/page';
import { NextResponse as response } from 'next/server';

export default function MyPostBoxFooterIcons({ postId }) {
  console.log('받은 postId:', postId);

  // 토글 상태 관리
  const [activeTab, setActiveTab] = useState(null);

  // 버튼 PostPage를 강제로 새로고침하기 위한 state
  const [buttonKey, setButtonKey] = useState(0);

  // 댓글 변경 시 버튼 PostPage 새로고침하는 핸들러
  const handleCommentChange = () => {
    console.log('MyBlog 댓글 변경됨 - 버튼 PostPage 새로고침');
    setButtonKey(prev => prev + 1); // key 변경으로 버튼 PostPage 강제 리렌더링
  };

  // 삭제버튼 클릭 시 fetch
  const handleDelete = async postId => {
    console.log('삭제 요청 postId:', postId); //

    if (!confirm('게시글을 삭제하시겠습니까?')) return;

    // 로그인에 성공했다면 토큰이 localStorage에 저장되어 있는 구조
    // 시간에 따라 토큰이 살아있을것
    const token = localStorage.getItem('accessToken');

    // 토큰이 없을시
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    // 아날로그 fetch방식 / axios / api 인스턴스
    const response = await fetch(`http://localhost:8000/api/blog-service/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('삭제 실패');
    }

    alert('삭제되었습니다.');
  };

  return (
    <>
      {/* 버튼 라인만 post-footer에 */}
      <div className="post-footer">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            width: '100%',
          }}
        >
          {/* 좌측: PostPage 버튼 모드 */}
          <div style={{ flex: '0 0 auto' }}>
            <PostPage
              key={buttonKey}
              postId={postId}
              mode="buttons"
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onCommentChange={handleCommentChange}
            />
          </div>

          {/* 우측: 아이콘 + 관리버튼 수정/삭제버튼 */}
          <div
            className="post-icons-manage"
            style={{
              flex: '0 0 auto',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div className="share-icons">
              <button className="icon-btn blog-spi" aria-label="블로그 보내기"></button>
              <button className="icon-btn cafe-spi" aria-label="카페 보내기"></button>
              <button className="icon-btn keep-spi" aria-label="keep 보내기"></button>
              <button className="icon-btn memo-spi" aria-label="memo 보내기"></button>
              <button className="icon-btn realse-spi" aria-label="기타 보내기 펼치기"></button>
            </div>
            <div className="manage-btns">
              <a href="#" className="owner-btn">
                수정
              </a>
              <a href="#" className="owner-btn" onClick={() => handleDelete(postId)}>
                삭제
              </a>
              <a
                href="#"
                id="configBtn1"
                className="owner-btn"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                인쇄
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 토글 컨텐츠는 게시글 전체 영역 크기로 별도 표시 */}
      {activeTab && (
        <div
          style={{
            width: '100%',
            maxWidth: '920px',
            margin: '20px auto 0',
            backgroundColor: '#fff',
            border: '1px solid #eee',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <PostPage
            postId={postId}
            mode="content"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCommentChange={handleCommentChange}
          />
        </div>
      )}
    </>
  );
}
