'use client';

import { useState, useEffect } from 'react';
import api from '@/src/lib/axios'; // 전역 api 인스턴스 사용 (JWT 인터셉터 포함)
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ postId = 1, onCommentChange }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  // 댓글 목록 조회
  const fetchComments = async () => {
    try {
      setLoading(true);
      // 전역 api 인스턴스 사용 (자동으로 JWT 토큰 추가됨)
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data.comments || []);
      return response.data.totalCount;
    } catch (error) {
      console.error('댓글 조회 에러:', error);
      if (error.response) {
        console.error('응답 에러:', error.response.status, error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 댓글 목록 조회
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 전역 댓글 변경 알림 함수 (댯굴 뵨굥 사 모든 PostPage에 알림)
  const notifyCommentChange = async () => {
    const newCommentCount = await fetchComments(); // 댓글 수 받기

    if (onCommentChange) {
      onCommentChange(newCommentCount); // 댓글 수 전달
    }

    window.dispatchEvent(
      new CustomEvent('commentChanged', {
        detail: {
          postId,
          commentCount: newCommentCount, // 댓글 수 포함
        },
      }),
    );
  };

  // 댓글 작성
  const handleAddComment = async (content, isSecret) => {
    try {
      // 전역 api 인스턴스 사용 (자동으로 JWT 토큰 추가됨)
      const response = await api.post(`/posts/${postId}/comments`, {
        content: content,
        isSecret: isSecret || false,
      });

      if (response.status === 201 || response.status === 200) {
        await notifyCommentChange();
      }
    } catch (error) {
      console.error('댓글 작성 에러:', error);
      if (error.response) {
        console.error('응답 에러:', error.response.status, error.response.data);
      }
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 댓글 공감 - JWT 토큰이 자동으로 포함됨!
  const handleLikeComment = async commentId => {
    try {
      // 전역 api 인스턴스 사용 (자동으로 JWT 토큰 추가됨)
      const response = await api.post(`/comments/${commentId}/like`);

      if (response.status === 200) {
        await fetchComments();
      }
    } catch (error) {
      console.error('댓글 공감 에러:', error);
      if (error.response) {
        console.error('응답 에러:', error.response.status, error.response.data);
      }
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async commentId => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      // 전역 api 인스턴스 사용 (자동으로 JWT 토큰 추가됨)
      const response = await api.delete(`/comments/${commentId}`);

      if (response.status === 204 || response.status === 200) {
        await notifyCommentChange();
        alert('댓글이 삭제되었습니다.');
      }
    } catch (error) {
      console.error('댓글 삭제 에러:', error);
      if (error.response) {
        console.error('응답 에러:', error.response.status, error.response.data);
      }
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>댓글을 불러오는 중...</div>;
  }

  return (
    <div
      style={{
        maxWidth: '920px',
        margin: '10px auto',
        padding: '20px',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 댓글 목록 */}
      <CommentList
        comments={comments}
        onLikeComment={handleLikeComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* 페이지네이션 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px',
        }}
      >
        <span
          style={{
            padding: '2px 1px',
            border: '1px solid #ddd',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '4px',
            fontSize: '14px',
            minWidth: '36px',
            height: '32px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          1
        </span>
      </div>

      {/* 댓글 작성 폼 */}
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default CommentSection;
