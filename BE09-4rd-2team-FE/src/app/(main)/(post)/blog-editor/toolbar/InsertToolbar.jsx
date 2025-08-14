'use client';

import React, { useState, useRef } from 'react';
import './Sprite.css';
import UploadImage from '../../../../../components/uploadimage/UploadImage';

// 좌측 삽입 도구
const leftTools = [
  { key: 'photo', sprite: 'bg-photo', label: '사진' },
  { key: 'mybox', sprite: 'bg-mybox', label: 'MYBOX' },
  { key: 'video', sprite: 'bg-video', label: '동영상' },
  { key: 'sticker', sprite: 'bg-sticker', label: '스티커' },
  { key: 'divider', sprite: 'bg-divider', label: '구분선' },
  { key: 'location', sprite: 'bg-location', label: '장소' },
  { key: 'material', sprite: 'bg-formula', label: '음악' },
  { key: 'statistics', sprite: 'bg-sourcecode', label: '쇼핑' },
  { key: 'source', sprite: 'bg-sourcecode', label: '소스코드' },
  { key: 'table', sprite: 'bg-table', label: '표' },
  { key: 'formula', sprite: 'bg-formula', label: '수식' },
  { key: 'template', sprite: 'bg-review', label: '내돈내산' },
];

// 우측 관리 도구
const rightTools = [
  { key: 'clip', sprite: 'bg-myclip', label: '내클립' },
  { key: 'quote', sprite: 'bg-quote', label: '글감' },
  { key: 'library', sprite: 'bg-library', label: '라이브러리' },
  { key: 'template', sprite: 'bg-template', label: '템플릿' },
];

export function Toolbar({ setContent }) {
  // 상태 훅 추가
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleImageUpload = ({ editorUrl, thumbnailUrl: thumbUrl }) => {
    console.log('삽입할 이미지 URL:', editorUrl);
    // 1) 에디터 본문에 이미지 삽입
    setContent(prev => prev + `<img src="${editorUrl}" alt="업로드 이미지" />`);
    // 2) 썸네일이 아직 설정되지 않았다면 저장
    setThumbnailUrl(prev => prev || thumbUrl);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fff',
        borderBottom: '1px solid #ddd',
        height: '52px',
      }}
    >
      {/* 좌측 도구 */}
      <ul style={{ display: 'flex', gap: '4px', padding: 0, margin: 0, listStyle: 'none' }}>
        {leftTools.map(tool =>
          tool.key === 'photo' ? (
            <li key="photo">
              <UploadImage onUpload={handleImageUpload} />
            </li>
          ) : (
            <li key={tool.key}>
              <button
                style={{
                  minWidth: '40px',
                  height: '52px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span className={tool.sprite} />
                <span
                  style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '4px',
                    lineHeight: 1.2,
                  }}
                >
                  {tool.label}
                </span>
              </button>
            </li>
          ),
        )}
      </ul>

      {/* 우측 도구 */}
      <ul
        style={{
          display: 'flex',
          gap: '4px',
          padding: 0,
          margin: 0,
          listStyle: 'none',
        }}
      >
        {rightTools.map(tool => (
          <li key={tool.key}>
            <button
              style={{
                minWidth: '40px',
                height: '52px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span className={tool.sprite} />
              <span
                style={{
                  fontSize: '12px',
                  color: '#666',
                  marginTop: '4px',
                  lineHeight: 1.2,
                }}
              >
                {tool.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
