'use client';

import React from 'react';

export default function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '50px', // 원하는 위치
          right: '0', // 오른쪽 고정
        }}
      >
        {children}
      </div>
    </div>
  );
}
