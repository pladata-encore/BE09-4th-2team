import MenuTabs from '@/src/components/header/MenuTabs';
import Header from '@/src/app/(main)/searching/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
