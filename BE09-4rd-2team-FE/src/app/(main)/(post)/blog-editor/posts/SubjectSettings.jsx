import React, { useState } from 'react';
import './SubjectSettings.css';

export default function SubjectSettings({ onClose, onConfirm, setSubTopic }) {
  const [selectedSubject, setSelectedSubject] = useState('주제 선택 안 함');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [alwaysUseCategory, setAlwaysUseCategory] = useState(false);

  // 선택된 주제 핸들링
  const handleSubjectSelect = (group, subject) => {
    setSelectedGroup(group);
    setSelectedSubject(subject);
    setSubTopic(subject);
  };

  const handleConfirm = () => {
    onConfirm(selectedSubject, selectedGroup);
  };

  return (
    <div className="subject-settings">
      <div className="header">
        <h3 className="title">주제 설정</h3>
      </div>

      <p className="description">
        주제를 선택하면 네이버 홈과 블로그 홈에서 주제별로 글을 볼 수 있습니다.
        <br />
        주제를 선택하지 않아도 "블로그 홈 &gt; 주제를 불러오기" 검색에서 볼 수 있습니다.
      </p>

      <div className="subject-groups">
        <div className="subject-group">
          <strong>엔터테인먼트·예술</strong>
          {['문학·책', '영화', '미술·디자인'].map(item => (
            <label key={item}>
              <input
                type="radio"
                name="subject"
                value={item}
                checked={selectedSubject === item}
                onChange={() => handleSubjectSelect('엔터테인먼트·예술', item)}
              />{' '}
              {item}
            </label>
          ))}
        </div>

        <div className="subject-group">
          <strong>생활·노하우·쇼핑</strong>
          {['일상·생각', '육아·결혼', '반려동물'].map(item => (
            <label key={item}>
              <input
                type="radio"
                name="subject"
                value={item}
                checked={selectedSubject === item}
                onChange={() => handleSubjectSelect('생활·노하우·쇼핑', item)}
              />{' '}
              {item}
            </label>
          ))}
        </div>

        <div className="subject-group">
          <strong>취미·여가·여행</strong>
          {['게임', '스포츠', '사진'].map(item => (
            <label key={item}>
              <input
                type="radio"
                name="subject"
                value={item}
                checked={selectedSubject === item}
                onChange={() => handleSubjectSelect('취미·여가·여행', item)}
              />{' '}
              {item}
            </label>
          ))}
        </div>

        <div className="subject-group">
          <strong>지식·동향</strong>
          {['IT·컴퓨터', '사회·정치', '건강·의학'].map(item => (
            <label key={item}>
              <input
                type="radio"
                name="subject"
                value={item}
                checked={selectedSubject === item}
                onChange={() => handleSubjectSelect('지식·동향', item)}
              />{' '}
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="subject-extra">
        <label>
          <input
            type="radio"
            name="subject"
            value="주제 선택 안 함"
            disabled
            checked={selectedSubject === '주제 선택 안 함'}
            onChange={() => handleSubjectSelect('', '주제 선택 안 함')}
          />{' '}
          주제 선택 안 함
        </label>
        <label>
          <input
            type="checkbox"
            disabled
            checked={alwaysUseCategory}
            onChange={e => setAlwaysUseCategory(e.target.checked)}
          />{' '}
          이 카테고리의 글은 항상 이 주제로 분류
        </label>
      </div>

      <div className="actions">
        <button className="cancel-btn" onClick={onClose}>
          취소
        </button>
        <button className="confirm-btn" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}
