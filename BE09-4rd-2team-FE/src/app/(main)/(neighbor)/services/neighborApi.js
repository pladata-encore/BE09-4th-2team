import api from '@/src/lib/axios';

// 1. 내가 추가한 이웃
export const getMyAddedNeighbors = () => api.get('/api/neighbors/my-following/added');

// 2. 나를 추가한 이웃
export const getMyReceivedNeighbors = () => api.get('/api/neighbors/my-following/received');

// 3. 내가 보낸 서로이웃
export const getSentMutualNeighbors = () => api.get('/api/neighbors/my-following/sent-mutual');

// 4. 내가 받은 서로이웃
export const getReceivedMutualNeighbors = () =>
  api.get('/api/neighbors/my-following/received-mutual');

// 6. 이웃 관계 삭제 (다중)
export const deleteNeighbor = selectedIds =>
  api.delete('/api/neighbors/delete', { data: selectedIds });

// 7. 이웃 신청 — 다수 수락
export const insertNeighbors = insertUserIds => api.patch('/api/neighbors/accept', insertUserIds);

// 8. 서로이웃 단체 수락
export const acceptMultipleNeighbors = ids => api.post('/api/neighbors/batch-accept', ids);

// 9. 서로이웃 단체 거절
export const rejectMultipleNeighbors = ids => api.post('/api/neighbors/batch-rejected', ids);

// 10. 이웃 관계 변경
export const changeRelationNeighbors = ids => api.post('/api/neighbors/batch-change', ids);

// 11. 이웃 신청 — 단일
export const insertNeighbor = insertUserId => api.patch(`/api/neighbors/${insertUserId}/accept`);

// 12. 이웃 신청 취소
export const cancelMyRequest = ids => api.post('/api/neighbors/batch-cancel', ids);

// 13. 이웃 차단
export const blockNeighbor = ids => api.post('/api/neighbors/batch-block', ids);

// 차단된 사용자 목록 가져오기
export const getBlockedUsers = () => {
  return api.get('/api/neighbors/blocked');
};

// 15. 로그인 정보 담아오는 api
export const savedUserInfo = () => {
  return api.get('/api/neighbors/saved');
};

// 닉네임으로 사용자 조회
export const getUserByNickname = async nickname => {
  const encoded = encodeURIComponent(nickname);
  const res = await api.get(`/api/neighbors/by-nickname/${encoded}`);
  return res.data;
};

// 이웃 신청 없으면 새로 만들어주기
