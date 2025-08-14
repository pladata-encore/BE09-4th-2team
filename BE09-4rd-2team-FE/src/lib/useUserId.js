import { useEffect, useState } from 'react';

export default function useUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch (e) {
        console.error('토큰 파싱 실패:', e);
      }
    }
  }, []);

  return userId;
}
