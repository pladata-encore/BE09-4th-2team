'use client';
import React from 'react';
import BlackHeader from '@/src/components/post/blog-header-footer/BlackHeader';
import BlogTitle from '@/src/components/post/blog-header-footer/BlogTitle';
import PostBox from '@/src/components/post/other-blog-box/PostBox';

export default function OtherBlog() {
  // 🗝️ 게시글 글 데이터 입력
  const posts = [
    {
      id: 1,
      title: '첫 번째 글',
      content: '안녕하세요, 나는누구인가의 블로그입니다.',
      nickname: '나는누구인가',
    },
  ];

  // 🗝️ PostBox 샘플 데이터 입력
  const post = [
    {
      id: 2,
      category: '게시판',
      blogTitle: '기본 제목',
      nickname: '나는누구인가',
      date: '2025.6.29 13:47',
      profileImageUrl: '',
      content: `기본 텍스트 \n
                <img src="https://picsum.photos/300/200" alt="테스트 이미지" />
                기본 텍스트2
                <img src="https://picsum.photos/200" alt="테스트 이미지" />
                기본 텍스트3`,
      tags: ['프론트엔드', '리액트'],
    },
  ];

  // 🗝️ 프로필 데이터 입력
  // const profileData = {
  //   blogTitle: '기본 블로그',
  //   nickname: '나는누구인가',
  //   blogId: 1,
  //   profileIntro: '안녕하세요. 꼬미의 블로그입니다.',
  //   profileImageUrl: 'https://picsum.photos/100',
  // };
  return (
    <>
      <BlackHeader />
      <main>
        <div className="whole-border">
          {/* 🗝️블로그 타이틀 받아오기*/}
          <BlogTitle nickname={posts[0].nickname} />
          {/*<div>*/}
          {/*  <PostList posts={posts} />*/}
          {/*</div>*/}
          <div>
            {/* 🗝️ 게시글: 카테고리, 제목, 닉네임, 작성일시, 이미지, 내용, 태그 받아오기 */}
            <PostBox post={post[0]} />

            {/* 🎉 실제 댓글 시스템 연동! */}
            {/*<CommentSection postId={post.id} />*/}
          </div>
          <div>
            {/* 🗝️ 프로필 데이터 받아오기 */}
            {/*<Profile profileData={profileData} />*/}
          </div>
        </div>
      </main>
    </>
  );
}
