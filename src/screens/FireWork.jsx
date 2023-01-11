import React from "react";
import { useEffect } from "react";
import xuanAudio from "../assets/audio/xuan.mp3";
import noAudio from "../assets/audio/no.mp3";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// motion init

const container = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      when: "beforeChildren",
    },
  },
};

const text = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
    },
  },
};

const text2023 = {
  visible: {
    scale: 1.1,
    transition: {
      repeat: Infinity,
      duration: 1.5,
      repeatType: "reverse",
    },
  },
};

const boxGameMotion = {
  hide: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 120,
    },
  },
};

export default function FireWork() {
  const navigate = useNavigate();
  const [timeShowText, setTimeShowText] = useState(false);
  const [showModalGame, setShowModalGame] = useState(false);

  useEffect(() => {
    // querry canvas

    const canvas = document.querySelector("canvas");

    // resize canvas
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    canvas.addEventListener("resize", () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
    });

    // create context 2d

    const ctx = canvas.getContext("2d");

    // colors
    const colors = ["#27af97", "#fb8e42", "#e83d45", "#62c050", "#ffc327"];

    // random color

    function randomColor(colors) {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // mouse

    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    //   func contructor Particle

    function Particle(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.ttl = 200;

      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      };

      this.update = () => {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl--;
      };
    }

    // const particle = new Particle(100, 100, 50, "red", 0, Math.PI * 2, false);
    let particles;
    const particlesCount = 25;

    function init() {
      particles = [];
      for (let index = 0; index < particlesCount; index++) {
        const radians = (Math.PI * 2) / particlesCount;
        const x = mouse.x;
        const y = mouse.y;
        const velocity = {
          x: Math.cos(radians * index),
          y: Math.sin(radians * index),
        };
        particles.push(new Particle(x, y, 5, randomColor(colors), velocity));
      }
    }

    // generage

    function generateCircles() {
      setTimeout(generateCircles, 500);
      for (let index = 0; index < particlesCount; index++) {
        const radians = (Math.PI * 2) / particlesCount;
        const x = mouse.x;
        const y = mouse.y;
        const velocity = {
          x: Math.cos(radians * index),
          y: Math.sin(radians * index),
        };
        particles.push(new Particle(x, y, 5, randomColor(colors), velocity));
      }
    }

    // animate

    function animate() {
      // de quy animate

      requestAnimationFrame(animate);

      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((item, index) => {
        if (item.ttl === 0) {
          particles.splice(index, 1);
        }
        item.update();
      });
    }

    init();
    animate();
    generateCircles();
    window.addEventListener("click", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const xuanAudio = document.querySelector(".audio_xuan");
      xuanAudio.play();
      const noAudio = document.querySelector(".no");
      noAudio.play();
      noAudio.volume = 0.7;
    });
  }, []);

  setTimeout(() => {
    setTimeShowText(true);
  }, 10000);

  setTimeout(() => {
    setShowModalGame(true);
  }, 60000);

  setTimeout(() => {
    setShowModalGame(true);
  }, 120000);

  setTimeout(() => {
    setShowModalGame(true);
  }, 180000);

  // modal box small showing when watching video

  const goToGame = () => {
    navigate("game");
  };

  // close modal box small showing

  const closeGameBox = () => {
    setShowModalGame(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        className="fireWork"
        variants={container}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <canvas></canvas>
        <audio autoPlay={true} loop className="audio_xuan">
          <source src={xuanAudio} type="audio/mpeg" />
        </audio>
        <audio className="no">
          <source src={noAudio} />
        </audio>
        {timeShowText && (
          <motion.div className="fireWork_text" variants={text}>
            <h2>HAPPY NEW YEAR</h2>
            <motion.h1 variants={text2023}>2023</motion.h1>
          </motion.div>
        )}

        {showModalGame && (
          // component animate motion
          <AnimatePresence>
            {/* modal box showing container */}

            <div className="welcome_modal">
              <motion.div
                className="welcome_modal_game"
                variants={boxGameMotion}
                initial="hide"
                animate="visible"
                exit="hide"
              >
                {/* image lordicon lib*/}
                <div className="welcome_modal_game_image">
                  <lord-icon
                    src="https://cdn.lordicon.com/nkmsrxys.json"
                    trigger="loop"
                    style={{ width: "100%", height: "100%" }}
                  ></lord-icon>
                </div>

                {/* contain */}

                <p>Quay quà tết cùng mình nhé</p>

                {/* buttons ask play lucky wheel */}

                <div className="welcome_modal_game_buttons">
                  <button onClick={goToGame}>
                    <BsCheck />
                  </button>
                  <button onClick={closeGameBox}>
                    <IoMdClose />
                  </button>
                </div>
              </motion.div>
            </div>
          </AnimatePresence>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
