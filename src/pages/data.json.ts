export async function get() {
  return {
    body: JSON.stringify({
      cards: [
        {
          id: "t-1",
          img: "images/1.1.jpg",
          faculty: "Wydział Medycyny Weterynaryjnej i Nauk o Zwierzętach",
        },
        {
          id: "t-2",
          img: "images/2.1.jpg",
          faculty: "Wydział Rolnictwa, Ogrodnictwa i Bioinżynierii",
        },
        {
          id: "t-3",
          img: "images/3.1.jpg",
          faculty: "Wydział Nauk o Żywności i Żywieniu",
        },
        {
          id: "t-4",
          img: "images/4.1.jpg",
          faculty: "Wydział Leśny i Technologii Drewna.",
        },
        {
          id: "t-5",
          img: "images/5.1.jpg",
          faculty: "Wydział Inżynierii Środowiska i Inżynierii Mechanicznej",
        },
        {
          id: "t-6",
          img: "images/6.1.jpg",
          faculty: "Wydział Ekonomiczny",
        },
      ],
    }),
  };
}
