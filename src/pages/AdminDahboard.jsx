import axios from "axios";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import bcrypt from "bcryptjs";
import useCurrentUser from "../context/UserContext";
import { toast } from "react-toastify";

function AdminDashboard() {
  const { users, setUsers, postNewUserInfo } = useCurrentUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isEditorActive, setEditorActive] = useState(false);

  const allPermissions = ["Read", "Update", "Delete", "Manage"];

  const rolePermissions = {
    admin: allPermissions,
    editor: ["Read", "Update", "Delete"],
    user: ["Read"],
  };

  const handleRole = (userId, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, role: newRole, permissions: rolePermissions[newRole] }
          : user
      )
    );
  };

  const handlePermissionChange = (userId, permission) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const updatedPermissions = user.permissions.includes(permission)
            ? user.permissions.filter((p) => p !== permission)
            : [...user.permissions, permission];
          return { ...user, permissions: updatedPermissions };
        }
        return user;
      })
    );
  };

  const handleStatus = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleUpdate = async (userId) => {
    const user = users.find((u) => u.id === userId);
    try {
      const response = await axios.put(`/users/${userId}`, {
        role: user.role,
        status: user.status,
        permissions: user.permissions,
      });

      if (response.status === 200) {
        toast.success("User Updated Successfully!!", {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true
        });
      } else {
        toast.error('Error Updating User', {
          position: "top-center",
          autoClose: 1200,
          theme: "dark",
          hideProgressBar: true
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
      console.error("Error updating user :", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success("User Removed Successfully!!", {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
    } catch (error) {
      console.error("Error deleting user", error);
      toast.error("Error Removing User!!", {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
    }
  };

  const handleAddUser = () => {
    setEditorActive(true);
  };

  const handleCloseBtn = () => {
    setEditorActive(false);
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = {
      name: name,
      email: email,
      role: role,
      status: "Active",
      permissions: rolePermissions[role],
      password: hashedPassword,
    };
    setEditorActive(false);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    await postNewUserInfo(userInfo); 
  };

  return (
    <div className="relative flex flex-col items-center p-4">
      <h1
        className={`text-center text-2xl md:text-4xl font-bold text-gray-800 p-4 ${
          isEditorActive && "transition-all duration-200 blur-sm"
        }`}
      >
        Manage Users
      </h1>
      <div
        className={`w-full max-md:overflow-x-scroll ${
          isEditorActive ? "transition-all duration-200 blur-sm" : ""
        }`}
      >
        <table className="w-full min-w-[640px] table-auto border-collapse bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-sm md:text-lg font-semibold text-gray-700">
              <th className="border border-gray-300 px-2 py-2">User Id</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Permissions</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Update</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="text-center hover:bg-gray-100 transition-colors"
              >
                <td className="border border-gray-300 px-2 py-2">{u.id}</td>
                <td className="border border-gray-300 px-4 py-2">{u.name}</td>
                <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={u.role}
                    onChange={(e) => handleRole(u.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="admin">admin</option>
                    <option value="editor">editor</option>
                    <option value="user">user</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 relative">
                  <details className="relative">
                    <summary className="cursor-pointer">
                      {u.permissions.join(", ")}
                    </summary>
                    <div className="absolute bg-white border border-gray-300 rounded p-2 shadow-lg z-10">
                      {allPermissions.map((perm) => (
                        <label key={perm} className="flex">
                          <input
                            type="checkbox"
                            checked={u.permissions.includes(perm)}
                            onChange={() => handlePermissionChange(u.id, perm)}
                            className="z-20"
                          />
                          {perm}
                        </label>
                      ))}
                    </div>
                  </details>
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    u.status === "Active"
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }`}
                >
                  <select
                    value={u.status}
                    onChange={(e) => handleStatus(u.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2 cursor-pointer">
                  <button
                    onClick={() => handleUpdate(u.id)}
                    className="active:scale-[0.9]"
                  >
                    update
                  </button>
                </td>
                <td className="border border-gray-300 cursor-pointer">
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="active:scale-[0.9] text-red-500"
                  >
                    <MdDeleteForever size={26} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`flex justify-center mt-4 ${
          isEditorActive ? "transition-all duration-200 blur-sm" : ""
        }`}
      >
        <button
          className="bg-red-500 px-4 py-2 rounded-lg active:scale-[0.97] text-white"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      {isEditorActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#9ABF80] shadow-2xl rounded-lg p-6 w-full max-w-md relative">
            <h1 className="text-center text-2xl font-semibold mb-4">
              Add New User
            </h1>
            <form className="space-y-4 " onSubmit={handleNewUser}>
              <input
                className="w-full h-11 rounded-md p-2 text-xl placeholder:text-gray-500"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="w-full h-11 rounded-md p-2 text-xl placeholder:text-gray-500"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="w-full h-11 rounded-md p-2 text-xl placeholder:text-gray-500"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <select
                className="w-full h-11 rounded-md p-2 text-xl placeholder:text-gray-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="user">User</option>
              </select>
              <button
                className="w-full bg-red-500 hover:bg-red-600 px-6 py-2 text-white font-semibold rounded-md"
                type="submit"
              >
                Add
              </button>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={handleCloseBtn}
            >
              <RxCross2 size={26} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

