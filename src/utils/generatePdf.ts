/* eslint-disable new-cap */
import { fabric } from "fabric";
import jsPDF from "jspdf";
import { PaperTypes } from "../components/content/Print/Print.enum";
import { Position } from "../components/content/Print/Print.hook";

interface generatePdfProps {
  paper: PaperTypes;
  positions: Position[];
}

const initialLeft = 55;
const initialTopName = 34;
const initialTopPrice = 10;

const getPosition = (index: number) => {
  const row = Math.floor(index / 5);
  const column = index % 5;
  const left = initialLeft + column * (15.118110236 + 97.377952756);
  const topName = initialTopName + row * (56.692913386 + 7.5590551181);
  const topPrice = initialTopPrice + row * (56.692913386 + 7.5590551181);
  return { left, topName, topPrice };
};

export const generatePdf = ({ paper, positions }: generatePdfProps) => {
  const canvas = new fabric.Canvas("c", {
    fireRightClick: true,
    fireMiddleClick: true,
    stopContextMenu: true,
  });
  if (paper === PaperTypes.one) {
    canvas.setWidth(642.51968504);
    canvas.backgroundColor = "#fff";
    canvas.setHeight(1133.8582677);

    positions.forEach((position) => {
      if (position.product) {
        const { left, topName, topPrice } = getPosition(position.id);
        canvas.add(
          new fabric.Text(position.product.name, {
            left,
            top: topName,
            fontSize: 14,
          })
        );
        canvas.add(
          new fabric.Text(`R$ ${position.product.price}`, {
            left,
            top: topPrice,
            fontSize: 14,
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
