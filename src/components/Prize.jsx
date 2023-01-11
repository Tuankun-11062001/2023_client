import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const overlay = {
  hide: {
    opacity: 0,
    backgroundColor: "unset",
  },
  visible: {
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    transtion: {
      delay: 0.5,
      duration: 1,
      when: "beforeChildren",
    },
  },
};

const box = {
  hide: {
    y: "-100vh",
  },

  visible: {
    y: 0,
    transtion: {
      delay: 1,
    },
  },
};

export default function Prize({ back, prize }) {
  const navigate = useNavigate();

  const goback = () => {
    back(false);
  };

  const goToInfomation = () => {
    navigate("/infomation", { state: { prize } });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="prize"
        variants={overlay}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <motion.div className="prize_content" variants={box}>
          <div className="prize_content_image">
            <lord-icon
              src="https://cdn.lordicon.com/lupuorrc.json"
              trigger="loop"
              delay="2000"
              style={{ width: "100%", height: "100%" }}
            ></lord-icon>
          </div>
          <h2>Congratulations</h2>
          <p>
            Bạn nhận được một phần quà <span>{prize}</span>. Để nhận được thưởng
            bạn điền thông tin nhé.
          </p>
          <div className="prize_content_buttons">
            {/* <button onClick={goback}>Quay Lại</button> */}
            <button onClick={goToInfomation}>Thêm thông tin</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
