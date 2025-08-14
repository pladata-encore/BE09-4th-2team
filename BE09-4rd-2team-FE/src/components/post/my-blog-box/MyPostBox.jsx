import React from 'react';
import './MyPostBox.css';
import MyPostBoxFooterIcons from './MyPostBoxFooterIcons';
import MyPostMetaAction from './MyPostMetaAction';
import TagEditor from './TapEditor';

export default function MyPostBox({ post = {}, postId, onEdit, onDelete }) {
  const {
    category = '',
    blogTitle = '',
    nickname = '',
    date = '',
    profileImageUrl = '',
    content = '',
    tags = [],
  } = post;

  return (
    <div className="post-box">
      {/* 게시판 카테고리 */}
      <h1 className="post-category">{category}</h1>

      {/* 글 제목 */}
      <h2 className="post-title">{blogTitle}</h2>

      {/* 작성자 정보 + 우측 URL 복사 */}
      <div className="post-meta">
        <div className="post-author-info">
          <img
            src={profileImageUrl || '/assets/images/myblog/profile.png'}
            alt={`${nickname} 프로필`}
            className="profile-img2"
          />
          <span className="post-author-name">{nickname}</span>
          <span className="post-date">{date}</span>
        </div>

        {/* 메뉴/통계/복사 → 별도 컴포넌트로 대체 */}
        <MyPostMetaAction onEdit={onEdit} onDelete={onDelete} />
      </div>

      {/* HTML 콘텐츠 렌더링 */}
      {/* angerouslySetInnerHTML는 이름처럼 XSS 보안 문제가 생길 수 있으니, 실서비스라면 백엔드에서 반드시 HTML Sanitizing 처리.지금은 테스트니까 그대로 사용해도 됩니다.*/}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
      ></div>

      {/* 태그 출력+수정 */}
      <TagEditor tags={tags} />

      {/* 공감/댓글 <> 보내기/수정/삭제/설정 */}
      <MyPostBoxFooterIcons postId={postId} />
    </div>
  );
}
