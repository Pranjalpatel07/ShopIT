import React, { useContext } from "react";
import { AuthContext } from "../context/Authcontext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-linear-to-b from-[#0b0d10] to-[#0a0b0d] px-5 py-2 text-white shadow-[0_6px_18px_rgba(2,6,23,0.6)] max-[800px]:px-4 max-[800px]:py-3 max-[560px]:items-start max-[560px]:gap-y-3">
      
      <div>
        <Link to="/" className="inline-flex items-center gap-2.5">
          <img
            src="/image/logo.png"
            alt="ShopIt"
            className="h-9 w-25 rounded-lg bg-[rgba(255,255,255,0.03)] object-cover shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] max-[800px]:h-7.5"
          />
        </Link>
      </div>

      <ul className="flex list-none items-center gap-4.5 p-0 max-[800px]:gap-3 max-[560px]:w-full max-[560px]:justify-between">
        
        <li>
          <Link className="rounded-lg px-2.5 py-2 text-[15px] text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.02)] hover:text-white" to="/shop">
            Shop
          </Link>
        </li>

        <li>
          <Link className="rounded-lg px-2.5 py-2 text-[15px] text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.02)] hover:text-white" to="/cart">
            Cart ({cartItems.length})
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link className="rounded-lg px-2.5 py-2 text-[15px] text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.02)] hover:text-white" to="/profile">
                Hi, {user.name}
              </Link>
            </li>

            {user.role === "admin" && (
              <li>
                <Link className="rounded-lg px-2.5 py-2 text-[15px] text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.02)] hover:text-white" to="/admin">
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-lg border border-[rgba(255,255,255,0.06)] px-3 py-1.5 text-gray-400 transition-all duration-150 hover:-translate-y-0.5 hover:bg-linear-to-r hover:from-[rgba(255,107,69,0.12)] hover:to-[rgba(255,107,69,0.06)] hover:text-white"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link className="rounded-lg px-2.5 py-2 text-[15px] text-gray-400 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgba(255,255,255,0.02)] hover:text-white" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;