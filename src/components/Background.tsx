import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // ✅ FIXED
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: { enable: true, zIndex: -1 },

        particles: {
          number: { value: 25 },

          color: { value: "#ff4da6" },

          shape: {
            type: "circle", // ✅ safe (no TS error)
          },

          opacity: { value: 0.5 },

          size: { value: { min: 4, max: 10 } },

          move: {
            enable: true,
            speed: 1,
            direction: "bottom",
            outModes: {
              default: "out",
            },
          },
        },
      }}
    />
  );
};

export default Background;