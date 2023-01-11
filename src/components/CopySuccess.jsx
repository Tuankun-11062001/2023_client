import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import imageCuocSong from "../assets/image/cuocsong.jpg";
import imageDanBa from "../assets/image/danba.jpg";
import imageDemKhuya from "../assets/image/demkhuya.jpg";
import imageDuma from "../assets/image/duma.jpg";
import imageDuongTang from "../assets/image/duongtang.jpg";
import imageFa from "../assets/image/fa.jpg";
import imageGai from "../assets/image/gai.jpg";
import { useNavigate } from "react-router-dom";

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

const child = {
  hide: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
};

export default function CopySuccess({ close, linkFace }) {
  const navigate = useNavigate();
  const [funnyImg, setFunnyImg] = useState();
  const [funny, setFunny] = useState(true);

  useEffect(() => {
    const dataFunny = [
      imageCuocSong,
      imageDanBa,
      imageDemKhuya,
      imageDuma,
      imageDuongTang,
      imageFa,
      imageGai,
    ];
    const random = Math.floor(Math.random() * dataFunny.length);
    setFunnyImg(dataFunny[random]);
  }, []);

  const next = () => {
    setFunny(false);
  };

  const closeModal = () => {
    close(false);
  };

  const goFace = () => {
    window.open(linkFace, "_blank");
    closeModal(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="copy"
        variant={container}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <motion.div className="copy_contain" variants={child}>
          {funny ? (
            <div className="copy_contain_funny">
              <img src={funnyImg} />
              <button onClick={next}>Đi tiếp</button>
            </div>
          ) : (
            <div className="copy_contain_copy">
              <div>
                <lord-icon
                  src="https://cdn.lordicon.com/xxdqfhbi.json"
                  trigger="loop"
                  delay="2000"
                  style={{ width: "100%", height: "100%" }}
                ></lord-icon>
              </div>
              <h2>Đi đến Facebook</h2>
              <button onClick={goFace}>Đi</button>
              {/* <button onClick={closeModal}>Ở lại</button> */}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
