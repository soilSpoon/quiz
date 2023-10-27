import "charts.css";

import { CSSProperties, forwardRef } from "react";
import { useIncorrectList } from "~/app/hooks/questions/use-incorrect-list";
import { Timer } from "./timer";

type ResultModalProps = {
  onClose: () => void;
};

export const ResultModal = forwardRef<HTMLDialogElement, ResultModalProps>(
  function Modal({ onClose }, ref) {
    const incorrectList = useIncorrectList();

    const incorrectCount = incorrectList.length;
    const correctCount = 10 - incorrectCount;

    const correctStart = 0.0;
    const correctEnd = correctCount / 10;

    const incorrectStart = correctEnd;
    const incorrectEnd = 1.0;

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">결과</h3>
          <div className="flex flex-col gap-1">
            <Timer isRunning={false} />
            <p>정답: {correctCount}</p>
            <p>오답: {incorrectCount}</p>
            <table className="charts-css pie hide-data">
              <tbody>
                <tr>
                  <td
                    style={
                      {
                        "--start": correctStart,
                        "--end": correctEnd,
                        "--color": "rgba(100 210 80 / 75%)",
                      } as CSSProperties
                    }
                  >
                    <span className="data">{correctCount}</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={
                      {
                        "--start": incorrectStart,
                        "--end": incorrectEnd,
                        "--color": "rgba(240 50 50 / 75%)",
                      } as CSSProperties
                    }
                  >
                    <span className="data">{incorrectCount}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose}>
                닫기
              </button>
            </form>
          </div>
        </div>
      </dialog>
    );
  }
);
