import { useEffect, useState } from "react";

type TQuiz = { img: string; faculty: string; id: string }[];
const Quiz = ({
  data,
  start,
  end,
}: {
  data: TQuiz;
  start: number;
  end: number;
}) => {
  const [picked, setPicked] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const pick = (id: string) => {
    setPicked((picked) => [...picked, id]);
    setResult(id);
  };

  return (
    <>
      <div
        className="quizContainer"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          marginTop: "1rem",
          width: "max-content",
          marginInline: "auto",
        }}
      >
        {data.slice(start, end).map(({ img, faculty, id }) => (
          <div key={id} onClick={() => pick(id)}>
            <img
              src={img}
              alt=""
              style={{
                width: "200px",
                height: "150px",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
      <p>{result && data.find((item) => item.id === result)?.faculty}</p>
    </>
  );
};

export default Quiz;
