import { useState, useEffect } from 'react';
import useSessionStore from '../store/sessionStore';
import useTaskStore from '../store/taskStore';
import GoogleDriveImage from './GoogleDriveImage';

export default function SessionPreview() {
  const [index, setIndex] = useState<number>(0);
  const setSessionState = useSessionStore((state) => state.setSessionState);
  const sessionIndex = useSessionStore((state) => state.sessionIndex);
  const sessionList = useSessionStore((state) => state.sessionList);
  const { previewImgLinkList } = sessionList[sessionIndex];

  const prevButton = () => (
    <button
      type="button"
      className={`bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ${index === 0 ? 'invisible' : ''}`}
      onClick={() => setIndex((prev) => prev - 1)}
    >
      이전 페이지
    </button>
  );
  const nextButton = () => {
    if (index === previewImgLinkList.length - 1) {
      return (
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600}"
          onClick={() => setSessionState('standby')}
        >
          🚀 시작하기
        </button>
      );
    }

    return (
      <button
        type="button"
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600}"
        onClick={() => setIndex((prev) => prev + 1)}
      >
        다음 페이지
      </button>
    );
  };

  useEffect(() => {
    if (previewImgLinkList === undefined || previewImgLinkList.length === 0) {
      setSessionState('standby');
    }
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {/* 중간 설명 영역 (스크롤 가능) */}
      <div className="flex flex-col items-center flex-grow px-4 my-4 overflow-y-auto text-center">
        {GoogleDriveImage(previewImgLinkList[index], 'image')}
      </div>

      {/* 하단 좌우 버튼 */}
      <div className="absolute flex justify-between px-4 py-2 bottom-2 left-1 right-1">
        {prevButton()}
        <div>
          {index + 1}/{previewImgLinkList.length}
        </div>
        {nextButton()}
      </div>
    </div>
  );
}
