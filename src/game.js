import { useState, useEffect } from "react";
import "./style.css";

const Game = () => {
  useEffect(() => {
    drawWord();
  }, []);

  
  const [input, setInput] = useState("");
  const [drawnWord, setDrawnWord] = useState("");
  const [createdBoxses, setCreatedBoxses] = useState("");

  
  useEffect( () => {
    createbox()
  },[drawnWord])
  let box

  // const words = ["MLEKO", "MASŁO", "SCHABOWY", "kasia",];
  const words = [
    { category: "Jedzenie", word: ["mleko"] },
    { category: "Imie", word: ["Amelia"] },
    { category: "Motoryzacja", word: ["Opel", "Honda"] },
    { category: "Państwa", word: ["Kazachstan", "Uzbekistan", "Polska", "Czechy","Maroko"] }
  ];

  const drawWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);

    const obj = words[randomIndex];

    const randomIndex1 = Math.floor(Math.random() * obj.word.length);

    const item = obj.word[randomIndex1].toUpperCase();

    setDrawnWord([obj.category, item]);
  };

  const checkLetter = () => {
    createdBoxses.forEach((i) => {
      if (i.props.children.props.children === input) {
        document
          .querySelector(`.square:nth-child(${Number(i.key) + 1})`)
          .setAttribute("visible", "visible");
      }
      setInput("");
    });
    checkWin();
  };

  const checkWin = () => {
    const boxLetter = document.querySelectorAll(".square");

    let x = 0;

    [...boxLetter].forEach((i) => {
      if (i.getAttribute("visible", "visible") === "visible") {
        x++;
      }
    });

    console.log(x);
    if (x === boxLetter.length) {
      document.querySelector(".winText").style.visibility = "visible";
    }
  };

  const createbox = () => {
    let word = drawnWord && drawnWord[1].split(/(?:)/u);


    const createboxes =
    word &&
    word.map((item, index) => (
        <div
          visible={Math.floor(Math.random() * 2) ? "hidden" : "visible"}
          key={index}
          className="square"
        >
          <span>{item}</span>
        </div>
      ));

      setCreatedBoxses(createboxes)
  };

  return (
    <>
      <h1>Kategoria: {drawnWord[0]} </h1>
      {      console.log(createdBoxses)}
      <div className="letterbox">{createdBoxses}</div>
      <input
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        maxLength="1"
        value={input}
      ></input>
      <button onClick={checkLetter}>Sprawdź!</button>
      <p className="winText" style={{ visibility: "hidden" }}>
        Wygrałeś!
      </p>
    </>
  );
};

export default Game;
