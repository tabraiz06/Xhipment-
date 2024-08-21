import React from "react";
import { auth, provider, signInWithPopup } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const SigninWithGoogle = ({ text }) => {
   const navigate= useNavigate()
     const signInWithGoogle = () => {
       signInWithPopup(auth, provider)
         .then((result) => {
          
           console.log(result.user);
           if(result.user){
            navigate('/posts')
           }
         })
         .catch((error) => {
           console.error(error);
         });
     };
  return (
    <div>
      <button type="button" className="login-with-google-btn" onClick={signInWithGoogle}>
        {text} in with Google
      </button>
    </div>
  );
};

export default SigninWithGoogle;
