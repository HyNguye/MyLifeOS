import { useMemo, useState } from "react";
function Calculator() {
  const [display, setDisplay] = useState("0");
    const result = useMemo(()=>display.toString(),[display])
  const parseStringtoMath = (rs) => Function(`return(${rs})`)();
  const onInput = (e) => {
    setDisplay((prev) =>
      prev[0] === "0" && prev[1] !== "."
        ? e.target.textContent
        : prev + e.target.textContent
    );
  };
  const onInputSpecial = (e) => {
    let parttern = /\d*[.]+\d*[^+-/*]$/;
    
    if (parttern.test(display)) {
      setDisplay((prev) => prev);
    } else {
      setDisplay((prev) => {
        if (prev[prev.length - 1] === ".") {
          return prev;
        }
        return prev + e.target.textContent;
      });
    }
  };
  const handleResult = (e) => {
    let parttern = /\d*[.]+\d*[^+-/*]$/;
    let rs = display;
    if (parttern.test(display)) {
      let myArr = display.match(parttern);
      myArr = myArr.map((x) => {
        x = x.replace(".", "z");
        x = x.replaceAll(".", "");
        return x.replace("z", ".");
      });
      myArr.map((x) => (rs = rs.replace(parttern, x)));
      setDisplay(rs);
    } else if (/[+-/*]{2,}/.test(display)) {
      let temp = display.match(/[+-/*]{2,}/);
      temp.map((x) => {
        if (x[x.length - 1] == "-") {
          rs = display.replace(
            /[+-/*]{2,}/,
            `${x[x.length - 2]}${x[x.length - 1]}`
          );
        } else {
          rs = display.replace(/[+-/*]{2,}/, x[x.length - 1]);
        }
      });
    }
    setDisplay(parseStringtoMath(rs));
  };
  return (
    <div className="calculator grid grid-cols-4 grid-rows-3 p-5 bg-old-0 w-utility h-fit">
      <div className="numpad col-start-1 row-start-2  row-span-2 col-span-4 grid grid-cols-4 gap-2">
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="seven"
        >
          7
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="eight"
        >
          8
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="nine"
        >
          9
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          id="clear"
          onClick={() => setDisplay("0")}
        >
          C
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="four"
        >
          4
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="five"
        >
          5
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="six"
        >
          6
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="add"
        >
          +
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="one"
        >
            
          1
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="two"
        >
          2
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="three"
        >
          3
        </button>

      
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="subtract"
        >
          -
        </button>
      
        <button
          className=" calculator-btn hover:opacity-70"
          onClick={onInput}
          id="zero"
        >
          0
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInputSpecial}
          id="decimal"
        >
          .
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="multiply"
        >
          *
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          onClick={onInput}
          id="divide"
        >
          /
        </button>
        <button
          className="calculator-btn hover:opacity-70"
          id="equals"
          onClick={handleResult}
        >
          =
        </button>
      </div>
      <div
        className=" col-start-1 row-start-1 row-span-1 col-span-5 bg-white p-4 text-right mb-4 border-4 border-black  text-5xl w-full break-words"
        id="display"
      >
        {result.includes('.')?parseFloat(result).toFixed(2):display}
      </div>
    </div>
  );
}

export default Calculator;
