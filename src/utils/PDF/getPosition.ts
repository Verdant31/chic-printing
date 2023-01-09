/* eslint-disable new-cap */
import { PaperTypes } from "../../components/content/Print/Print.enum";

export const getPosition = (index: number, paper: PaperTypes) => {
  if (paper === PaperTypes.one) {
    const initialLeft = 38.736220472;
    const initialTopName = 82.818;
    const initialTopPrice = 66.3;
    const row = Math.floor(index / 7);
    const column = index % 7;
    const left = initialLeft + column * (8.9590551181 + 97.377952756);
    const topName = initialTopName + row * 56.1772440945;
    const topPrice = initialTopPrice + row * 56.1772440945;
    return { left, topName, topPrice };
  } else {
    const initialTop = 65.031496063; // 1,8 cm;
    const initialNameLeft = 101.788188976; // 2,7cm;
    const initialPriceLeft = 207.82677165; // 5,5cm;
    const row = Math.floor(index / 2);
    const column = index % 2;
    const nameLeft = initialNameLeft + column * 317.48031496;
    const priceLeft = initialPriceLeft + column * 317.48031496;
    const top = initialTop + row * 47.654330709;
    return { nameLeft, priceLeft, top };
  }
};
