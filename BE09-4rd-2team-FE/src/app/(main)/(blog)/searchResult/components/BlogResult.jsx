import styles from '../styles/BlogResult.module.css'; // 기존 스타일 재사용
import Image from 'next/image';
import useSearchResults from '@/src/app/(main)/(blog)/searchResult/hooks/useSearchResults';

export default function BlogResult({ query }) {
  const { results } = useSearchResults('블로그', query);

  if (!results.length) return <div>검색 결과가 없습니다.</div>;

  return (
    <ul className={styles.resultList}>
      {results.map(blog => (
        <li key={blog.blogId} className={styles.blogItem}>
          <div className={styles.cardRow}>
            {/* 왼쪽: 텍스트 블록 */}
            <div className={styles.cardContent}>
              {/* 상단: 블로그 타이틀 */}
              <div className={styles.titleLink} style={{ marginBottom: 12 }}>
                {blog.blogTitle}
              </div>
              {/* 프로필 소개 */}
              <div className={styles.contentLink} style={{ marginBottom: 32 }}>
                {blog.profileIntro}
              </div>
              {/* 하단: 프로필 이미지 & 닉네임 */}
              <div className={styles.profileRow}>
                <Image
                  src={blog.profileImageUrl || '/default_profile.png'}
                  alt={blog.nickname}
                  width={32}
                  height={32}
                  className={styles.profileImage}
                />
                <span className={styles.nickname}>{blog.nickname}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
