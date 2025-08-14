'use client';

import React, { useState, useEffect } from 'react';
import BlackHeader from '@/src/components/post/blog-header-footer/BlackHeader';
import BlogTitle from '@/src/components/post/blog-header-footer/BlogTitle';
import Profile from '@/src/components/post/blog-header-footer/Profile';
import MyPostBox from '/src/components/post/my-blog-box/MyPostBox';
import PostList from '@/src/components/post/blog-header-footer/PostList';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MyBlog() {
  // 🗝️ MyPostBox 샘플 데이터 입력
  // 여러 게시글이라서 객체{}가 아닌 배열[]로 받아줌
  // const myPost = [
  //   {
  //     id: 1, // postId 추가
  //     category: '게시판',
  //     blogTitle: '프로젝트',
  //     nickname: '꼬미',
  //     date: '2025.6.29 13:47',
  //     profileImageUrl: '',
  //     content: '프론트엔드가 어렵다...\n\n리액트도 어렵다...\n',
  //     tags: ['프론트엔드', '리액트'],
  //   },
  // ];
  const [myPost, setMyPost] = useState(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    const fetchMyPost = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_USER}/blog-service/posts/main/` + id;
        const token = localStorage.getItem('accessToken');

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyPost(response.data.data);
        console.log('---->', myPost);
      } catch (error) {
        console.error('목록을 불러오는데 실패했습니다.', error);
      }
    };

    fetchMyPost();
  }, [id]);

  useEffect(() => {
    console.log('myPost 변경됨:', myPost);
  }, [myPost]);

  // 🗝️ 프로필 샘플 데이터 입력
  const profileData = {
    blogTitle: '꼬미의 블로그',
    nickname: '꼬미',
    blogId: 1,
    profileIntro: '안녕하세요, 꼬미입니다.',
    profileImageUrl: 'https://example.com/myimage.jpg',
  };

  // 삭제 버튼 핸들러

  return (
    <>
      <BlackHeader />
      <main>
        <div className="whole-border">
          {/* 🗝️내 블로그 타이틀 받아오기 */}
          <BlogTitle />
          <div>
            {/*  /!* 🗝️내 게시글 리스트 받아오기 *!/*/}
            <PostList />
          </div>
          ~
          <div>
            {/* 🗝️내 게시글 받아오기 */}
            {myPost && (
              <MyPostBox
                myPost={myPost}
                postId={id}
                onEdit={() => console.log('수정')}
                // 삭제 버튼 클릭 시 실행
              />
            )}
          </div>
          <div>
            {/* 🗝️ 프로필 데이터 받아오기 */}
            <Profile profileData={profileData} />
          </div>
        </div>
      </main>
    </>
  );
}
