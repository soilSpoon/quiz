import { useIncorrectList } from "../hooks/questions/use-incorrect-list";

export function IncorrectNote() {
  const incorrectList = useIncorrectList();

  if (incorrectList.length === 0) return null;

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">오답 노트</h2>
        <div className="flex items-center">
          <div className="flex flex-col gap-y-3">
            {incorrectList.map((item) => (
              <div
                key={item.question}
                className="grid grid-cols-2 items-center"
              >
                <p
                  // 문제 텍스트에는 HTML 특수문자 코드가 포함되어 있어 dangerouslySetInnerHTML을 사용하였습니다.
                  dangerouslySetInnerHTML={{
                    __html: item.question,
                  }}
                />
                <p>{item.correctAnswer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
