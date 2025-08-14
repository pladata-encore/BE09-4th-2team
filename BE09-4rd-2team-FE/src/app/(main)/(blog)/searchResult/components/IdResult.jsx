import styles from '../styles/IdResult.module.css';
import Image from 'next/image';
import useSearchResults from '@/src/app/(main)/(blog)/searchResult/hooks/useSearchResults';

export default function IdResult({ query }) {
  const { results } = useSearchResults('별명.아이디', query);

  if (!results.length) return <div>검색 결과가 없습니다.</div>;

  return (
    <ul className={styles.resultList}>
      {results.map(profile => (
        <li key={profile.blogId} className={styles.profileItem}>
          <Image
            src={profile.profileImageUrl || '/default_profile.png'}
            alt={profile.nickname}
            width={56}
            height={56}
            className={styles.profileImage}
          />
          <div className={styles.profileInfo}>
            <div className={styles.nickname}>{profile.nickname}</div>
            <div className={styles.blogId}>{profile.blogId}</div>
          </div>
          <div className={styles.profileIntro}>{profile.profileIntro}</div>
        </li>
      ))}
    </ul>
  );
}
