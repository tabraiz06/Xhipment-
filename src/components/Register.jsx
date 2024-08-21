import React, { useContext, useState } from "react";
import { setDoc, doc } from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth , db} from "./firebaseConfig";
import PostList from "./PostList";
import SigninWithGoogle from "./SigninWithGoogle";
const Register = () => {
  const navigate = useNavigate();
  const initialValue = {
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };
  const [register, setregister] = useState(initialValue);

  const handleChange = (e) => {
    setregister({ ...register, [e.target.name]: e.target.value });
  };
  // console.table(register)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, register.email, register.password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
          await setDoc(doc(db, "Users", user.uid), register)
          navigate('/posts')
        }
        console.log("User Registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="main">
      <h1>Register now</h1>
      <form action="">
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="mobile number"
          onChange={handleChange}
          aria-required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          required
        />
        <button onClick={handleRegister}>Submit</button>
      </form>
      <Link to="/">have an account</Link>
      <SigninWithGoogle text={"Register"} />
    </div>
  );
};

export default Register;
