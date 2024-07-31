"use client";

// import React, { useEffect, useRef } from "react";

// const SineWaveBackground: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     let width = (canvas.width = window.innerWidth);
//     let height = (canvas.height = window.innerHeight);
//     const frequency = 0.01;
//     const amplitude = 20;
//     let phase = 0;

//     const draw = () => {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, width, height);
//       ctx.beginPath();
//       ctx.moveTo(0, height / 2);

//       for (let x = 0; x < width; x++) {
//         const y = height / 2 + amplitude * Math.sin(x * frequency + phase);
//         ctx.lineTo(x, y);
//       }

//       ctx.strokeStyle = "#EA3A36";
//       ctx.stroke();

//       phase -= 0.05;
//       requestAnimationFrame(draw);
//     };

//     const resizeCanvas = () => {
//       width = canvas.width = window.innerWidth;
//       height = canvas.height = window.innerHeight;
//       draw();
//     };

//     window.addEventListener("resize", resizeCanvas);

//     draw();

//     return () => {
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-0 left-0 w-full h-full z-0"
//     />
//   );
// };

// export default SineWaveBackground;
// src/SineWaveBackground.tsx
// src/SineWaveBackground.tsx
// src/SineWaveBackground.tsx
// src/SineWaveBackground.tsx
import React, { useEffect, useRef } from "react";

const SineWaveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const waves = Array.from({ length: 12 }, (_, index) => ({
      amplitude: 20,
      frequency: 0.01,
      phase: (Math.PI / 6) * index,
      color: ["#EA3A36", "#F27D2C", "#E8E7D5"][index % 3],
    }));

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      waves.forEach((wave, index) => {
        ctx.beginPath();
        const startY = (height / 13) * (index + 1);
        ctx.moveTo(0, startY);

        for (let x = 0; x < width; x++) {
          const y =
            startY +
            wave.amplitude * Math.sin(x * wave.frequency + wave.phase) -
            x * Math.tan(Math.PI / 3);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.stroke();
        wave.phase -= 0.05; // Speed of the wave
      });

      requestAnimationFrame(draw);
    };

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      draw();
    };

    window.addEventListener("resize", resizeCanvas);

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default SineWaveBackground;
