import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import SigninWithGoogle from "./SigninWithGoogle";

const Login = () => {
  const navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handleinput = (e) => {
    setlogin({ ...login, [e.target.name]: e.target.value });
  };
  const submit = async () => {
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        navigate("/posts");
      }
      console.log("User logged in successfully");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="rounded-md flex flex-col justify-center gap-4 bg-slate-600 w-2/3 items-center mx-auto my-5 ">
      <h1>Login </h1>

      <input
        className="w-[60%] p-4"
        type="text"
        name="email"
        id="username"
        onChange={handleinput}
        value={login.username}
        required
      />
      <input
        className="w-[60%] p-4"
        type="text"
        name="password"
        id="password"
        onChange={handleinput}
        value={login.password}
        required
      />
      <button className="w-[35%] p-[15px] btn" onClick={submit}>
        submit
      </button>
      <Link to="/register">
        <p>don't have an account</p>
      </Link>
      <SigninWithGoogle text={'SingIn'} />
    </div>
  );
};

export default Login;
