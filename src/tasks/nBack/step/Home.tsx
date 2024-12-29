import React, { useState } from 'react';
import Modal from '../../../component/modal';
import useTaskStore from '../store/taskStore';
import useSessionStore from '../store/sessionStore';
import useAppStore from '../../../store/appStore';

export default function Home() {
  const setTask = useAppStore((state) => state.setTask);
  const sessionList = useSessionStore((state) => state.sessionList);
  const setTaskStep = useTaskStore((state) => state.setTaskStep);

  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const isReady = () => {
    if (sessionList.length === 0) return false;
    if (sessionList.some((session) => session.taskList.length === 0))
      return false;
    return true;
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModelOpen(false);
        }}
        title="설정을 완료해주세요!"
        message="연습 문제와 본 문제가 설정되어야 시작할 수 있습니다."
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-center">N back Task</h1>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              if (isReady()) {
                setTaskStep('subject-setup');
              } else {
                setIsModelOpen(true);
              }
            }}
          >
            Start
          </button>
          <button type="button" onClick={() => setTaskStep('setting')}>
            Setting
          </button>
          <button type="button" onClick={() => setTask('none')}>
            Select Task
          </button>
        </div>
      </div>
    </>
  );
}
