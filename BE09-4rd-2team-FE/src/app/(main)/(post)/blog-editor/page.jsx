/* page.jsx */
'use client';

import React, { useState, useRef } from 'react';
import { Toolbar } from './toolbar/InsertToolbar';
import TitleInput from './editor/TitleInput';
import ContentEditor from './editor/ContentEditor';
// 헤더 스타일 import (동작하지 않아도 로드)
import styles from './Header.css';
// 발행 설정창
import PublishOptions from './posts/PublishOption';
import SubjectSettings from './posts/SubjectSettings';
// 최상단 툴바
import Header from './Header';
import './editor/Editor.css';
import Modal from './posts/Modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import PublishModal from './PublishModal'; // 모달 창 열고 닫기에 쓰임

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + '/api',
  withCredentials: true,
});

export default function BlogEditor() {
  styles; // CSS가 빌드에 포함되도록만 처리

  // 제목모드, 본문모드
  // const [activeSection, setActiveSection] = useState('title'); <<<< 보류 : 서식 변경 필요?

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef(null);
  const [thumbnailFile, setThumbnail] = useState(null);
  const [subTopic, setSubTopic] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');
  const [allowComment, setAllowComment] = useState(true);
  const [allowLike, setAllowLike] = useState(true);
  const [allowSearch, setAllowSearch] = useState(true);

  const [showPublishOptions, setShowPublishOptions] = useState(false);
  const [showSubjectSettings, setShowSubjectSettings] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('주제없음');
  const [mainTopic, setMainTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 1) 발행 API 호출 함수
  const handlePublish = async () => {
    setLoading(true);
    try {
      const requestDto = {
        title,
        content,
        visibility,
        allowComment,
        allowLike,
        allowSearch,
        mainTopic,
        subTopic,
      };
      const formData = new FormData();

      if (requestDto.subTopic.length <= 0) {
        requestDto.subTopic = '주제없음';
      }
      formData.append(
        'requestDto',
        new Blob([JSON.stringify(requestDto)], { type: 'application/json' }),
      );
      if (thumbnailFile) {
        formData.append('thumbnailFile', thumbnailFile);
      }
      const accessToken = localStorage.getItem('accessToken');

      // for (const value of formData.values()) {
      //   console.log('--------->', value);
      // }

      const result = await axios.post('http://localhost:8000/api/blog-service/posts', formData, {
        headers: { Authorization: 'Bearer ' + accessToken },
      });

      router.push('/');

      // 이후 처리: 리다이렉트 또는 알림
    } catch (error) {
      console.error(error);
      // 오류 핸들링
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <Header
          title={title}
          content={content}
          onOpenPublishOptions={() => setShowPublishOptions(true)}
        />

        {/* 주제설정창 ON */}
        {showPublishOptions && (
          <Modal onClose={() => setShowPublishOptions(false)}>
            <PublishOptions
              onClose={() => setShowPublishOptions(false)}
              onOpenSubject={() => {
                setShowPublishOptions(false); // 발행설정 모달 끔
                setShowSubjectSettings(true); // 주제설정 모달 켬
              }}
              selectedSubject={selectedSubject}
              onPublish={handlePublish} // 제목, 내용 입력 메시지
              loading={loading} // 선택적: 로딩 중 버튼 비활성화
            />
          </Modal>
        )}

        {/* 발행설정창 ON */}
        {showSubjectSettings && (
          <Modal onClose={() => setShowSubjectSettings(false)}>
            <SubjectSettings
              setSubTopic={setSubTopic}
              onClose={() => {
                setShowSubjectSettings(false);
                setShowPublishOptions(true);
              }}
              onConfirm={subject => {
                setSelectedSubject(subject);
                setShowSubjectSettings(false);
                setShowPublishOptions(true);
              }}
            />
          </Modal>
        )}

        <main>{/* 입력창 */}</main>
      </>

      {/* 삽입 툴바 (이미지, 링크 등) */}
      <Toolbar setContent={setContent} />

      {/* 본문 작성 영역 */}
      <main className="flex justify-center py-8">
        <div className="se_editor_wrap w-full max-w-4xl bg-white shadow-md rounded px-8 py-10">
          {/* 제목: onFocus로 상태 전환 */}
          <div className="se_title_wrap">
            <TitleInput
              title={title}
              setTitle={setTitle}
              contentRef={contentRef} // 넘겨주기
              onFocus={() => setActiveSection('title')}
            />
          </div>

          {/* 본문: onFocus로 상태 전환 */}
          <div className="se_content_wrap">
            <ContentEditor
              content={content}
              setContent={setContent}
              contentRef={contentRef} // 넘겨주고 있네
              onFocus={() => setActiveSection('content')}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
