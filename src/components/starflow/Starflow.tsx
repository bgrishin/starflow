import React, { MutableRefObject, useEffect, useRef } from "react";

const Starflow = () => {
  const canvasRef: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const cloudRef: MutableRefObject<HTMLImageElement | null> = useRef(null);

  const starsArrayRef: MutableRefObject<any[]> = useRef([]);
  const cloudsArrayRef: MutableRefObject<any[]> = useRef([]);
  const fallingStarsArrayRef: MutableRefObject<any[]> = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const cloud = cloudRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    // const stars: Star[] = [];
    // const clouds: Cloud[] = [];
    // const fallingStars: FallingStar[] = [];

    const numStars = 1000;

    let animationFrame: number = 0;

    let mouseX: number = 0;
    let mouseY: number = 0;

    class Star {
      public x: number;
      public y: number;

      public radius: number;
      public opacity: number;
      public speed: number;
      public closestStar: Star | null;

      public circleCurrentAngle: number;
      public circleRadius: number;
      public circleBaseX: number;
      public circleBaseY: number;

      public glower: boolean;
      public random: number;

      constructor(
        x: number,
        y: number,
        radius: number,
        opacity: number,
        speed: number
      ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.opacity = opacity;
        this.speed = speed;
        this.closestStar = null;

        this.circleCurrentAngle = Math.floor(Math.random() * 360);
        this.circleRadius = 50 + Math.floor(Math.random() * 2000);
        this.circleBaseX = canvas.width / 2; // x координата центра окружности
        this.circleBaseY = canvas.height / 2; // y координата центра окружности

        this.glower = Math.random() > 0.99;
        this.random = Math.random();
      }

      findClosestStar(stars: Star[]) {
        let minDistance = Infinity;
        for (const star of stars) {
          if (star === this) continue; // Skip checking against itself
          const distance = Math.sqrt(
            (this.x - star.x) ** 2 + (this.y - star.y) ** 2
          );
          if (distance < minDistance) {
            minDistance = distance;
            this.closestStar = star;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.shadowBlur = 11;
        ctx.shadowColor = "rgb(11,188,255)";
        ctx.arc(
          this.x, // + mouseX / 24 / this.radius,
          this.y, // + mouseY / 24,
          this.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${
          this.glower ? Math.sin(this.x / 10) : this.opacity
        })`;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (this.closestStar) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.closestStar.x, this.closestStar.y);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.stroke();
        }
      }

      update() {
        this.x -= this.speed;

        if (this.x < -this.radius) {
          this.x = canvas.width + this.radius;
          this.closestStar = null;
        }

        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius;
          this.closestStar = null;
        }

        this.draw();
      }

      updateCircleRotation() {
        const vx = Math.cos(this.circleCurrentAngle) * this.circleRadius;

        const vy = Math.sin(this.circleCurrentAngle) * this.circleRadius;

        ctx.beginPath();
        ctx.shadowBlur = 11;
        ctx.shadowColor = "rgb(11,188,255)";
        ctx.arc(
          this.circleBaseX + vx,
          this.circleBaseY + vy,
          this.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        this.circleCurrentAngle += this.speed / 1000;
      }
    }

    class FallingStar {
      public x: number;
      public y: number;

      public updatedTimes: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineWidth = 1;
        ctx.lineTo(this.x - 30, this.y + 20);
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.sin(this.x / 120)})`;
        ctx.stroke();
      }

      update() {
        this.x -= 10;
        this.y += 10;

        this.updatedTimes++;

        if (this.updatedTimes > 50) {
          fallingStarsArrayRef.current.splice(
            fallingStarsArrayRef.current.findIndex(
              (x: FallingStar) => x.x === this.x && x.y === this.y
            ),
            1
          );
          return;
        }

        this.draw();
      }
    }

    class Cloud {
      public x: number;
      public y: number;

      public radius: number;
      public speed: number;

      constructor(x: number, y: number, radius: number, speed: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
      }

      draw() {
        ctx.globalAlpha = 0.1;
        ctx.drawImage(cloud, this.x, this.y);
        ctx.globalAlpha = 1;
      }

      update() {
        this.x -= this.speed;

        if (this.x < -this.radius || this.y < -this.radius) {
          cloudsArrayRef.current.splice(
            cloudsArrayRef.current.findIndex(
              (x: Cloud) => x.x === this.x && x.y === this.y
            ),
            1
          );
          return;
        }

        if (this.x < -this.radius) {
          this.x = canvas.width + this.radius;
        }

        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius;
        }

        this.draw();
      }
    }

    const generateStars = () => {
      if (starsArrayRef.current.length) return;

      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 3;
        const opacity = Math.random() * 0.5 + 0.2;
        const speed = Math.random() * 2 + 0.5;
        starsArrayRef.current.push(new Star(x, y, radius, opacity, speed));
      }
    };

    generateStars();

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0,0,0,0.2)");
      gradient.addColorStop(1, "rgba(12,0,49,0.5)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of starsArrayRef.current) {
        star.update();
        // star.updateCircleRotation();
      }

      for (const cloud of cloudsArrayRef.current) {
        cloud.update();
      }

      for (const fallingStar of fallingStarsArrayRef.current) {
        fallingStar.update();
      }

      if (Math.random() > 0.995) {
        const x = canvas.width;
        const y = canvas.height / 2 + Math.floor(Math.random() * 100);
        const radius = 1500;
        const speed = 5;

        cloudsArrayRef.current.push(new Cloud(x, y, radius, speed));
      }

      if (Math.random() > 0.995) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        fallingStarsArrayRef.current.push(new FallingStar(x, y));
      }

      animationFrame = requestAnimationFrame(draw);
    };

    window.addEventListener("load", draw);

    const handleResize = () => {
      const dpr = window.devicePixelRatio;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", draw);
      window.removeEventListener("resize", handleResize);

      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="relaxCanvas"></canvas>
      <img
        ref={cloudRef}
        src="/cloud.png"
        alt="Cloud"
        id="cloud"
        style={{ display: "none" }}
      />
    </>
  );
};

export default Starflow;
