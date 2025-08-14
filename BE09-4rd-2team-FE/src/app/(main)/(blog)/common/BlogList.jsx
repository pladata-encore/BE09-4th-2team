import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogList.module.css';

export default function BlogList({ blogs, pageable = {}, onPageChange }) {
  // 페이지네이션
  const { totalPages = 1, number = 0, first = true, last = true } = pageable;

  return (
    <div className={styles.blogList}>
      {blogs.map(blog => (
        <div key={blog.postId} className={styles.blogItem}>
          {/* 카드 전체를 flex로 묶음 */}
          <div className={styles.cardRow}>
            {/* 왼쪽: 텍스트 영역 */}
            <div className={styles.cardContent}>
              {/* 프로필(작성자) 영역 */}
              <div className={styles.profileRow}>
                <Link href={`/blogDetail/${blog.postId}`}>
                  <Image
                    src={blog.profileImageUrl}
                    alt="프로필 이미지"
                    width={35}
                    height={35}
                    className={styles.profileImage}
                  />
                </Link>
                <div>
                  <Link href={`/blogDetail/${blog.postId}`} className={styles.authorName}>
                    {blog.nickname}
                  </Link>
                  <div className={styles.authorDate}>
                    {(() => {
                      const d = new Date(blog.publishedAt);
                      return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
                    })()}
                  </div>
                </div>
              </div>
              {/* 블로그 제목 및 내용 영역 */}
              <div>
                <Link href={`/blogDetail/${blog.postId}`} className={styles.titleLink}>
                  {blog.title}
                </Link>
                <Link href={`/blogDetail/${blog.postId}`} className={styles.contentLink}>
                  {blog.content}
                </Link>
              </div>
              {/* 좋아요/댓글 수 영역 */}
              <div className={styles.metaRow}>
                <span className={styles.metaItem}>공감 {blog.likeCount}</span>
                <span className={styles.metaItem}>댓글 {blog.commentCount}</span>
              </div>
            </div>
            {/* 오른쪽: 썸네일 이미지 영역 */}
            <Link className={styles.thumbnailBox} href={`/blogDetail/${blog.postId}`}>
              <Image
                src={blog.thumbnailImageUrl}
                alt="블로그 썸네일"
                width={70}
                height={70}
                className={styles.thumbnailImage}
              />
            </Link>
          </div>
        </div>
      ))}
      {/* 페이지네이션 */}
      <div className={styles.pagination}>
        <button disabled={first} onClick={() => !first && onPageChange(number - 1)}>
          이전
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={idx === number ? styles.activePage : ''}
            onClick={() => onPageChange(idx)}
            disabled={idx === number}
          >
            {idx + 1}
          </button>
        ))}
        <button disabled={last} onClick={() => !last && onPageChange(number + 1)}>
          다음
        </button>
      </div>
    </div>
  );
}
