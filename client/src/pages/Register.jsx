import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/authService.js";
import { AuthContext } from "../context/Authcontext.jsx"; 

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await userRegister({name, email, password});
            
            if(res.status === 400){
                alert(res.data.message);
            }
            login(res);
            navigate("/");
            
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-linear-to-br from-amber-600 via-gray-900 to-black">
            
           
            <div className="backdrop-blur-lg bg-white/10 p-10 sm:p-14 rounded-2xl shadow-2xl border border-white/20 w-full max-w-md">
                
                <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wider">Register</h2>
                
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    />

                   
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    />
                    
                    
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                    />
                    
                   
                    <button 
                        type="submit"
                        className="mt-2 p-3 rounded-lg bg-white/20 text-white font-bold hover:bg-white/30 border border-white/10 transition-all shadow-[0_4px_14px_0_rgba(255,255,255,0.1)]"
                    >
                        Register
                    </button>
                </form>
                
                <p className="mt-6 text-center text-gray-200">
                    Already have an account?{' '}
                    <Link to="/login" className="text-white font-bold hover:text-blue-600 drop-shadow-md">
                        Login
                    </Link>
                </p>
                
            </div>
        </div>
    );
};

export default Register;