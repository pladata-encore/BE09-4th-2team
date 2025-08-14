import styles from '../styles/ContentResult.module.css';
import Link from 'next/link';
import Image from 'next/image';
import useSearchResults from '@/src/app/(main)/(blog)/searchResult/hooks/useSearchResults';

export default function ContentResult({ query }) {
  const { results } = useSearchResults('글', query);

  if (!results.length) return <div>검색 결과가 없습니다.</div>;

  return (
    <ul className={styles.resultList}>
      {results.map(post => (
        <li key={post.postId} className={styles.blogItem}>
          <div className={styles.cardRow}>
            {/* 왼쪽: 텍스트 블록 */}
            <div className={styles.cardContent}>
              <Link href={`/posts/${post.postId}`} className={styles.titleLink}>
                {post.title}
              </Link>
              <Link href={`/posts/${post.postId}`} className={styles.contentLink}>
                {post.content}
              </Link>
              <div className={styles.profileRow}>
                <Image
                  src={post.profileImageUrl || '/default_profile.png'}
                  alt={post.nickname}
                  width={32}
                  height={32}
                  className={styles.profileImage}
                />
                <span className={styles.nickname}>{post.nickname}</span>
                <span className={styles.profileDivider}>|</span>
                <span className={styles.profileEtc}>{post.blogTitle}</span>
                <span className={styles.profileDivider}>|</span>
                <span className={styles.authorDate}>
                  {post.createdAt &&
                    (() => {
                      const d = new Date(post.publishedAt);
                      return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
                    })()}
                </span>
              </div>
            </div>
            {/* 오른쪽: 썸네일 이미지 */}
            {post.thumbnailImageUrl && (
              <Link className={styles.thumbnailBox} href={`/posts/${post.postId}`}>
                <Image
                  src={post.thumbnailImageUrl}
                  alt=""
                  width={160}
                  height={160}
                  className={styles.thumbnailImage}
                />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
