'use client';

import CommentSection from '@/src/components/comment/CommentSection';

const CommentsTestPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'white',

        paddingTop: '20px',
        paddingBottom: '40px',
      }}
    >
      {/* 댓글 섹션 */}
      <CommentSection />
    </div>
  );
};

export default CommentsTestPage;
