"use client";

import { ILangPageProps } from "@/types/user";
import { useEffect, useState } from "react";
import { CloseBurgerIcon, OpenBurgerIcon } from "../../icons";
import BurgerLanguage from "./burgerLanguage";
import BurgerNavigation from "./burgerNavigation";
import "./../../styles/Header.module.scss";

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
          <OpenBurgerIcon />
        </div>
        <div className={showBurger ? "burger-body active" : "burger-body"}>
          <div className="burger-wrapper">
            <div
              style={{
                position: "relative",
                alignSelf: "end",
              }}
            >
              <div className="burger-hide-btn" onClick={handleBurger}>
                <CloseBurgerIcon />
              </div>
            </div>
            <div className="burger__content">
              <BurgerNavigation lng={lng} onChange={handleBurger} />
              <BurgerLanguage lng={lng} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Burger;
