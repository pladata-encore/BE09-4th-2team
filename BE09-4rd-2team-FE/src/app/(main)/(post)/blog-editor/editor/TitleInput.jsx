'use client';

import { useRef } from 'react';
import './Title.css';

export default function TitleInput({ title, setTitle, contentRef }) {
  const ref = useRef(null);

  const handleBlur = e => {
    const text = e.currentTarget.innerText.trim();
    if (text === '') {
      e.currentTarget.innerHTML = '';
    }
    setTitle(text); // 제목은 setTitle로만!
  };

  // 엔터키 누르면 contentRef로 포커스 이동
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 줄바꿈 막기
      if (contentRef?.current) {
        contentRef.current.focus();
      }
    }
  };

  return (
    <div
      ref={ref}
      className="se_title"
      contentEditable
      suppressContentEditableWarning
      data-placeholder="제목"
      onBlur={handleBlur} //       {/* oninput으로 하면 글자가 깨져 onBLur로 해야함 */}
      onKeyDown={handleKeyDown}
    >
      {title}
    </div>
  );
}
