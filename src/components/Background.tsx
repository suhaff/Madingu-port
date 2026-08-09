import Particles, {
  initParticlesEngine,
} from "@tsparticles/react";

import { loadSlim } from "@tsparticles/slim";

import { useEffect, useState } from "react";

const Background = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: {
            value: "#08070c",
          },
        },

        particles: {
          number: {
            value: 35,
            density: {
              enable: true,
              width: 1200,
              height: 800,
            },
          },

          color: {
            value: [
              "#ff4da6",
              "#b66cff",
              "#5fe6ff",
            ],
          },

          shape: {
            type: "circle",
          },

          opacity: {
            value: {
              min: 0.08,
              max: 0.35,
            },
          },

          size: {
            value: {
              min: 1,
              max: 3,
            },
          },

          links: {
            enable: true,
            distance: 130,
            color: "#ff4da6",
            opacity: 0.08,
            width: 1,
          },

          move: {
            enable: true,
            speed: 0.35,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },

        interactivity: {
          detectsOn: "window",

          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },

            onClick: {
              enable: true,
              mode: "push",
            },

            resize: {
              enable: true,
            },
          },

          modes: {
            grab: {
              distance: 160,
              links: {
                opacity: 0.25,
              },
            },

            push: {
              quantity: 2,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
};

export default Background;