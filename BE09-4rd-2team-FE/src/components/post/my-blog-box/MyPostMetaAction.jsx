import React, { useState } from 'react';
import './MyPostMetaAction.css';

export default function MetaActions({ onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="post-meta-actions">
      <button className="copy-url">URL 복사</button>

      <button className="stats-button">
        <svg
          className="stats-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M0 0h1v16H0V0zm2 6h1v10H2V6zm2-4h1v14H4V2zm2 8h1v6H6V10zm2-4h1v10H8V6zm2-6h1v16h-1V0zm2 4h1v12h-1V4zm2 2h1v10h-1V6z" />
        </svg>
        통계
      </button>

      <div className="more-menu-wrapper">
        <button
          className="more-menu"
          onClick={toggleMenu}
          aria-haspopup="true"
          aria-expanded={menuOpen}
        >
          ⋮
        </button>

        {/* ★수정/삭제버튼 */}
        {menuOpen && (
          <div className="overflow-menu">
            <a href="#" className="menu-item modify">
              수정하기
              <img
                src="https://ssl.pstatic.net/static/blog/ico_blog_modify@2x.png"
                className="ico"
                alt="수정"
              />
            </a>
            <a href="#" className="menu-item share">
              공유하기
              <img
                src="https://ssl.pstatic.net/static/blog/ico_blog_share44x44.png"
                className="ico"
                alt="공유"
              />
            </a>
            <a href="#" className="menu-item delete">
              삭제하기
              <img
                src="https://ssl.pstatic.net/static/blog/ico_blog_del3@2x.png"
                className="ico"
                alt="삭제"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
