import { Faculties, Faculty } from "../utils/dataTypes";
import { getMax } from "../utils/getMax";

type Props = {
  result: { [key: string]: number };
};
const Results: React.FC<Props> = ({ result }) => {
  const max = Object.entries(result).find(([_, v]) => v === getMax(result));

  return (
    <div className="resultsContainer">
      <a
        href="https://wu.up.poznan.pl/rekrutacja/"
        target="_blank"
        style={{ all: "unset", cursor: "pointer" }}
      >
        Najbardziej pasuje do Ciebie:{" "}
        <strong>{Faculties[max?.[0] as Faculty]}</strong>
      </a>
    </div>
  );
};

export default Results;
