import ReactDOM from 'react-dom';

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        <p className="mb-4">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          닫기
        </button>
      </div>
    </div>,
    document.body
  );
}
