import React, { useState, useEffect } from "react";

// import react-router-dom

import { useLocation, Link, useNavigate } from "react-router-dom";

// import bg image

import bgImage from "../assets/image/bg.png";

// import motion

import { motion } from "framer-motion";

// import component thanks
import Thanks from "../components/Thanks";

// import axios
import axios from "axios";

// setting motion container and child
const boxForm = {
  hide: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};

const boxWinner = {
  hide: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
    },
  },
};

export default function Infomation() {
  // using state and navigate

  const { state } = useLocation();
  const navigate = useNavigate();

  // state component

  const [dataPrize, setDataPrize] = useState([]);
  const [showThanks, setShowThanks] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    linkFace: "",
    sex: "Nam",
    momo: "",
  });

  // func handle change input

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // call api prizes

  useEffect(() => {
    axios
      .get("https://2023-server.vercel.app/prize/all")
      .then((res) => setDataPrize(res.data));
  }, []);

  // handle submit form

  /**
   * when submit condition is true  => show thanks component
     
   */

  const submit = async () => {
    // setup data => send server

    const data = {
      ...formData,
      prize: state.prize,
    };

    // condition miss infomation

    if (
      formData.name === "" ||
      formData.linkFace === "" ||
      formData.momo === ""
    ) {
      return setError("Bạn điền thiếu thông tin.");
    }

    // check field input facebook link

    if (formData.linkFace.includes("https://www.facebook.com/") === false) {
      return setError("link face của bạn không đúng rồi !");
    }

    // call api with method post to send data to server
    await axios
      .post("https://2023-server.vercel.app/prize/create", data)
      .then((res) => {
        // condition error when number momo is has using => response from server

        if (res.data.mess) {
          return setError(res.data.mess);
        }

        // if everything is okee

        // disable button submit and set deafult form

        const buttonEl = document.querySelector(".infomation_form_submit");
        buttonEl.classList.add("disable");

        setError("");

        setShowThanks(true);

        setFormData({
          name: "",
          linkFace: "",
          sex: "Nam",
          momo: "",
        });
      });
  };

  // func close thanks component
  const closeThanks = (value) => {
    setShowThanks(value);
  };

  // func navigate winner page

  const seePrize = () => {
    navigate("/winner");
  };

  return (
    // information container
    <div className="infomation">
      <img src={bgImage} className="infomation_image" />
      {/* content */}

      <div className="infomation_content">
        {/* form  */}
        <motion.div
          className="infomation_form"
          variants={boxForm}
          initial="hide"
          animate="visible"
        >
          {/* component show winner when width small. default display none */}
          <div className="infomation_form_winner">
            <h2>Danh sách người chiến thắng</h2>
            <button onClick={seePrize}>Xem</button>
          </div>

          {/* form content */}

          <h1>Thông tin nhận thưởng</h1>

          {/* form ground Name */}

          <div className="infomation_form_group">
            <label>Tên của bạn</label>
            <input
              placeholder="ex: Tuấn"
              name="name"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          {/* form ground link face */}

          <div className="infomation_form_group">
            <label>Link Face của bạn</label>
            <input
              placeholder="ex: https://www.facebook.com/profile?id..."
              name="linkFace"
              onChange={handleChange}
              value={formData.linkFace}
            />
          </div>

          {/* form ground sex */}

          <div className="infomation_form_group_sex">
            <label>Giới tính</label>
            <select onChange={handleChange} value={formData.sex} name="sex">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          {/* form ground number momo */}

          <div className="infomation_form_group">
            <label>Số tài khoản Momo của bạn</label>
            <input
              placeholder="123483924"
              type="tel"
              name="momo"
              onChange={handleChange}
              value={formData.momo}
            />
          </div>

          {/* error */}

          <span>{error}</span>

          {/* button submmit */}

          <button onClick={submit} className="infomation_form_submit">
            Nhận thưởng
          </button>
        </motion.div>

        {/* component winner  in width medium. default display false*/}

        {/* container winner  component*/}
        <motion.div
          className="infomation_winner_sm"
          variants={boxWinner}
          initial="hide"
          animate="visible"
        >
          {/* context */}

          <h1>Danh sách trúng thưởng</h1>
          <button onClick={seePrize}>Xem</button>
        </motion.div>

        {/* component winner  in width large. default display true*/}

        <motion.div
          className="infomation_winner"
          variants={boxWinner}
          initial="hide"
          animate="visible"
        >
          {/* content */}

          <h1>Winner</h1>

          {/* tags */}

          <div className="infomation_winner_tags">
            <p>No.</p>
            <p>Tên</p>
            <p>Phần thưởng</p>
          </div>

          {/* render data with length 5 */}

          {dataPrize
            .filter((item, index) => index < 5)
            .map((item, index) => (
              <div className="infomation_winner_user" key={item.id}>
                <p>{index + 1}</p>
                <p>{item.name}</p>
                <p>{item.prize}</p>
              </div>
            ))}
          <Link className="infomation_winner_all" to="/winner">
            Xem tất cả
          </Link>
        </motion.div>
      </div>

      {/* when submit form => shown thanks component */}

      {showThanks && <Thanks close={closeThanks} />}
    </div>
  );
}
