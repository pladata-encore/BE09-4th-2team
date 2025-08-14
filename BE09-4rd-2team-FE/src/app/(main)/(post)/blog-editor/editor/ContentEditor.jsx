'use client';

// ContentEditor: 본문 입력 영역 컴포넌트
// contentRef 를 외부에서 전달받아 제목에서 포커스 이동 가능
import { useRef } from 'react';
// 본문 영역 전용 CSS
import './Content.css';

export default function ContentEditor({ content, setContent, contentRef }) {
  const ref = useRef(null);

  // 입력이 끝나고 포커스를 잃으면 내용을 저장
  const handleBlur = e => {
    const html = e.currentTarget.innerHTML.trim();
    if (html === '') {
      e.currentTarget.innerHTML = '';
    }
    setContent(html);
  };

  return (
    <div
      ref={contentRef}
      className="se_content"
      contentEditable
      suppressContentEditableWarning
      data-placeholder="나만의 일상을 기록으로 남겨보세요!"
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
