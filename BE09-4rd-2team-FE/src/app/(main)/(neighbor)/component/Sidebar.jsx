import { useState } from 'react';

export default function Sidebar({ setSelectedTab }) {
  return (
    <div className="sidebar">
      <div className="sidebar-section" style={{ borderTop: '0' }}>
        <div className="sidebar-title">기본 정보 관리</div>
        <ul>
          <li className="sidebar-content" onClick={() => setSelectedTab('blogInfo')}>
            블로그 정보
          </li>
          <li className="sidebar-content">기본 서체 설정</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">사생활 보호</div>
        <ul>
          <li className="sidebar-content">블로그 초기화</li>
          <li className="sidebar-content">방문집계 보호 설정</li>
          <li className="sidebar-content">콘텐츠 공유 설정</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">스팸 차단 관리</div>
        <ul>
          <li className="sidebar-content" onClick={() => setSelectedTab('blocked')}>
            차단 설정
          </li>
          <li className="sidebar-content">차단된 글목록</li>
          <li className="sidebar-content">댓글·안부글 권한</li>
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-title">이웃 관리</div>
        <ul>
          <li className="sidebar-content" onClick={() => setSelectedTab('add')}>
            내가 추가한 이웃
          </li>
          <li className="sidebar-content" onClick={() => setSelectedTab('addedMe')}>
            나를 추가한 이웃
          </li>
          <li className="sidebar-content" onClick={() => setSelectedTab('addedMutual')}>
            서로이웃 신청
          </li>
        </ul>
      </div>
      <div className="bottom-section">공지사항</div>
      <div className="bottom-section">블로그 이용 Tip</div>
      <div className="bottom-section">블로그 스마트봇</div>
    </div>
  );
}
