import React from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const animate1 = {
  visible: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
  },
};

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        className="loading"
        variants={container}
        initial="hide"
        animate="visible"
      >
        <motion.div variants={animate1} className="loading_first"></motion.div>
        <h1>Loading...</h1>
      </motion.div>
    </AnimatePresence>
  );
}
