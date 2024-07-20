"use client";

import { ILangPageProps } from "@/types/user";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import BurgerLanguage from "./burgerLanguage";

const Burger: React.FC<ILangPageProps> = ({ lng }) => {
  const [showBurger, setShowBurger] = useState<boolean>(false);

  const handleBurger = () => {
    setShowBurger(!showBurger);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !(event.target instanceof Element && event.target.closest(".burger"))
      ) {
        setShowBurger(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="burger">
        <div className="burger-btn" onClick={handleBurger}>
          <span />
        </div>
        <div className={showBurger ? "burger-body active" : "burger-body"}>
          <div className="burger-wrapper">
            <div
              style={{
                position: "relative",
                alignSelf: "end",
              }}
            >
              <GrClose className="burger-hide-btn" onClick={handleBurger} />
            </div>
            <div className="burger-language">
              <BurgerLanguage lng={lng} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
