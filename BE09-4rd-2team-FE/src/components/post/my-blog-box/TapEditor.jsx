import React, { useState } from 'react';
import './TagEditor.css';

export default function TagEditor() {
  // 태그 상태: 배열
  const [tags, setTags] = useState(['#첫글']);
  // 편집 모드 on/off
  const [isEditing, setIsEditing] = useState(false);
  // 입력창 값
  const [inputValue, setInputValue] = useState(tags.join(' '));

  // 태그 수정 모드 ON
  const handleEditClick = () => {
    setIsEditing(true);
    setInputValue(tags.join(' ')); // 현재 태그를 input에 넣기
  };

  // 취소: 편집 모드 OFF, 기존값 유지
  const handleCancelClick = () => {
    setIsEditing(false);
    setInputValue(tags.join(' '));
  };

  // 확인: 편집 내용 저장, 배열로 반영
  const handleConfirmClick = () => {
    const newTags = inputValue.split(' ').map(tag => (tag.startsWith('#') ? tag : `#${tag}`));
    setTags(newTags);
    setIsEditing(false);
  };

  return (
    <div className="tag-area">
      {!isEditing && (
        <>
          <div className="tag-list">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag-item">
                {tag}
              </span>
            ))}
          </div>
          <button className="tag-edit-btn" onClick={handleEditClick}>
            태그수정
          </button>
        </>
      )}

      {isEditing && (
        <div className="tag-edit-box">
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
          <button className="tag-cancel-btn" onClick={handleCancelClick}>
            취소
          </button>
          <button className="tag-confirm-btn" onClick={handleConfirmClick}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}
