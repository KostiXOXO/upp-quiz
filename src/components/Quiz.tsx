import { useEffect, useMemo, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { shuffle } from "../utils/shuffle";
import Results from "./Results";
import { Faculty, initialResult, initialRound } from "../utils/dataTypes";

import "./styles.css";
import Image from "./Image";

export type TQuiz = { img: string; id: string };
type Data = {
  cards: TQuiz[];
};

const fetchData = async () => {
  const data: Data = await fetch("/data.json").then((res) => res.json());
  return data.cards;
};

const Quiz = () => {
  // auto-animate init - START
  const parent = useRef(null);
  useEffect(() => {
    parent.current &&
      autoAnimate(parent.current, {
        duration: 300,
        disrespectUserMotionPreference: true,
      });
  }, [parent]);
  // auto-animate init - END

  const [data, setData] = useState<TQuiz[]>([]);
  const [result, setResult] =
    useState<{ [Property in Faculty]: number }>(initialResult);
  const [{ start, end, round }, setRound] = useState(initialRound);

  const restart = () => {
    setResult(initialResult);
    setRound(initialRound);
  };

  useEffect(() => {
    (async () => {
      const data = await fetchData();
      setData(data);
    })();
  }, []);

  const options = useMemo<TQuiz[]>(
    () => shuffle(data.slice(start, end)),
    [data, round]
  );

  const pick = (id: string) => {
    if (round >= 6) return;

    setRound((round) => ({
      ...round,
      round: round.round + 1,
    }));

    if (round >= 5) return;
    const faculty = id[0];
    setResult((picked) => ({
      ...picked,
      [faculty]: picked[faculty as Faculty] + 1,
    }));

    setRound((round) => ({
      ...round,
      start: round.start + 6,
      end: round.end + 6,
    }));
  };

  return (
    <>
      <div className="quizContainer" ref={parent}>
        {options.map(({ img, id }) => (
          <Image key={id} onClick={() => pick(id)} img={img} />
        ))}
      </div>
      <div className="bottomBox">
        <p>Krok {`${round - 1}/5`}</p>
        {round >= 6 && <Results result={result} />}
        <button className="restartButton" onClick={restart}>
          Restart?
        </button>
      </div>
    </>
  );
};

export default Quiz;
