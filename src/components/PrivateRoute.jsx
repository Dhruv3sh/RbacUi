import { Navigate } from "react-router-dom";
import useCurrentUser from "../context/UserContext";

const PrivateRoute = ({ children }) => {
    const { currentUser } = useCurrentUser();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
