import React, { useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import useCurrentUser from "../context/UserContext";
import { toast } from "react-toastify";

function Home() {
  const { currentUser, studentsData, setStudentsData } = useCurrentUser();
  const [editRowId, setEditRowId] = useState(null);
  const [editableData, setEditableData] = useState({});

  const handleEditClick = (id) => {
    setEditRowId(id);
    const student = studentsData.find((s) => s.id === id);
    setEditableData(student);
  };

  const handleChange = (field, value) => {
    setEditableData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      const updatedData = studentsData.map((student) =>
        student.id === id ? editableData : student
      );
      setStudentsData(updatedData);
      setEditRowId(null);
      await axios.put(`/students/${id}`, editableData);
      toast.success("Data updated successfully!", {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
      console.error("Error updating student data:", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditableData({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/students/${id}`);
      setStudentsData((prev) => prev.filter((student) => student.id !== id));
      toast.success("Student Removed Successfully", {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
    } catch (error) {
      toast.error("error removing student", {
        position: "top-center",
        autoClose: 1200,
        theme: "dark",
        hideProgressBar: true
      });
      console.error("error removing student", error);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800 p-4">
        Students Result
      </h1>
      <div className="w-full max-w-7xl overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white rounded-lg">
          <thead className="bg-gray-200">
            <tr className="text-sm md:text-lg font-semibold text-gray-700">
              <th className="border border-gray-300 px-2 py-2">ID</th>
              <th className="border border-gray-300 px-2 py-2">Name</th>
              <th className="border border-gray-300 px-2 py-2">Class</th>
              <th className="border border-gray-300 px-2 py-2">Father's Name</th>
              <th className="border border-gray-300 px-2 py-2">Mother's Name</th>
              <th className="border border-gray-300 px-2 py-2">Marks</th>
              <th
                className={`border border-gray-300 px-2 py-2 ${
                  currentUser?.permissions?.includes("Update") ? "" : "hidden"
                }`}
              >
                Update
              </th>
              <th
                className={`border border-gray-300 px-2 py-2 ${
                  currentUser.permissions.includes("Delete") ? "" : "hidden"
                }`}
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {studentsData.map((student) => (
              <tr key={student.id} className="text-center hover:bg-gray-100">
                <td className="border border-gray-300 px-2 py-2 text-sm">
                  {student.id}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {editRowId === student.id ? (
                    <input
                      type="text"
                      value={editableData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full max-w-[120px] border px-2 py-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{student.name}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {editRowId === student.id ? (
                    <input
                      type="text"
                      value={editableData.class}
                      onChange={(e) => handleChange("class", e.target.value)}
                      className="w-full max-w-[60px] border px-2 py-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{student.class}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {editRowId === student.id ? (
                    <input
                      type="text"
                      value={editableData.fathername}
                      onChange={(e) => handleChange("fathername", e.target.value)}
                      className="w-full max-w-[120px] border px-2 py-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{student.fathername}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {editRowId === student.id ? (
                    <input
                      type="text"
                      value={editableData.mothername}
                      onChange={(e) => handleChange("mothername", e.target.value)}
                      className="w-full max-w-[120px] border px-2 py-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{student.mothername}</span>
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  {editRowId === student.id ? (
                    <input
                      type="number"
                      value={editableData.marks}
                      onChange={(e) => handleChange("marks", e.target.value)}
                      className="w-full max-w-[80px] border px-2 py-1 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{`${student.marks}%`}</span>
                  )}
                </td>
                <td className={`border border-gray-300 px-2 py-2 ${currentUser?.permissions?.includes("Update")? "" : "hidden"}`}>
                  {editRowId === student.id ? (
                    <div className="flex flex-col sm:flex-row justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleSave(student.id)}
                        className="text-green-500 text-sm px-2 py-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-500 text-sm px-2 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        currentUser?.permissions?.includes("Update") &&
                        handleEditClick(student.id)
                      }
                      className="text-blue-500 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
                <td
                  className={`border border-gray-300 cursor-pointer ${
                    currentUser.permissions.includes("Delete") ? "" : "hidden"
                  }`}
                >
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="active:scale-[0.9] text-red-500"
                  >
                    <MdDeleteForever size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

