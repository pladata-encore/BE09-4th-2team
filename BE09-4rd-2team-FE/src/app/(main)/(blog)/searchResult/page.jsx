'use client';
import Header from '@/src/app/(main)/searching/Header';
import MenuTabs from '@/src/components/header/MenuTabs';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import OptionMenu from '@/src/app/(main)/(blog)/searchResult/OptionMenu';
import BlogResult from '@/src/app/(main)/(blog)/searchResult/components/BlogResult';
import ContentResult from '@/src/app/(main)/(blog)/searchResult/components/ContentResult';
import IdResult from '@/src/app/(main)/(blog)/searchResult/components/IdResult';

export default function SearchResult() {
  const categories = ['글', '블로그', '별명.아이디']; // Header와 일치해야 함
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode');
  const query = searchParams.get('query');

  // URL에서 넘어온 mode 값이 유효한 카테고리인지 확인 후 selected 초기화
  const defaultCategory = categories.includes(mode) ? mode : categories[0];
  const [selected, setSelected] = useState(defaultCategory);

  // URL의 mode가 변경되었을 때 상태를 동기화
  useEffect(() => {
    if (mode && categories.includes(mode)) {
      setSelected(mode);
    }
  }, [mode]);

  // OptionMenu에서 카테고리 클릭 시 URL 동기화
  const handleCategorySelect = category => {
    setSelected(category);
    // query를 유지하면서 mode만 변경
    router.push(
      `/searchResult?mode=${encodeURIComponent(category)}&query=${encodeURIComponent(query ?? '')}`,
    );
  };

  const renderComponents = {
    [categories[0]]: <ContentResult mode={selected} query={query} />,
    [categories[1]]: <BlogResult mode={selected} query={query} />,
    [categories[2]]: <IdResult mode={selected} query={query} />,
  };

  return (
    <div>
      <Header selected={selected} />
      <MenuTabs />
      <OptionMenu categories={categories} selected={selected} onSelect={handleCategorySelect} />
      {renderComponents[selected] || <div>카테고리를 선택하세요.</div>}
    </div>
  );
}
