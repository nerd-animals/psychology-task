import { Session, NONE_FLAG, SAME_FLAG, DIFF_FLAG } from './type';

export function solveSession(backCount: number, session: Session) {
  const solutionList = session.taskList.map((value, index) => {
    if (index < backCount) {
      return NONE_FLAG;
    }
    const nBackValue = session.taskList.at(index - backCount);

    if (value === nBackValue) {
      return SAME_FLAG;
    }
    return DIFF_FLAG;
  });

  const solvedSession = { ...session, solutionList: [...solutionList] };
  return solvedSession;
}

export function foo() {}
