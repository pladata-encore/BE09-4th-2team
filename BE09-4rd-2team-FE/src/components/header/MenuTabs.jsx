'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './MenuTabs.module.css';

const menuItems = [
  { name: '블로그 홈', href: '/' },
  { name: '주제별 보기', href: '/category' },
  { name: '글쓰기', href: '/blog-editor' },
];

export default function MenuTabs() {
  const pathname = usePathname();

  return (
    <div>
      <nav className={styles.menuBar}>
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.menuLink} ${isActive ? styles.menuLinkActive : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
