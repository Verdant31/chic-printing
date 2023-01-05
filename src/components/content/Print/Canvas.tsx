import { fabric } from "fabric";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";

// 94.488188976
// 56.692913386

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
  canvas.setWidth(680.31496063);
  canvas.backgroundColor = "#afa2a2";
  canvas.setHeight(1133.8582677);

  let initialLeft = 46.488188976;
  let initialTopName = 5;
  let initialTopPrice = 34;
  for (let i = 1; i <= 85; i++) {
    canvas.add(
      new fabric.Text("Colar branco X", {
        left: initialLeft,
        top: initialTopName,

        fontSize: 16,
      })
    );
    canvas.add(
      new fabric.Text("R$48,90", {
        left: initialLeft,
        top: initialTopPrice,
        fontSize: 16,
      })
    );
    initialLeft += 22.677165354 + 94.488188976;
    if (i % 5 === 0) {
      initialLeft = 46.488188976;
      initialTopName += 56.692913386 + 10;
      initialTopPrice += 56.692913386 + 10;
    }
  }
  const imgData = canvas.toDataURL("image/jpeg");
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF("p", "mm", [180, 300]);

  pdf.addImage(imgData, "JPEG", 0, 0);
  pdf.save("download.pdf");

  return <div>{isOnClient && <canvas id="c"></canvas>};</div>;
}
