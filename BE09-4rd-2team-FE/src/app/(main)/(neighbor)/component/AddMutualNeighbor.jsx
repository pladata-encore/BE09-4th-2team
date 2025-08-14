'use client';

import { useEffect, useState } from 'react';
import {
  acceptMultipleNeighbors,
  cancelMyRequest,
  getReceivedMutualNeighbors,
  getSentMutualNeighbors,
  rejectMultipleNeighbors,
} from '@/src/app/(main)/(neighbor)/services/neighborApi';
import useUserId from '@/src/lib/useUserId';

export default function AddMutualNeighbor() {
  const userId = useUserId();

  useEffect(() => {
    if (userId) {
      console.log('로그인한 유저 ID:', userId);
    }
  }, [userId]);

  const [activeTab, setActiveTab] = useState('received');
  const [neighbors, setNeighbors] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

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
  const fetchData = async () => {
    try {
      let response;
      if (activeTab === 'received') {
        response = await getReceivedMutualNeighbors();
      } else if (activeTab === 'sent') {
        response = await getSentMutualNeighbors();
      } else {
        return;
      }
      setNeighbors(response.data);
    } catch (error) {
      console.error('이웃 목록 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, userId]);

  const handleReject = async () => {
    try {
      await rejectMultipleNeighbors(selectedIds);
      console.log('거절 성공!');
      setSelectedIds([]);
      await fetchData();
    } catch (error) {
      console.log('거절 실패:', error);
      alert('이웃거절에 실패했습니다.');
    }
  };

  const handleAccept = async () => {
    try {
      await acceptMultipleNeighbors(selectedIds);
      console.log('수락 성공!');
      setSelectedIds([]);
      await fetchData();
    } catch (error) {
      console.log('수락 실패:', error);
      alert('이웃수락에 실패했습니다.');
    }
  };

  const handleCancel = async () => {
    try {
      await cancelMyRequest(selectedIds);
      console.log('취소 성공!');
      setSelectedIds([]);
      await fetchData();
    } catch (error) {
      console.log('취소 실패', error);
      alert('신청 취소에 실패했습니다.');
    }
  };

  return (
    <div className="neighbor-content">
      <h1 className="tab-title">서로이웃 신청</h1>
      <div className="set-buddy"></div>
      <div className="set-buddy-top" style={{ paddingTop: '10px' }}>
        <div className="set-title">서로이웃 신청받기</div>
        <div className="set-input" style={{ borderLeft: '50px' }}>
          <input name="allowMutualBuddy" className="bothBuddyAllowed" type="radio" id="r1" />
          <label htmlFor="r1" style={{ paddingLeft: '8px' }}>
            사용
          </label>
          <input name="allowMutualBuddy" className="bothBuddyDenied" type="radio" id="r2" />
          <label htmlFor="r2" style={{ paddingLeft: '8px' }}>
            사용하지 않음
          </label>
        </div>
      </div>
      <div className="set-buddy-bottom">
        <ul>
          <li style={{ listStyle: 'disc' }}>
            사용하지 않음 선택 시, 다른 사람이 서로이웃 신청을 보낼 수 없습니다.
          </li>
          <li style={{ listStyle: 'disc' }}>기존 서로이웃은 유지됩니다.</li>
        </ul>
      </div>
      <div className="set-buddy-button">
        <input className="set-buddy-button-button" type="button" value="확인" />
      </div>

      <div className="neighbor-requests">
        <div className="tab-menu">
          <button
            className={activeTab === 'received' ? 'active' : ''}
            onClick={() => setActiveTab('received')}
          >
            받은신청
          </button>
          <button
            className={activeTab === 'sent' ? 'active' : ''}
            onClick={() => setActiveTab('sent')}
          >
            보낸신청
          </button>
          <button>안내메시지</button>
        </div>
        {activeTab === 'received' && (
          <div>
            <div className="first-content">
              <div className="first-content-left">
                <button onClick={handleAccept}>수락</button>
                <button onClick={handleReject}>거절</button>
              </div>
            </div>
            <table className="request-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>신청한 사람</th>
                  <th>메시지</th>
                  <th>신청일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {neighbors.length === 0 ? (
                  <tr>
                    <td colSpan="5">새로 들어온 이웃 신청이 없습니다</td>
                  </tr>
                ) : (
                  neighbors.map(neighbor => (
                    <tr key={neighbor.id}>
                      <td>
                        <input
                          type="checkbox"
                          style={{ margin: '12px', marginLeft: '15px' }}
                          checked={selectedIds.includes(neighbor.id)}
                          onChange={() => {
                            handleIndividualCheck(neighbor.id);
                          }}
                        />
                      </td>
                      <td>{neighbor.nickname}</td>
                      <td>우리 심심한데 이웃이나 할까?</td>
                      <td>{neighbor.requestedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="first-content">
              <div className="first-content-left">
                <input
                  type="checkbox"
                  style={{ marginLeft: '15px' }}
                  id="r3"
                  onChange={handleSelectAll}
                />
                <label className="mutualBuddyCheckbox">전체선택</label>
                <button onClick={handleAccept}>수락</button>
                <button onClick={handleReject}>거절</button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'sent' && (
          <div>
            <div className="first-content">
              <div className="first-content-left">
                <button onClick={handleCancel}>신청취소</button>
              </div>
            </div>
            <table className="request-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" onChange={handleSelectAll} />
                  </th>
                  <th>신청한 사람</th>
                  <th>메시지</th>
                  <th>신청일</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {neighbors.length === 0 ? (
                  <tr>
                    <td colSpan="5">진행중인 이웃신청이 없습니다</td>
                  </tr>
                ) : (
                  neighbors.map(neighbor => (
                    <tr key={neighbor.id}>
                      <td>
                        <input
                          type="checkbox"
                          style={{ margin: '12px', marginLeft: '15px' }}
                          checked={selectedIds.includes(neighbor.id)}
                          onChange={() => {
                            handleIndividualCheck(neighbor.id);
                          }}
                        />
                      </td>
                      <td>{neighbor.nickname}</td>
                      <td>우리 심심한데 이웃이나 할까?</td>
                      <td>{neighbor.requestedAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="first-content">
              <div className="first-content-left">
                <input
                  type="checkbox"
                  style={{ marginLeft: '15px' }}
                  id="r3"
                  onChange={handleSelectAll}
                />
                <label className="mutualBuddyCheckbox">전체선택</label>
                <button onClick={handleCancel}>신청취소</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
