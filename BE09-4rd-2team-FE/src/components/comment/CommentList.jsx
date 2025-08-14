'use client';

import CommentItem from './CommentItem';

const CommentList = ({ comments, onLikeComment, onDeleteComment }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {comments.map(comment => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          onLike={() => onLikeComment(comment.commentId)}
          onDelete={() => onDeleteComment(comment.commentId)}
        />
      ))}

      {comments.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999',
            fontSize: '14px',
          }}
        >
          아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;
