import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {FaUserAstronaut} from 'react-icons/fa';
import {HiOutlineLogout} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const navigate=useNavigate();
    const {userData}=useSelector((state)=>state.user);
    // const [showCreditPopup,setShowCreditPopup]=useState(false);
    const [showUserPopup,setShowUserPopup]=useState(false);
    const [showLogin, setShowLogin]=useState(false);

    const dispatch=useDispatch();
    const handleLogout=async()=>{
        try {
            await logout();
            dispatch(setUserData(null));
            localStorage.removeItem("token");
            // setShowCreditPopup(false);
            setShowUserPopup(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='bg-[#F7F6FE] flex justify-center px-4 pt-4'>
        <div className='w-full max-w-6xl bg-white rounded-3xl border border-gray-200 px-8 py-4 flex justify-between items-center relative'>
            <div className='flex items-center gap-3 cursor-pointer'>
                <div className='bg-indigo-500 text-white py-2 px-3 rounded-lg'>
                    <p className='font-bold'>IP</p>
                </div>
                <h1 className='font-semibold hidden md:block text-lg'>InterviewPrep</h1>

            </div>
            <div className='flex items-center gap-6 relative'>
                {/* <div onClick={()=>{
                    if(!userData){
                        setShowLogin(true);
                        return;
                    }
                    setShowCreditPopup(!showCreditPopup); setShowUserPopup(false)}} className='relative'>
                    <button className='flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition cursor-pointer'>
                        <BsCoin size={20}/>
                        {userData?.credits || 0}
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50 '>
                            <p className='text-sm text-gray-600 mb-4'>You've reached your daily interview limit. Your credits will refresh tomorrow. Please come back then to continue</p>
                        </div>   
                    )}
                </div> */}
                <div className='relative'>
                    <button onClick={()=>{
                         if(!userData){
                        setShowLogin(true);
                        return;
                    }
                        setShowUserPopup(!showUserPopup); }}className='w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold cursor-pointer'>
                        {userData?.name
  ? userData.name.charAt(0).toUpperCase()
  : <FaUserAstronaut />}
                    </button>
                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                            <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
                            <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-400 cursor-pointer'>
                                Interview History
                            </button>
                            <button onClick={()=>navigate("/dashboard")} className='w-full text-left text-sm py-2 hover:text-black text-gray-400 cursor-pointer'>
                                Dashboard
                            </button>
                            <button onClick={handleLogout} className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 cursor-pointer'>
                                <HiOutlineLogout size={16}/>
                                Logout</button>
                        </div>   
                    )}
                </div>
            </div>
        </div>

        {showLogin && <AuthModel onClose={()=>setShowLogin(false)}/>}
    </div>
  )
}

export default Navbar