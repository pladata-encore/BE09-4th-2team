export default function DeleteConfirmModal({ onClose, onConfirm, deleteOption, setDeleteOption }) {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h4>이웃 삭제</h4>
        <p>
          선택한 이웃을 삭제하시겠습니까?
          <br />
          선택한 이웃에 서로이웃이 포함되어 있을 경우,
        </p>
        <label>
          <input
            type="radio"
            value="all"
            checked={deleteOption === 'all'}
            onChange={() => setDeleteOption('all')}
          />
          이웃과 서로이웃을 모두 삭제합니다.
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="mutual"
            checked={deleteOption === 'mutual'}
            onChange={() => setDeleteOption('mutual')}
          />
          서로이웃은 이웃으로 관계만 변경합니다.
        </label>
        <div className="popup-bottom">
          <button className="popup-bottom-check" onClick={onConfirm}>
            확인
          </button>
          <button className="popup-bottom-cancle" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
