import React, { useState } from "react";

// import motion lib

import { AnimatePresence, motion } from "framer-motion";

// import useNavigate react router dom lib

import { useNavigate } from "react-router-dom";

// import component thanks
import Thanks from "./Thanks";

// setting motion container and children

const overlay = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
    },
  },
};

const childMotion = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

export default function WatchAndGame({ changeModal }) {
  // using navigate of react-router-dom
  const navigate = useNavigate();

  // state component

  const [noCountDown, setNoCountDown] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const change = () => {
    changeModal(false);
  };

  const countDown = () => {
    setNoCountDown(true);
  };

  const thanks = () => {
    setShowThanks(!showThanks);
  };

  const goToGame = () => {
    navigate("/game");
  };
  return (
    <>
      <AnimatePresence>
        {/* container modal */}

        <motion.div
          className="modal"
          variants={overlay}
          initial="hide"
          animate="visible"
          exit="hide"
        >
          {/* 
            props changeModal from Welcome Page

            Modal : 1. ask watch video or not
                        => if watch => return false -> component Modal is unMounted
                           if not => setState display modal lucky Wheel 
                            in modal lucky wheel has : play and no
                                    if play => navigate to Game page
                                      else => display modal thanks component 
           */}
          {noCountDown ? (
            // container modal game lucky wheel

            <motion.div className="modal_content" variants={childMotion}>
              {/* image */}

              <div className="modal_content_money">
                <lord-icon
                  src="https://cdn.lordicon.com/pimvysaa.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "100%", height: "100%" }}
                ></lord-icon>
              </div>

              {/* context */}

              <h2>
                Mình có trò chơi nhận thưởng đầu năm bạn có muốn chơi không?
              </h2>

              {/* buttons */}

              <div className="modal_content_buttons">
                <button onClick={goToGame}>Có</button>
                <button onClick={thanks}>Không</button>
              </div>
            </motion.div>
          ) : (
            // container watch countDown
            <motion.div className="modal_content" variants={childMotion}>
              {/* image */}

              <div className="modal_content_images">
                <div>
                  <lord-icon
                    src="https://cdn.lordicon.com/zmzopqkj.json"
                    trigger="loop"
                    delay="2000"
                    style={{ width: "100%", height: "100%" }}
                  ></lord-icon>
                </div>
                <div>
                  <lord-icon
                    src="https://cdn.lordicon.com/zmzopqkj.json"
                    trigger="loop"
                    delay="2000"
                    style={{ width: "100%", height: "100%" }}
                  ></lord-icon>
                </div>
              </div>

              {/* context */}

              <h2>Bạn có muốn xem countdown không?</h2>

              {/* buttons */}

              <div className="modal_content_buttons">
                <button onClick={change}>Có</button>
                <button onClick={countDown}>Không</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* if no play lucky whell => display component thanks */}

      {showThanks && <Thanks close={thanks} />}
    </>
  );
}
