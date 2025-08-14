'use client';

import React, { useRef } from 'react';

export default function UploadImage({ onUpload }) {
  const fileInputRef = useRef(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BLOG; // ← 여기에 .env.local 값이 들어옵니다

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      // 1) 호출할 API 경로 포트 변경
      const response = await fetch(`${API_BASE}/ftp/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();
      // data.imageUrls: [원본URL], data.thumbnailUrl: 썸네일URL
      const editorUrl = data.imageUrls[0];
      const thumbnailUrl = data.thumbnailUrl;

      console.log('업로드 완료:', editorUrl, thumbnailUrl);

      // 2) onUpload 콜백에 객체로 넘겨주기
      onUpload?.({ editorUrl, thumbnailUrl });
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류 발생');
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button
        onClick={triggerFileSelect}
        style={{
          minWidth: '40px',
          height: '54px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          textAlign: 'center',
          padding: 0,
        }}
      >
        <span className="bg-photo" />
        <span style={{ fontSize: 12, color: '#666', marginTop: 4, lineHeight: 1.2 }}>사진</span>
      </button>
    </>
  );
}
