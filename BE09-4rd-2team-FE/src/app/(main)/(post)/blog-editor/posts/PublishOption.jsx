'use client';

import React, { useState } from 'react';
import './PublishOptions.css';

export default function PublishOptions({
  onClose,
  onOpenSubject,
  selectedSubject,
  onPublish,
  loading,
}) {
  // 상태 관리
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');
  const [allowComment, setAllowComment] = useState(true);
  const [allowLike, setAllowLike] = useState(true);
  const [allowSearch, setAllowSearch] = useState(true);

  const handlePublish = () => {
    onPublish({
      category,
      visibility,
      allowComment,
      allowLike,
      allowSearch,
    });
  };

  return (
    <div className="publish-options">
      <h3 className="title">발행 설정</h3>

      {/* 카테고리 선택 */}
      <div className="option-row">
        <label className="label">카테고리</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">게시판</option>
          <option value="NOTICE">공지사항</option>
          <option value="DAILY">일상</option>
        </select>
      </div>

      {/* 주제 선택 */}
      <div className="option-row">
        <label className="label">주제</label>
        <button type="button" className="subject-trigger" onClick={onOpenSubject}>
          {selectedSubject} &gt;
        </button>
      </div>

      {/* 공개 설정 */}
      <div className="option-row">
        <label className="label">공개 설정</label>
        <div className="checkbox-group">
          <label>
            <input
              type="radio"
              name="visibility"
              value="PUBLIC"
              checked={visibility === 'PUBLIC'}
              onChange={() => setVisibility('PUBLIC')}
            />
            전체공개
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="NEIGHBOR"
              checked={visibility === 'NEIGHBOR'}
              onChange={() => setVisibility('NEIGHBOR')}
            />
            이웃공개
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="MUTUAL"
              checked={visibility === 'MUTUAL'}
              onChange={() => setVisibility('MUTUAL')}
            />
            서로이웃공개
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="PRIVATE"
              checked={visibility === 'PRIVATE'}
              onChange={() => setVisibility('PRIVATE')}
            />
            비공개
          </label>
        </div>
      </div>

      {/* 발행 설정 */}
      <div className="option-row">
        <label className="label">발행 설정</label>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={allowComment}
              onChange={e => setAllowComment(e.target.checked)}
            />
            댓글 허용
          </label>
          <label>
            <input
              type="checkbox"
              checked={allowLike}
              onChange={e => setAllowLike(e.target.checked)}
            />
            공감 허용
          </label>
          <label>
            <input
              type="checkbox"
              checked={allowSearch}
              onChange={e => setAllowSearch(e.target.checked)}
            />
            검색 허용
          </label>
          <label>
            <input type="checkbox" disabled /> 블로그카페 공유 링크 허용
          </label>
          <label>
            <input type="checkbox" disabled /> 일부 공유 허용
          </label>
        </div>
      </div>

      {/* 태그 입력 */}
      <div className="option-row">
        <label className="label">태그 편집</label>
        <input type="text" placeholder="#태그 입력 (최대 30개)" />
      </div>

      {/* 발행 시간 */}
      <div className="option-row">
        <label className="label">발행 시간</label>
        <div className="checkbox-group">
          <label>
            <input type="radio" name="time" defaultChecked /> 현재
          </label>
          <label>
            <input type="radio" name="time" disabled /> 예약
          </label>
        </div>
      </div>

      {/* 공지사항 등록 */}
      <div className="option-row">
        <label>
          <input type="checkbox" disabled /> 공지사항으로 등록
        </label>
      </div>

      {/* 닫기/발행 버튼 */}
      <div className="actions">
        <button onClick={onClose}>닫기</button>
        <button className="publish-btn" onClick={handlePublish} disabled={loading}>
          {loading ? '발행 중...' : '발행'}
        </button>
      </div>
    </div>
  );
}
