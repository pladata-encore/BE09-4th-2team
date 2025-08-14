'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlackHeader from '@/src/components/post/blog-header-footer/BlackHeader';
import BlogTitle from '@/src/components/post/blog-header-footer/BlogTitle';
import PostList from '@/src/components/post/blog-header-footer/PostList';
import Profile from '@/src/components/post/blog-header-footer/Profile';
import PostBox from '@/src/components/post/other-blog-box/PostBox';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BLOG;

export default function BlogDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    axios
      .get(`${API_BASE}/blog-service/posts/main/${postId}`)
      .then(res => setPost(res.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <div>로딩중...</div>;
  if (!post) return <div>게시글을 불러올 수 없습니다.</div>;

  // 1. BlogTitle
  // 2. PostList(이 글만 단독으로 띄우려면 [post] 전달)
  // 3. PostBox(상세 컨텐츠, 이미지 등)
  // 4. Profile(작성자/블로그 정보)

  // 예시: PostBox용 데이터 변환 (필요시)
  const postBoxData = {
    category: post.mainTopic || '카테고리없음',
    blogTitle: post.blogTitle,
    nickname: post.nickname,
    date: post.publishedAt || '', // 날짜 데이터가 있다면
    profileImageUrl: post.profileImageUrl,
    content: post.content,
    tags: post.tags || [],
    thumbnailImageUrl: post.thumbnailImageUrl,
  };

  // 예시: Profile용 데이터 변환 (필요시)
  const profileData = {
    blogTitle: post.blogTitle,
    nickname: post.nickname,
    blogId: post.blogId,
    profileIntro: post.profileIntro,
    profileImageUrl: post.profileImageUrl,
  };

  return (
    <>
      <BlackHeader />
      <main>
        <div className="whole-border">
          <BlogTitle nickname={post.nickname} />
          <div>
            {/* PostList는 여러 게시글이 아니라면 [post]로 전달 */}
            <PostList posts={[post]} />
          </div>
          <div>
            <PostBox post={postBoxData} />
          </div>
          <div>
            <Profile profileData={profileData} />
          </div>
        </div>
      </main>
    </>
  );
}
