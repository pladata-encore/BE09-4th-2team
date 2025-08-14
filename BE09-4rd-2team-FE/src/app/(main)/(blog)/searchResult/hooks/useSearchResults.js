// hooks/useSearchResults.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useSearchResults(mode, query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    let apiUrl = '';
    let params = {};
    if (mode === '글') {
      apiUrl = `${process.env.NEXT_PUBLIC_API_BLOG}/blog-service/posts/search/title`;
      params = { keyword: query };
    } else if (mode === '블로그') {
      apiUrl = `${process.env.NEXT_PUBLIC_API_BLOG}/blog-service/posts/search/blogtitle`;
      params = { blogTitle: query };
    } else if (mode === '별명.아이디') {
      apiUrl = `${process.env.NEXT_PUBLIC_API_BLOG}/blog-service/posts/search/nickname`;
      params = { nickname: query };
    }
    if (apiUrl) {
      axios
        .get(apiUrl, { params })
        .then(res => setResults(res.data.data ?? []))
        .finally(() => setLoading(false));
    }
  }, [mode, query]);
  return { results, loading };
}
