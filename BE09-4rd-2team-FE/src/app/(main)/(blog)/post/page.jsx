'use client';

import { useEffect, useState } from 'react';
import api from '@/src/lib/axios';
import CommentSection from '@/src/components/comment/CommentSection';
import SympathyList from '@/src/app/(main)/(blog)/sympathyList/page';

export default function PostPage({
  postId = 1,
  mode = 'full', // 'buttons' | 'content' | 'full'
  activeTab,
  onTabChange,
  onDataUpdate,
  onCommentChange,
}) {
  const [localActiveTab, setLocalActiveTab] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [sympathyCount, setSympathyCount] = useState(0);
  const [commentCount, setCommentCount] = useState(null);

  // mode가 'full'일 때는 내부 상태 사용, 아니면 외부 props 사용
  const currentActiveTab = mode === 'full' ? localActiveTab : activeTab;
  const setActiveTab = mode === 'full' ? setLocalActiveTab : onTabChange;

  useEffect(() => {
    fetchPostData();

    // 전역 댓글 변경 이벤트 리스너 등록
    const handleCommentChanged = event => {
      const { postId: changedPostId, commentCount: newCommentCount } = event.detail;
      if (changedPostId === postId) {
        if (newCommentCount !== undefined) {
          setCommentCount(newCommentCount); // API 호출 없이 업데이트
        } else {
          fetchPostData(); // fallback
        }
      }
    };

    window.addEventListener('commentChanged', handleCommentChanged);

    // 클린업
    return () => {
      window.removeEventListener('commentChanged', handleCommentChanged);
    };
  }, [postId, mode]);

  const fetchPostData = async () => {
    try {
      // 공감 상태 조회
      const likeResponse = await api.get(`/posts/${postId}/like/status`);
      setIsLiked(likeResponse.data.isLiked);
      setSympathyCount(likeResponse.data.likeCount);

      // 댓글 수 조회
      const commentResponse = await api.get(`/posts/${postId}/comments`);
      setCommentCount(commentResponse.data.totalCount);

      // 외부에 데이터 업데이트 알림 (mode가 'buttons'일 때)
      if (mode === 'buttons' && onDataUpdate) {
        onDataUpdate({
          isLiked: likeResponse.data.isLiked,
          sympathyCount: likeResponse.data.likeCount,
          commentCount: commentResponse.data.totalCount,
        });
      }
    } catch (error) {
      console.error('게시글 데이터 로드 실패: ', error);
    }
  };

  // 공감 버튼 클릭 핸들러
  const handleLikeClick = async e => {
    e.stopPropagation();

    try {
      const response = await api.post(`/posts/${postId}/like`);
      setIsLiked(response.data.isLiked);
      setSympathyCount(response.data.likeCount);

      // 외부에 데이터 업데이트 알림
      if (mode === 'buttons' && onDataUpdate) {
        onDataUpdate({
          isLiked: response.data.isLiked,
          sympathyCount: response.data.likeCount,
          commentCount,
        });
      }
    } catch (error) {
      console.error('공감 처리 실패:', error);
      if (error.response && error.response.status === 500) {
        alert('로그인이 필요합니다.');
      }
    }
  };

  // 댓글 변경 시 업데이트
  const handleCommentChange = newCommentCount => {
    if (newCommentCount !== undefined) {
      setCommentCount(newCommentCount); // API 호출 없이 업데이트
    } else {
      fetchPostData(); // fallback
    }

    if (onCommentChange) {
      onCommentChange();
    }
  };

  // 댓글 버튼 텍스트 동적 생성 (네이버 방식)
  const getCommentButtonText = () => {
    if (commentCount === null) {
      return '댓글'; // 로딩 중
    }

    if (commentCount === 0) {
      return '댓글 쓰기';
    } else {
      return `댓글 ${commentCount}`;
    }
  };

  // NEW 배지 표시 여부
  const showNewBadge = commentCount > 0;

  // 버튼만 렌더링 (mode === 'buttons')
  if (mode === 'buttons') {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {/* 공감 버튼 */}
        <button
          onClick={() => {
            const newTab = activeTab === 'sympathy' ? null : 'sympathy';
            onTabChange(newTab);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: activeTab === 'sympathy' ? '#f8f9fa' : '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <span onClick={handleLikeClick} style={{ fontSize: '16px', cursor: 'pointer' }}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span>공감 {sympathyCount}</span>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {activeTab === 'sympathy' ? '▲' : '▼'}
          </span>
        </button>

        {/* 댓글 버튼 */}
        <button
          onClick={() => {
            const newTab = activeTab === 'comments' ? null : 'comments';
            onTabChange(newTab);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: activeTab === 'comments' ? '#f8f9fa' : '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <span>💬</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {getCommentButtonText()}
            {showNewBadge && (
              <span
                style={{
                  fontSize: '10px',
                  backgroundColor: '#ff4757',
                  color: 'white',
                  padding: '2px 4px',
                  borderRadius: '2px',
                  fontWeight: 'bold',
                }}
              >
                NEW
              </span>
            )}
          </span>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {activeTab === 'comments' ? '▲' : '▼'}
          </span>
        </button>
      </div>
    );
  }

  // 토글 컨텐츠만 렌더링 (mode === 'content') - 버튼 없이
  if (mode === 'content') {
    return (
      <div style={{ padding: '20px' }}>
        {activeTab === 'sympathy' && <SympathyList postId={postId} />}

        {activeTab === 'comments' && (
          <CommentSection postId={postId} onCommentChange={handleCommentChange} />
        )}
      </div>
    );
  }

  // 전체 렌더링 (mode === 'full' - 기존 방식)
  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '10px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 공감/댓글 버튼 영역 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {/* 공감 버튼 */}
        <button
          onClick={() => {
            setActiveTab(currentActiveTab === 'sympathy' ? null : 'sympathy');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: currentActiveTab === 'sympathy' ? '#f8f9fa' : '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <span
            onClick={e => {
              e.stopPropagation();
              handleLikeClick(e);
            }}
            style={{ fontSize: '16px', cursor: 'pointer' }}
          >
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span>공감 {sympathyCount}</span>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {currentActiveTab === 'sympathy' ? '▲' : '▼'}
          </span>
        </button>

        {/* 댓글 버튼 */}
        <button
          onClick={() => setActiveTab(currentActiveTab === 'comments' ? null : 'comments')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 12px',
            border: '1px solid #ddd',
            backgroundColor: currentActiveTab === 'comments' ? '#f8f9fa' : '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#333',
          }}
        >
          <span>💬</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {getCommentButtonText()}
            {showNewBadge && (
              <span
                style={{
                  fontSize: '10px',
                  backgroundColor: '#ff4757',
                  color: 'white',
                  padding: '2px 4px',
                  borderRadius: '2px',
                  fontWeight: 'bold',
                }}
              >
                NEW
              </span>
            )}
          </span>
          <span style={{ fontSize: '12px', color: '#999' }}>
            {currentActiveTab === 'comments' ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {/* 토글 컨텐츠 영역 */}
      {currentActiveTab === 'sympathy' && (
        <div style={{ marginTop: '20px' }}>
          <SympathyList postId={postId} />
        </div>
      )}

      {currentActiveTab === 'comments' && (
        <div style={{ marginTop: '20px' }}>
          <CommentSection postId={postId} onCommentChange={handleCommentChange} />
        </div>
      )}
    </div>
  );
}
