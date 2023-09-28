import React, { useState } from "react";
import { VT323 } from "next/font/google";
import { useSpring, animated } from "react-spring";

const vt = VT323({ subsets: ["latin"], weight: ["400"] });

function SearchBar({ value, setterFunction, onSubmit }) {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  // Define animation properties
  const iconAnimation = useSpring({
    transform: isInputFocused ? "translateX(12rem)" : "translateX(0)",
    config: { tension: 40, friction: 10 },
  });

  return (
    <main className={`bg-[#161B24] ${vt.className} w-full pb-5 rounded-b-3xl `}>
      <div className="h-12 mt-4 flex justify-center items-center">
        <div
          className={`bg-[#161b24;] w-3/4 h-5/6 rounded-full border-2 border-[#319a3c] border-solid flex justify-start items-center`}
        >
          <animated.div style={iconAnimation} className="p-2">
            <button className="py-2" onClick={onSubmit}>
              <img src="Search.svg" alt="" width={"20px"} height={"20px"} />
            </button>
          </animated.div>
          <input
            type="text"
            name=""
            value={value}
            onChange={(e) => setterFunction(e.target.value)}
            id=""
            placeholder="Search..."
            className="text-white bg-transparent w-4/6 h-full outline-none placeholder:text-[#5EE65A]"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
      </div>
    </main>
  );
}

export default SearchBar;
