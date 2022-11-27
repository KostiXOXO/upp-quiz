import { useEffect, useMemo, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

type TQuiz = { img: string; id: string };

const Faculties = {
  m: "Wydział Mdycyny Weterynaryjnej i Nauk o Zwierzętach",
  r: "Wydział Rolnictwa, Ogrodnictwa i Bioinżynierii",
  n: "Wydział Nauk o Żywności i Żywieniu",
  l: "Wydział Leśny i Technologii Drewna",
  i: "Wydział Inżynierii Środowiska i Inżynierii Mechanicznej",
  e: "Wydział Ekonomiczny",
};

type Faculty = keyof typeof Faculties;
type Data = {
  cards: TQuiz[];
};

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const fetchData = async () => {
  const data: Data = await fetch("/data.json").then((res) => res.json());
  return data.cards;
};

const Quiz = () => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 300,
        disrespectUserMotionPreference: true,
      });
  }, [parent]);

  // const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [data, setData] = useState<TQuiz[]>([]);
  const [result, setResult] = useState<{ [key: string]: number }>({
    m: 0,
    r: 0,
    n: 0,
    l: 0,
    i: 0,
    e: 0,
  });

  const [{ start, end, round }, setRound] = useState({
    round: 1,
    start: 0,
    end: 6,
  });

  const restart = () => {
    setResult({
      m: 0,
      r: 0,
      n: 0,
      l: 0,
      i: 0,
      e: 0,
    });
    setRound({
      round: 1,
      start: 0,
      end: 6,
    });
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      console.log(data);
      setData(data);
    })();
  }, []);

  const options = useMemo<TQuiz[]>(
    () => shuffle(data.slice(start, end)),
    [data, round]
  );

  const pick = (id: string) => {
    setRound((round) => ({
      ...round,
      round: round.round + 1,
    }));

    if (round >= 5) return;
    const faculty = id[0];
    setResult((picked) => ({
      ...picked,
      [faculty]: picked[faculty] + 1,
    }));

    setRound((round) => ({
      ...round,
      start: round.start + 6,
      end: round.end + 6,
    }));
  };

  return (
    <>
      <div
        className="quizContainer"
        ref={parent}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
          marginTop: "1rem",
          width: "max-content",
          marginInline: "auto",
        }}
      >
        {options.map(({ img, id }) => (
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
      <div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Object.entries(result).map(([f, v]) => {
            return (
              <li key={f}>
                {Faculties[f as Faculty]} : {v}
              </li>
            );
          })}
        </ul>
        <button onClick={restart}>Restart?</button>
      </div>
    </>
  );
};

export default Quiz;
