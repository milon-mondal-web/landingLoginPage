import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa6";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Flip, toast } from 'react-toastify';


const Login = () => {

  // ======variables part start=========
  const[ email , setEmail ]                 = useState('')
  const[ password , setpassword ]           = useState('')
  const [emailError , setEmaileError]       = useState('')
  const [passwordError , setpasswordError]  = useState('')

  // ================fairbase variables part =============
  const auth = getAuth();
// ======funcitions  part start=========
   const handelEmail = (e) =>{
    setEmail (e.target.value)
   }
   const handelpassword = (e) =>{
    setpassword (e.target.value)
   }
   const handelSubmit = (e) =>{
    e.preventDefault()
    if(email == ''){
       setEmaileError ('Enter Your Email')
    }
    if (password ==''){
      setpasswordError ('Enter Your Password')
    }else{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.success('Email Verification Send', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Flip,
              });
             
                    });
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage )
        if(errorCode =='auth/email-already-in-use'){
          toast.warn('Email Has Already Taken', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
            });
        }
        // ..
      });
    }
   }
// ===========eye part========
const [ show , setshow ] = useState (false)
const handelshow = ()=> {
  setshow (!show)
}

  return (
    <>
      <section>
           <div className="container">
       <div className=' lg:w-full lg:h-screen lg:flex gap-[80px]   justify-center items-center ' >
        
         
            {/* ===1st login==== */}
            <form onSubmit={handelSubmit} className=' border-solid  rounded-lg p-5 mt-5 bg-transparent  '>
                 <div className='flex lg:justify-start  md:justify-center  text-[20px] font-bold ' >
                     <h2>WELCOME BACK!</h2>
                 </div>
                      {/* ===button===== */}
                <div className='flex justify-start items-center mb-[64px] '>

                   <button type='submit' className='text-[24px] text-[#1f1f1f] font-[400px] mt-5  '>Don’t have a account,  <span className='text-[#8699DA]' >Sign up</span></button>
                  </div>
           

                {/* ======1st input start====== */}
                   
                <label  className=' text-[28px] font-[600px] text-[#444B59]'>Username</label>
                <br />
                <input onChange={handelEmail}  className='pl-5 border-2 mb-5 border-solid border-[#789ADE] rounded-full outline-none lg:w-[400px] w-[300px] md:h-[30px] lg:h-[40px] ' type="Email" placeholder='deniel123@gmail.com' />
                <p className='text-sm font-normal text-red-500 ml-5'>{emailError}</p>

                {/* ======2nd input start====== */}
                <label className=' text-[28px] font-[600px]  text-[#444B59] mt-5 inline-block'>Password</label>
                <br />
                <div className=' relative'>
                  {
                    show? 
                    
                    <FaRegEye      onClick={ handelshow }  className=' top-[20%]  lg:right-5 right-10 md:right-11 absolute text-[20px] ' />
                    :
                    <FaRegEyeSlash  onClick={ handelshow } className=' top-[20%]  lg:right-5 right-10 md:right-11 absolute text-[20px] ' />
                  }

                <input onChange={handelpassword} className='pl-5 border-2 border-solid border-[#789ADE] rounded-full outline-none lg:w-[400px] w-[300px] md:h-[30px] lg:h-[40px]  ' 
                type= { show? 'text': 'password' } placeholder='Enter Your password' />
                </div>
                <br />
                <p className='text-sm font-normal text-red-500 ml-5'>{passwordError}</p>

                <div className=' flex gap-[80px] lg:gap-[170px]  '>
                                           
                    <h2 className='mb-5 text-[#444B59]  ' >
                    Remember me
                    </h2>
                     
                    <p  className='text-[#8699DA]' >Forget password?</p>
                </div>
                 <div className=' flex border-2 mb-5 border-solid bg-[#789ADE] text-white active:scale-[1.1] border-[#789ADE] rounded-full outline-none lg:w-[400px] w-[300px] md:h-[30px] lg:h-[40px]  text-center justify-center items-center mt-10px '  >
                     <button>Sign In</button>
                 </div>
                 <div className='  justify-center items-center text-center ' >
                  <div>
                 
                     <p>or continue with</p>
                  </div>

                 </div>

                  <div className=' flex lg:gap-[60px] gap-[10px] justify-center items-center mt-10  ' >
                     
                      <div className=' px-[30px] py-[20px] rounded-md text-[30px] hover:bg-[#d7e1f4] border-2 border-[#789ADE] items-center justify-center text-center  ' >

                      <a  href="#"> <FaGoogle /> </a>
                      </div>
                      <div className=' px-[30px] py-[20px] rounded-md text-[30px] hover:bg-[#d7e1f4]  border-2 border-[#789ADE] text-[#C8D3F9] items-center justify-center text-center  ' >

                      <a  href="#"> <FaFacebook /> </a>
                      </div>
                      <div className=' px-[30px] py-[20px] rounded-md  text-[30px] hover:bg-[#d7e1f4]  border-2 border-[#789ADE] items-center justify-center text-center  ' >

                      <a  href="#"> <FaApple /> </a>
                      </div>
                  </div>

               
            </form>
            <div>
               <img src="Images/img.png" alt="imge" />
          </div>

              
         
      </div>

           </div>
      </section>
     
     </>
  )
}

export default Login