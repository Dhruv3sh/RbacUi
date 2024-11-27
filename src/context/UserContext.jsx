import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext()

export const UserProvider = ({children})=>{
    const [users, setUsers] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [currentUser, setCurrentUser] = useState(()=>{
        const storedUser = localStorage.getItem('currentUser')
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(()=>{
        if(currentUser){
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }else{
            localStorage.removeItem('currentUser')
        }
    },[currentUser]);

    useEffect(() => {
      const fetchAllData = async () => {
          try {
              await Promise.all([fetchAllUsers(), fetchStudents()]);
          } catch (error) {
              setError(error.message);
          }
      };
      fetchAllData();
  }, []);
    
      const fetchAllUsers = async () =>{
        try {
          const response = await axios.get('/users');
          setUsers(response.data);
        } catch (error) {
          console.error('error fetching user in appJs',error)
        }
      }
    
      const fetchStudents = async () => {
        try {
          const response = await axios.get("/students");
          setStudentsData(response.data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      const postNewUserInfo = async (newUserInfo) => {
        try {
          const response = await axios.post("/users", newUserInfo);
          if(response){
            toast.success("User Added Successfully!!", {
              position: "top-center",
              autoClose: 1200,
              theme: "dark",
              hideProgressBar: true
            }); 
          };
          fetchAllUsers();
        } catch (error) {
          toast.success(error.message, {
            position: "top-center",
            autoClose: 1200,
            theme: "dark",
            hideProgressBar: true
          });
          console.error("Error posting data:", error);
        }
      };

  
    return(
        <UserContext.Provider value={{users, setUsers,studentsData, setStudentsData, currentUser, setCurrentUser, postNewUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

const useCurrentUser = ()=>{
    return useContext(UserContext);
}

export default useCurrentUser