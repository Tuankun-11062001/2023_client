import React, { useRef, useState, useEffect } from "react";

// import motion
import { motion, AnimatePresence } from "framer-motion";

// import bg image
import bgImage from "../assets/image/bg.png";

// import componnets

import CopySuccess from "../components/CopySuccess";

// import axios lib
import axios from "axios";

// set motion

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
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

export default function Winners() {
  const ref = useRef();

  // state component

  const [face, setFace] = useState("");
  const [funnyModal, setFunnyModal] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [page, setPage] = useState(2);
  const [buttonText, setButtonText] = useState("Xem thêm");

  // call api get all prize

  useEffect(() => {
    axios
      .get("https://2023-server.vercel.app/prize/all")
      .then((res) => setDataUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  // button more

  const moreData = () => {
    setPage((prev) => prev + 1);

    async function fetch() {
      await axios
        .get(`https://2023-server.vercel.app/prize/all?page=${page}`)
        .then((res) => setDataUser((prev) => [...prev, ...res.data]));
    }

    fetch();
  };

  // function goTo facebook

  const goFace = (e) => {
    const parent = e.target.parentElement;
    const linkFace = parent.querySelector("span").innerHTML;
    setFace(linkFace);
    setFunnyModal(true);
  };

  // func close funny modal

  const closeFunnyModal = (value) => {
    setFunnyModal(value);
  };

  return (
    <AnimatePresence>
      {/* container component */}
      <motion.div
        className="winner"
        variants={container}
        initial="hide"
        animate="visible"
        exit="hide"
      >
        <img src={bgImage} className="winner_img" />
        {/* content */}

        <div className="winner_context">
          <h1>Danh sách trúng thưởng</h1>

          {/* tags */}
          <div className="winner_context_tags">
            <p>No.</p>
            <p>Tên</p>
            <p>Facebook</p>
            <p>Giới tính</p>
            <p>Phần thưởng</p>
          </div>

          {/* list prize */}

          <div className="winner_context_list">
            {/* render data  => width large and medium default :true*/}

            {dataUser.map((item, index) => (
              <motion.div
                className="winner_context_item"
                key={item.id}
                variants={child}
              >
                <p>{index + 1}</p>
                <p>{item.name}</p>
                <p className="face" ref={ref}>
                  <span>{item.linkFace}</span>
                  <button onClick={goFace}>Facebook</button>
                </p>
                <p>{item.sex}</p>
                <p>{item.prize}</p>
              </motion.div>
            ))}

            {/* render data => width small */}
            {dataUser.map((item, index) => (
              <motion.div
                className="winner_context_item_sm"
                key={item.id}
                variants={child}
              >
                <div className="winner_context_item_sm_group">
                  <p>No.</p>
                  <p>{index + 1}</p>
                </div>
                <div className="winner_context_item_sm_group">
                  <p>Tên</p>
                  <p>{item.name}</p>
                </div>
                <div className="winner_context_item_sm_group">
                  <p>Link face</p>
                  <p className="winner_context_item_sm_group_face">
                    <span>{item.linkFace}</span>
                    <button onClick={goFace}>Facebook</button>
                  </p>
                </div>
                <div className="winner_context_item_sm_group">
                  <p>Giới tính</p>
                  <p>{item.sex}</p>
                </div>
                <div className="winner_context_item_sm_group">
                  <p>Phần thưởng</p>
                  <p>{item.prize}</p>
                </div>
              </motion.div>
            ))}
            <button
              onClick={moreData}
              style={{
                display: dataUser.length < (page - 1) * 5 ? "none" : "block",
              }}
            >
              xem Them
            </button>
          </div>
        </div>

        {/* modal funny */}

        {funnyModal && <CopySuccess close={closeFunnyModal} linkFace={face} />}
      </motion.div>
    </AnimatePresence>
  );
}
