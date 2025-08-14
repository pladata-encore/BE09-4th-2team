import React, { useState } from 'react';
import './PostMetaAction.css';
import Link from 'next/link';

export default function MetaActions({ onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // 이웃 상태: NONE → NEIGHBOR → MUTUAL
  const [neighborStatus, setNeighborStatus] = useState('NONE');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 🗝️ 이웃 상태 핸들링
  const handleNeighborClick = async () => {
    if (neighborStatus === 'NONE') {
      // 예: 이웃 추가 신청 API
      // await addNeighbor();
      console.log('상태: 이웃');
      setNeighborStatus('NEIGHBOR');
    } else if (neighborStatus === 'NEIGHBOR') {
      // 예: 서로이웃 신청 API
      // await requestMutualNeighbor();
      console.log('상태: 서로이웃');
      setNeighborStatus('MUTUAL');
    } else {
      // 이미 서로이웃이면 아무 동작 안 함
      console.log('이미 서로이웃');
    }
  };

  // 버튼 텍스트
  let buttonText = '+이웃추가';
  if (neighborStatus === 'NEIGHBOR') buttonText = '이웃';
  if (neighborStatus === 'MUTUAL') buttonText = '서로이웃';

  return (
    <div className="post-meta-actions">
      <button className="copy-url">URL 복사</button>

      {/* 🗝️이웃 추가 버튼 */}
      <button className="neighbor-button" onClick={handleNeighborClick}>
        <Link href="/popup">{buttonText}</Link>
      </button>
    </div>
  );
}
