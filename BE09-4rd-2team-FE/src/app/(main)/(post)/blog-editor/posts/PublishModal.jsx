'use client';

import { useState } from 'react';

export default function PublishModal({
  title,
  content,
  category,
  mainTopic,
  subTopic,
  visibility,
  allowComment,
  allowLike,
  allowSearch,
  onConfirm,
  onClose,
  loading,
}) {
  return (
    <div className="publish-modal">
      <h2>발행 전 확인</h2>

      <div>
        <label>제목: </label>
        <input type="text" value={title || ''} readOnly />
      </div>
      <div>
        <label>내용: </label>
        <textarea value={content || ''} readOnly />
      </div>
      <div>
        <label>카테고리: </label>
        <input type="text" value={category || ''} readOnly />
      </div>
      <div>
        <label>주제: </label>
        <input type="text" value={`${mainTopic} - ${subTopic}`} readOnly />
      </div>
      <div>
        <label>공개 설정: </label>
        <input type="text" value={visibility} readOnly />
      </div>
      <div>
        <label>댓글 허용: </label>
        <input type="text" value={allowComment ? '허용' : '비허용'} readOnly />
      </div>
      <div>
        <label>공감 허용: </label>
        <input type="text" value={allowLike ? '허용' : '비허용'} readOnly />
      </div>
      <div>
        <label>검색 허용: </label>
        <input type="text" value={allowSearch ? '허용' : '비허용'} readOnly />
      </div>

      <hr />

      <button onClick={onClose}>닫기</button>
      <button onClick={onConfirm} disabled={loading}>
        {loading ? '발행 중...' : '최종 발행'}
      </button>
    </div>
  );
}
