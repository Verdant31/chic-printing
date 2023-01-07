/* eslint-disable new-cap */
import { fabric } from "fabric-pure-browser";
import jsPDF from "jspdf";
import { PaperTypes } from "../components/content/Print/Print.enum";
import { Position } from "../components/content/Print/Print.hook";

interface generatePdfProps {
  paper: PaperTypes;
  positions: Position[];
}

const initialLeft = 38.736220472;
const initialTopName = 78.913385827;
const initialTopPrice = 56.913385827;

const getPosition = (index: number) => {
  const row = Math.floor(index / 5);
  const column = index % 5;
  const left = initialLeft + column * (8.9590551181 + 97.377952756);
  const topName = initialTopName + row * 57.472440945;
  const topPrice = initialTopPrice + row * 57.472440945;
  return { left, topName, topPrice };
};

export const generatePdf = ({ paper, positions }: generatePdfProps) => {
  const canvas = new fabric.Canvas("c", {
    fireRightClick: true,
    fireMiddleClick: true,
    stopContextMenu: true,
  });
  if (paper === PaperTypes.one) {
    canvas.setWidth(793.7007874);
    canvas.backgroundColor = "#fff";
    canvas.setHeight(1122.519685);

    positions.forEach((position) => {
      if (position.product) {
        const words = position.product.name.split(" ");
        const formatedName =
          position.product.name.length > 10
            ? `${words[0]} ${words[1]} \n${words[2]}`
            : position.product.name;
        const { left, topName, topPrice } = getPosition(position.id);
        canvas.add(
          new fabric.Text(formatedName.toUpperCase(), {
            left,
            top: topName,
            fontWeight: "600",
            fontSize: 10,
          })
        );
        canvas.add(
          new fabric.Text(`3x de R$${position.product.price}0,00`, {
            left,
            top: topPrice,
            fontSize: 14.5,
          })
        );
      }
    });

    const imgData = canvas.toDataURL({ format: "png", quality: 1 });
    const pdf = new jsPDF("p", "mm");

    pdf.addImage(imgData, "PNG", 0, 0, 0, 0);
    pdf.save("download.pdf");
  } else {
    // TODO Aqui vai ser a configuração do papel 2
  }
};
