'use client';

import { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSecret, setIsSecret] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment.trim(), isSecret);
      setComment('');
      setIsSecret(false);
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setComment('');
    setIsExpanded(false);
  };

  return (
    <div
      style={{
        marginBottom: '30px',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ padding: '16px' }}>
          <div
            style={{
              position: 'relative',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#fff',
            }}
          >
            {!comment && !isExpanded && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontSize: '14px',
                  color: '#999',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              >
                댓글을 작성하려면{' '}
                <span
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  로그인
                </span>{' '}
                해주세요
              </div>
            )}

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              onFocus={handleFocus}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                minHeight: isExpanded ? '100px' : '90px',
                padding: '12px',
                border: 'none',
                fontSize: '14px',
                resize: 'vertical',
                outline: 'none',
                transition: 'min-height 0.2s ease',
                backgroundColor: 'transparent',
              }}
            />
          </div>

          {isExpanded && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '12px',
                paddingTop: '12px',
                borderTop: '1px solid #e1e5e9',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#666',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSecret}
                    onChange={e => setIsSecret(e.target.checked)}
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  비밀댓글
                </label>

                <span
                  style={{
                    fontSize: '12px',
                    color: '#999',
                  }}
                >
                  {comment.length}/1000
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: '#666',
                  }}
                >
                  취소
                </button>

                <button
                  type="submit"
                  disabled={!comment.trim()}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    backgroundColor: comment.trim() ? '#03c75a' : '#ccc',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '13px',
                    cursor: comment.trim() ? 'pointer' : 'not-allowed',
                    transition: 'background-color 0.2s',
                  }}
                >
                  등록
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
