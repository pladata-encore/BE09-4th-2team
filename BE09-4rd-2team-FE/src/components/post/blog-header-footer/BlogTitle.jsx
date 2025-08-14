import React, { useState } from 'react';
import './BlogTitle.css';

function BlogTitle() {
  /* 🗝️닉네임 샘플 데이터 */
  const [posts, setPosts] = useState([{ nickName: '나는누구인가' }]);

  return (
    <div className="title-wrapper">
      {/* 🗝️닉네임 설정 */}
      <h1 className="blog-title">{posts[0].nickName}의 블로그</h1>
    </div>
  );
}

export default BlogTitle;
