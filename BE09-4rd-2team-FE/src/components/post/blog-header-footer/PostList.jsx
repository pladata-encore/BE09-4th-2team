'use client';
import React, { useState, useEffect } from 'react';
import './PostList.css';
import axios from 'axios';

import { useRouter } from 'next/navigation';

function PostList() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  // 목록 숨김 상태
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // 현재 페이지에 해당하는 posts만 잘라서 보여주기
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_USER}/blog-service/posts/lists`;
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPosts(response.data.data);
      } catch (error) {
        console.log('목록을 불러오는데 실패했습니다.', error);
      }
    };

    fetchPosts();
  }, []);

  // 목록 닫기 버튼 클릭 핸들러
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // 내 블로그 클릭 핸들러
  const handleDetailClick = id => {
    try {
      router.push(`http://localhost:3000/blog/my-blog?id=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 페이지 버튼 클릭 핸들러
  const handlePageClick = pageNum => {
    setCurrentPage(pageNum);
  };

  // 줄 수 변경 핸들러
  const handlePostsPerPageChange = e => {
    setPostsPerPage(Number(e.target.value));
    setCurrentPage(1); // 줄 수 바꿀 때 1페이지로 이동
  };
  <span style="font-weight: bold;">프롤로그</span> | <span style="font-weight: bold;">블로그</span>;
  return (
    <div>
      <div className="menus">
        <div className="menu1">
          <ul>
            <li>
              <a href="#" className="link">
                프롤로그
              </a>
              <img src="https://blogimgs.pstatic.net/nblog/spc.gif" className="bar"></img>
            </li>
            <li>
              <a href="#" className="link blog-link">
                블로그
              </a>
            </li>
          </ul>
        </div>
        <div className="menu2">
          <ul>
            <li>
              <a href="#" className="link">
                지도
              </a>
              <img src="https://blogimgs.pstatic.net/nblog/spc.gif" className="bar"></img>
            </li>
            <li>
              <a href="#" className="link">
                서재
              </a>
              <img src="https://blogimgs.pstatic.net/nblog/spc.gif" className="bar"></img>
            </li>
            <li>
              <a href="#" className="link">
                안부
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="post-list-table">
        <div className="post-list-header">
          <span className="post-list-title">
            <span className="clickable-title" onClick={handleCollapse}>
              전체보기
            </span>{' '}
            <span className="post-count">{posts.length}개의 글</span>
          </span>
          <button className="collapse-btn" onClick={handleCollapse}>
            {isCollapsed ? '목록열기' : '목록닫기'}
          </button>
        </div>
        {!isCollapsed && (
          <>
            <table>
              <thead>
                <tr>
                  <th className="title-col">글 제목</th>
                  <th className="views-col">조회수</th>
                  <th className="date-col">작성일</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map(post => (
                  <tr key={post.id} onClick={() => handleDetailClick(post.id)}>
                    <td className="title-cell">
                      <span className="main-title">{post.title}</span>
                      {post.commentCount > 0 && (
                        <span className="comment-count">({post.commentCount})</span>
                      )}
                      {post.visibility && <span className="post-tag">{post.visibility}</span>}
                    </td>
                    <td className="views-cell">{post.views}</td>
                    <td className="date-cell">{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="post-list-bottom">
              <button className="manage-btn">글관리 열기</button>
              <select
                className="row-select"
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
              >
                <option value={5}>5줄 보기</option>
                <option value={10}>10줄 보기</option>
                <option value={15}>15줄 보기</option>
                <option value={20}>20줄 보기</option>
                <option value={30}>30줄 보기</option>
              </select>
            </div>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`page-btn${num === currentPage ? ' active' : ''}`}
                  onClick={() => handlePageClick(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PostList;
