import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast, Id } from "react-toastify";

type PrivateRouteProps = {
  children: JSX.Element;
  mustNotBeAuthenticated?: boolean;
};

export function PrivateRoute({
  children,
  mustNotBeAuthenticated = false,
}: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.user.value);
  const location = useLocation();

  if (mustNotBeAuthenticated && user.isAuth) return <Navigate to="/" />;

  if (mustNotBeAuthenticated && !user.isAuth) return children;

  if (!user.isAuth) {
    toast.error("Você deve se autenticar.");
    return <Navigate to="/signin" />;
  }

  return children;
}
