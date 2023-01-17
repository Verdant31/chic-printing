/* eslint-disable new-cap */
import { fabric } from "fabric-pure-browser";
import jsPDF from "jspdf";
import { PaperTypes } from "../../components/content/Print/Print.enum";
import { Position } from "../../components/content/Print/Print.hook";
import { getPosition } from "./getPosition";

interface generatePdfProps {
  paper: PaperTypes;
  positions: Position[];
}

export const generatePdf = ({ paper, positions }: generatePdfProps) => {
  const canvas = new fabric.Canvas("c", {
    fireRightClick: true,
    fireMiddleClick: true,
    stopContextMenu: true,
  });
  if (paper === PaperTypes.one) {
    canvas.setWidth(793.7007874);
    canvas.backgroundColor = "#fff";
    canvas.setHeight(1125.519685);
    positions.forEach((position) => {
      if (position.product) {
        const words = position.product.name.split(" ");
        const formatedName =
          position.product.name.length > 10
            ? `${words[0]} ${words[1]} \n${words[2]}`
            : position.product.name;
        const { left, topName, topPrice } = getPosition(position.id, paper);
        canvas.add(
          new fabric.Text(formatedName.toUpperCase(), {
            left,
            top: topName,
            fontWeight: "600",
            fontSize: 10,
          })
        );
        canvas.add(
          new fabric.Text(`${position.product.price}`, {
            left,
            top: topPrice,
            fontSize: 14.5,
          })
        );
      }
    });
    const imgData = canvas.toDataURL({ format: "png", quality: 1 });
    const pdf = new jsPDF({ unit: "px", format: "a4" });
    pdf.addImage(imgData, "PNG", 0, 0, 0, 0);
    pdf.save("download.pdf");
  } else {
    canvas.setWidth(831.49606299);
    canvas.backgroundColor = "#fff";
    canvas.setHeight(1054.488189);
    positions.forEach((position) => {
      if (position.product) {
        const { nameLeft, priceLeft, top } = getPosition(position.id, paper);
        canvas.add(
          new fabric.Text(position.product.name.toUpperCase(), {
            left: nameLeft,
            top: top && top + 2,
            fontSize: 11.5,
          })
        );
        canvas.add(
          new fabric.Text(`${position.product.price}`, {
            left: priceLeft,
            top,
            fontSize: 14.5,
          })
        );
      }
    });
    const imgData = canvas.toDataURL({ format: "png", quality: 1 });
    const pdf = new jsPDF("p", "mm", [279, 220]);

    pdf.addImage(imgData, "PNG", 0, 0, 0, 0);
    pdf.save("download.pdf");
  }
};
