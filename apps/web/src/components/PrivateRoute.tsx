import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type PrivateRouteProps = {
  children: JSX.Element;
  mustNotBeAuthenticated?: boolean;
};

export function PrivateRoute({
  children,
  mustNotBeAuthenticated = false,
}: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.user.value);

  if (mustNotBeAuthenticated && user.isAuth) return <Navigate to="/" />;
  if (mustNotBeAuthenticated && !user.isAuth) return children;

  if (!user.isAuth) return <Navigate to="/signin" />;

  return children;
}
