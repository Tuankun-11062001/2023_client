import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const overlay = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      when: "beforeChildren",
    },
  },
};

const box = {
  hide: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  },
};

export default function Thanks({ close }) {
  return (
    <AnimatePresence>
      <motion.div
        className="thanks"
        variants={overlay}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <motion.div className="thanks_context" variants={box}>
          <div>
            <lord-icon
              // src="https://cdn.lordicon.com/yrixyrst.json"
              src="https://cdn.lordicon.com/hqrgkqvs.json"
              trigger="loop"
              delay="2000"
              style={{ width: "100%", height: "100%" }}
            ></lord-icon>
          </div>
          <h1>Lời cảm ơn</h1>
          <p>
            Cảm ơn các bạn đã dành thời gian để tham gia sự kiện của mình. Chúc
            bạn năm mới Hạnh Phúc - An Khang - Thịnh Vượng và gặp nhiều may mắn.
            Về phần thưởng mình sẽ gửi đến các bạn trong thời gian sớm nhất. ^.^
          </p>
          <button onClick={() => close(false)}>Đã hiểu</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
