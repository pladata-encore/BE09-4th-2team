import React from 'react';
import './ImageUploadPopup.css';

export default function ImageUploadPopup() {
  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 부모창에 이미지 전달
        if (window.opener && window.opener.handleImageUpload) {
          window.opener.handleImageUpload(reader.result);
        }
        window.close();
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        padding: 20,
        textAlign: 'center',
        minWidth: 250,
      }}
    >
      <h3>이미지 업로드</h3>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => window.close()}>
          취소
        </button>
      </div>
    </div>
  );
}
