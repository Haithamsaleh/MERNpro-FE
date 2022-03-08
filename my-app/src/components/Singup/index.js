import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import "./style.css";



const Regestier = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [emali, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getData = async () => {
    const items = await axios.get("http://localhost:5000/users");
    setUsers(items.data);
  };

  const ckeck = (e) => {
    e.preventDefault();

    let check = true;
    // eslint-disable-next-line
    users.map((item) => {
      if (item.emali == emali) {
        check = false;
      }
    });

    if (check) {
      try {
        axios.post("http://localhost:5000/users/create", {
          userName: userName,
          emali: emali,
          password: password,
        });
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: 'your account has been created successfully',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Start browsing '
      })
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const loginPage = () => {
    navigate("/login");
  };

  return (
    <>
    <div className='hero-container'> <video src='/videos/video-1.mp4' autoPlay loop muted /></div>

    <div className='login-box'>

      <h2>SIGN UP</h2>
      <form onSubmit={ckeck}>
        <div className='user-box'>
        <input
          type="text"
          name="userName"
          placeholder="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
        </div>
        <div className='user-box'>
        <input
          type="emali"
          name="emali"
          placeholder="emali"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='user-box'>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <input className='submit' type="submit" value="Register" />
      </form>
      <a className='register' onClick={loginPage}>Already have an account ?</a>
    </div>
    </>
  );
};

export default Regestier;
