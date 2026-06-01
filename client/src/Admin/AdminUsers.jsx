import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext.jsx';
import { fetchAllUsers } from '../services/AdminService.js';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) return;
      
      try {
        const res = await fetchAllUsers();
        console.log("Fetched users:", res.data);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, [user]);

  return (
    <div className="max-w-300 mx-auto my-10 p-8 bg-zinc-900 rounded-xl border border-white/5 text-zinc-50 shadow-xl">
      <h2 className="text-orange-500 mb-6 text-2xl font-semibold">User Directory</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-175">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">ID</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">NAME</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">EMAIL</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">ROLE</th>
              <th className="p-4 text-left text-zinc-400 text-sm font-medium tracking-wider">JOINED</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b border-white/10 hover:bg-zinc-800/50 transition-colors">
                <td className="p-4 text-zinc-300 font-mono text-sm">{u._id.substring(0, 8)}...</td>
                <td className="p-4 text-zinc-300 font-medium">{u.name}</td>
                <td className="p-4 text-zinc-300">{u.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wider ${
                    u.role === 'admin' 
                      ? 'bg-orange-500/20 text-orange-500' 
                      : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-zinc-300">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-zinc-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;