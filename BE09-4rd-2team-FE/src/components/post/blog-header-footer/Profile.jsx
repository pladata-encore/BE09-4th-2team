import React, { useState } from 'react';
import './Profile.css';

export default function Profile({ profileData }) {
  const [isOpen, setIsOpen] = useState(true);

  /* 🗝️ 프로필 데이터 받아오기 */
  const { blogTitle, nickname, blogId, profileIntro, profileImageUrl } = profileData;

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="profile-area">
      <div className="profile-left">
        <img
          className="profile-img"
          src="https://ssl.pstatic.net/static/blog/m/img_default.gif"
          alt="프로필"
        />
        <div className="profile-info">
          <div className="profile-nickame">나는누구인가</div>
          <div className="profile-id">아이디</div>
          <div className="profile-badges">
            <a href="#">
              <img src="https://blogimgs.pstatic.net/blog20/tag/tag_edit.gif" alt="edit" />
            </a>
            <span className="profile-link">
              프로필 <span className="profile-arrow">▸</span>
            </span>
          </div>
        </div>
      </div>
      <div className="profile-center">
        <div className="profile-category">
          <div className="category-title" onClick={handleToggle} style={{ cursor: 'pointer' }}>
            <b className="title-category">카테고리</b>
            <span
              className={`category-arrow${!isOpen ? ' rotated' : ''}`}
              style={{ marginLeft: 8 }}
            >
              ⌄
            </span>
          </div>
          {isOpen && (
            <ul className="category-list">
              <li>
                <span className="category-all">
                  전체보기 <span className="category-count">(1)</span>
                  <a href="#">
                    <img src="https://blogimgs.pstatic.net/skin/b1/btn_edit.gif" alt="edit" />
                  </a>
                </span>
              </li>
              <li>
                <span className="category-board">
                  게시판 <span className="category-count">(1)</span>
                  <img
                    src="https://blogimgs.pstatic.net/nblog/ico_new.gif"
                    alt="new"
                    width={10}
                    height={10}
                    style={{ marginTop: '2px' }}
                  />
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="second-area">
        <div className="activity-title">
          <b className="title-info">활동정보</b>
        </div>
        <ul className="activity-list">
          <li>
            블로그 이웃 <b>0</b>명
          </li>
          <li>
            글 보내기 <b>0</b>회
          </li>
          <li>
            글 스크랩 <b>0</b>회
          </li>
        </ul>
      </div>
      <div className="third-area">
        <div className="profile-rss">
          <span>RSS 2.0 | RSS 1.0 | ATOM 0.3</span>
        </div>
      </div>
      <div className="fourth-area">
        <div className="profile-search">
          <div className="search-box">
            <input type="text" placeholder="검색" className="search-input" />
            <button className="search-btn" aria-label="검색"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
