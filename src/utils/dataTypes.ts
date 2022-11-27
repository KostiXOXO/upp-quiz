export const Faculties = {
  m: "Wydział Medycyny Weterynaryjnej i Nauk o Zwierzętach",
  r: "Wydział Rolnictwa, Ogrodnictwa i Bioinżynierii",
  n: "Wydział Nauk o Żywności i Żywieniu",
  l: "Wydział Leśny i Technologii Drewna",
  i: "Wydział Inżynierii Środowiska i Inżynierii Mechanicznej",
  e: "Wydział Ekonomiczny",
};

export type Faculty = keyof typeof Faculties;

export const initialResult = {
  m: 0,
  r: 0,
  n: 0,
  l: 0,
  i: 0,
  e: 0,
};

export const initialRound = {
  round: 1,
  start: 0,
  end: 6,
};
