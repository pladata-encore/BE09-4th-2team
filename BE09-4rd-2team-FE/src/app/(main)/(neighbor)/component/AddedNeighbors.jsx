'use client';
import { useState } from 'react';
import DeleteConfirmModal from '../component/DeleteConfirmModal';
import axios from 'axios';
import { useEffect } from 'react';
import {
  changeRelationNeighbors,
  deleteNeighbor,
  getMyAddedNeighbors,
} from '../services/neighborApi';
import { compileNonPath } from 'next/dist/shared/lib/router/utils/prepare-destination';
import useUserId from '@/src/lib/useUserId';

export default function AddedNeighbors() {
  const url = `${process.env.NEXT_PUBLIC_API_BLOG}/blog-service/api/neighbors/my-following/added`;
  console.log('✅ 최종 요청 URL:', url);
  const userId = useUserId();

  useEffect(() => {
    if (userId) {
      console.log('로그인한 유저 ID:', userId);
    }
  }, [userId]);
  const [activeTab, setActiveTab] = useState('list');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteOption, setDeleteOption] = useState('all');
  const [neighbors, setNeighbors] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log('요청 주소:', `${process.env.NEXT_PUBLIC_API_BLOG}/neighbors/my-following/added`);
      console.log('토큰:', localStorage.getItem('accessToken'));

      try {
        const response = await getMyAddedNeighbors();
        setNeighbors(response.data);
        console.log('neighbor.id 값:', response.data);
        console.log('🔥 response 전체:', response);
        console.log('🔥 response.data:', response.data);
      } catch (error) {
        console.error('이웃 목록 불러오기 실패:', error);
      }
    };
    fetchData();
  }, []);

  const handleIndividualCheck = id => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]));
    console.log('handle check', selectedIds);
  };
  const handleSelectAll = () => {
    if (selectedIds.length === neighbors.length) {
      setSelectedIds([]);
    } else {
      const allIds = neighbors.map(n => n.id);
      setSelectedIds(allIds);
    }
  };
  const handleDelete = async () => {
    if (selectedIds.length === 0) return alert('선택된 항목이 없습니다.');
    try {
      if (deleteOption === 'all') {
        await deleteNeighbor(selectedIds);
      } else if (deleteOption === 'mutual') {
        await changeRelationNeighbors(selectedIds);
      }
      alert('삭제 성공!');
      setSelectedIds([]);
      const res = await getMyAddedNeighbors();
      console.log('업데이트된 이웃 목록:', res.data);
      setNeighbors(res.data);
    } catch (error) {
      console.error('삭제실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };
  return (
    <div className="neighbor-content">
      <h1 className="tab-title">내가 추가한 이웃</h1>
      <div className="neighbor-tabs">
        <button
          onClick={() => setActiveTab('list')}
          className={activeTab === 'list' ? 'active' : ''}
        >
          이웃목록
        </button>
        <button
          onClick={() => setActiveTab('group')}
          className={activeTab === 'group' ? 'active' : ''}
        >
          이웃그룹
        </button>
        <button onClick={() => setActiveTab('add')} className={activeTab === 'add' ? 'active' : ''}>
          이웃추가
        </button>
      </div>
      <div className="grey-line"></div>
      <div className="first-content">
        <div className="first-content-left">
          <button>그룹이동</button>
          <button>새글소식 설정</button>
          <button>삭제</button>
          <button style={{ marginLeft: '20px' }}>열린이웃(RSS) 추가</button>
        </div>
        <div className="first-content-right">
          <span>정렬된 이웃 {neighbors.length}명</span>
          <span className="select-box">이웃 추가순</span>
        </div>
      </div>
      <div className="neighbor-table">
        <div className="table-header">
          <input type="checkbox" style={{ marginLeft: '15px' }} />
          <select className="table-box">
            <option>그룹전체</option>
          </select>
          <select className="table-box">
            <option>이웃전체</option>
          </select>
          <div className="flex-spacer" style={{ textAlign: 'center', paddingLeft: '50px' }}>
            이웃
          </div>
          <select className="table-box">
            <option>새글소식전체</option>
          </select>
          <span className="header-label">최근 글</span>
          <span className="header-label" style={{ marginLeft: '15px' }}>
            이웃가입일
          </span>
        </div>
      </div>
      {neighbors.map(neighbor => (
        <div key={neighbor.id} className="table-row">
          <input
            type="checkbox"
            style={{ marginLeft: '15px' }}
            onChange={() => handleIndividualCheck(neighbor.id)}
            checked={selectedIds.includes(neighbor.id)}
          />
          <span className="table-box">새 그룹</span>
          <span className="table-box">{neighbor.mutual ? '❤️ 서로이웃' : '🖤️이웃'}</span>
          <div style={{ width: '210px', marginLeft: '10px' }}>
            <span className="table-box">{neighbor.nickname}</span>
            <span className="bar">|</span>
            <a href="" className="table-box status-message">
              {neighbor.profileIntro}
            </a>
          </div>
          <span className="table-box" style={{ marginLeft: '107px' }}>
            ON
          </span>
          <span className="header-label" style={{ fontSize: '10px', width: '50px' }}>
            {neighbor.createdAt}
          </span>
          <span
            className="header-label"
            style={{ width: 'fit-content', fontSize: '10px', textAlign: 'right' }}
          >
            {neighbor.requestedAt}
          </span>
        </div>
      ))}

      <div className="first-content" style={{ borderTop: '1px solid #e1e1e1' }}>
        <div className="first-content-left">
          <input type="checkbox" style={{ marginLeft: '15px' }} onChange={handleSelectAll} />
          <button>그룹이동</button>
          <button>새글소식 설정</button>
          <button onClick={() => setShowDeletePopup(true)}>삭제</button>
          <button style={{ marginLeft: '20px' }}>열린이웃(RSS) 추가</button>
          {showDeletePopup && (
            <DeleteConfirmModal
              onClose={() => setShowDeletePopup(false)}
              onConfirm={handleDelete}
              deleteOption={deleteOption}
              setDeleteOption={setDeleteOption}
            />
          )}
        </div>
      </div>
    </div>
  );
}
