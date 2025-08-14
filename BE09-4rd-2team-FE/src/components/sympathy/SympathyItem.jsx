'use client';

export default function SympathyItem({ blogger }) {
  const handleOpenPopup = () => {
    const popupUrl = `/popup?nickname=${encodeURIComponent(blogger.nickname)}`;
    window.open(popupUrl, '_blank', 'width=500,height=600');
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px' }}>
      {/* 프로필 이미지 */}
      <img
        src={blogger.profileImage || `https://api.pravatar.cc/150?img=${blogger.id % 50}`}
        alt={blogger.nickname}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginRight: '12px',
        }}
      />

      {/* 이름 + 설명 (세로로) */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{blogger.nickname}</div>
        <div style={{ color: '#666', fontSize: '12px', marginTop: '2px' }}>
          {blogger.profileIntro || '소개글이 없습니다.'}
        </div>
      </div>

      {/* 이웃추가 버튼 */}

      <button
        onClick={handleOpenPopup}
        style={{
          padding: '6px 12px',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid black',
          borderRadius: '4px',
          fontSize: '13px',
          cursor: 'pointer',
        }}
      >
        이웃추가
      </button>
    </div>
  );
}
