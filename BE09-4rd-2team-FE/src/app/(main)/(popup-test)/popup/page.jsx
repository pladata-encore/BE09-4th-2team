'use client';
import '../../(neighbor)/style.css';
import {
  getUserByNickname,
  insertNeighbor,
} from '@/src/app/(main)/(neighbor)/services/neighborApi';
import { useEffect, useState } from 'react';
import useUserId from '@/src/lib/useUserId';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function NeighborPopupPage() {
  const userId = useUserId();
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');

  const [targetUserId, setTargetUserId] = useState(null);

  useEffect(() => {
    if (!nickname) return;

    const fetchUser = async () => {
      try {
        const user = await getUserByNickname(nickname);
        setTargetUserId(user.id);
      } catch (err) {
        console.error('유저 조회 실패:', err);
      }
    };
    fetchUser();
  }, [nickname]);
  const handleAdd = async () => {
    try {
      await insertNeighbor(targetUserId);
      alert('이웃 추가 성공!');
      window.close();
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message || '알 수 없는 오류';

      console.error('❌ 이웃 추가 실패:', status, message);

      if (status === 400 && message.includes('이미 서로이웃')) {
        alert('이미 서로 이웃입니다.');
      } else if (status === 500 && message.includes('자기 자신')) {
        alert('자기 자신에게 이웃 요청을 보낼 수 없습니다.');
      } else {
        alert(`이웃 추가에 실패했습니다. (${message})`);
      }
    }
  };
  return (
    <div className="popup-container" style={{ padding: '30px', fontFamily: '나눔스퀘어' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>이웃추가</h2>
      <p className="popup-buddy-box">
        <strong style={{ color: '#00c73c' }}>{nickname}</strong>님을
        <label>
          <input type="radio" name="relation" defaultChecked /> 이웃
        </label>
        <label>
          <input type="radio" name="relation" /> 서로이웃
        </label>
        으로 추가합니다.
      </p>
      <p style={{ fontSize: '12px', color: '#777', lineHeight: '1.6' }}>
        이웃과 서로이웃은 무엇인가요?
        <br />
        이웃공개, 서로이웃공개 글은 누가 볼 수 있나요?
        <br />
        <strong style={{ color: '#777777' }}>블로그 이용 TIP 더보기&gt;</strong>
      </p>
      <div className="popup-bottom">
        <button className="popup-bottom-cancle" onClick={() => window.close()}>
          취소
        </button>
        <button className="popup-bottom-check" onClick={handleAdd} disabled={targetUserId === null}>
          확인
        </button>
      </div>
    </div>
  );
}
