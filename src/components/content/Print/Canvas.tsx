/* eslint-disable new-cap */
import { fabric } from "fabric";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export function MyCanvas() {
  const [isOnClient, setIsOnClient] = useState(false);
  useEffect(() => {
    setIsOnClient(true);
  }, []);
  const canvas = new fabric.Canvas("c", {
    fireRightClick: true,
    fireMiddleClick: true,
    stopContextMenu: true,
  });
  canvas.setWidth(642.51968504);
  canvas.backgroundColor = "#fff";
  canvas.setHeight(1133.8582677);

  let initialLeft = 55;
  let initialTopName = 34;
  let initialTopPrice = 10;
  console.log("opa");
  for (let i = 1; i <= 85; i++) {
    canvas.add(
      new fabric.Text("Colar branco X", {
        left: initialLeft,
        top: initialTopName,
        fontSize: 14,
      })
    );
    canvas.add(
      new fabric.Text("R$48,90", {
        left: initialLeft,
        top: initialTopPrice,
        fontSize: 14,
      })
    );
    initialLeft += 15.118110236 + 97.377952756;
    if (i % 5 === 0) {
      initialLeft = 55;
      initialTopName += 56.692913386 + 7.5590551181;
      initialTopPrice += 56.692913386 + 7.5590551181;
    }
  }
  const imgData = canvas.toDataURL({ format: "png", quality: 1 });
  const pdf = new jsPDF("p", "mm");

  pdf.addImage(imgData, "PNG", 0, 0, 0, 0);
  pdf.save("download.pdf");

  return <div>{isOnClient && <canvas id="c"></canvas>};</div>;
}
