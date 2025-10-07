import { Link } from "react-router-dom";

export default function LoginPage(){
    return(
         <div className="w-full h-screen bg-[url(./loginpic.jpg)] bg-center flex items-center justify-center">
            <dive className=" w-[360px] h-[480px] bg-white/20 backdrop-blur-[10px] rounded-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold text-white text-center my-7">Login</h1>
            <div className="w-[300px]  flex flex-col my-2">
                <span className="text-[16px] font-bold text-amber-50 ">Email</span>
                <input type="text" className="w-[290px] h-[40px] border-2 border-amber-50 rounded-2xl text-lg text-amber-50"></input>
            </div>
            <div className="w-[300px]  flex flex-col my-2">
                <span className="text-[16px] font-bold text-amber-50 ">Password</span>
                <input type="text" className="w-[290px] h-[40px] border-2 border-amber-50 rounded-2xl text-lg text-amber-50"></input>
            </div>
           <button class="my-4 w-[220px] h-[40px] bg-blue-500 rounded-2xl cursor-pointer hover:shadow-md active:translate-y-1 active:bg-blue-600 active:shadow-inner transition-all duration-150 text-white">Login</button>
            <p className="text-white">Don't have an account? <Link to="/register"className="text-blue-500">Sign up</Link> from here</p>
            </dive>
         </div>

    )
}