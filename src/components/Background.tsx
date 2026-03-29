import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useState } from "react";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    loadSlim().then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      options={{
        fullScreen: { enable: true, zIndex: -1 },

        particles: {
          number: { value: 20 },

          shape: {
            type: "image",
            image: {
              src: "https://cdn-icons-png.flaticon.com/512/765/765613.png",
              width: 32,
              height: 32,
            },
          },

          size: { value: 15 },

          move: {
            enable: true,
            speed: 1.5,
            direction: "bottom",
            random: true,
          },

          rotate: {
            value: 0,
            animation: {
              enable: true,
              speed: 5,
            },
          },

          opacity: { value: 0.8 },
        },
      }}
    />
  );
};

export default Background;