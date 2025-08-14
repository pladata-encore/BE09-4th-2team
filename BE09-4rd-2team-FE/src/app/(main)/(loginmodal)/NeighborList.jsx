import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMyAddedNeighbors } from '@/src/app/(main)/(neighbor)/services/neighborApi';

export default function NeighborList({ UserId }) {
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('neighbors:', neighbors);
    console.log('타입:', typeof neighbors);
    console.log('길이:', neighbors.length);

    if (!UserId) return;
    const fetchNeighbors = async () => {
      try {
        const response = await getMyAddedNeighbors(1);
        setNeighbors(response.data);
      } catch (error) {
        console.error('이웃 정보를 불러오는데 실패했습니다.', error);
        setNeighbors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNeighbors();
  }, [UserId]);
  return (
    <div className="alert-card">
      <h3 style={{ margin: '0px' }}>전체 이웃</h3>
      <hr style={{ color: '#aaa' }} />
      {!neighbors || neighbors.length === 0 ? (
        <p>등록된 이웃이 없습니다.</p>
      ) : (
        <div className="neighbor-list">
          {neighbors.map(neighbor => (
            <div key={neighbor.id} className="neighbor-card">
              <img
                src={neighbor.profileImageUrl}
                alt={neighbor.nickname}
                className="profile-image"
              />
              <span>{neighbor.nickname}</span>
            </div>
          ))}
        </div>
      )}
      <Link href="/neighborHome">이웃 관리</Link>
    </div>
  );
}
