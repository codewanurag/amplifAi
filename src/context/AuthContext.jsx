import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";
import { hasAuthToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, workspace: null, loading: hasAuthToken() });

  useEffect(() => {
    let active = true;
    if (!hasAuthToken()) return undefined;
    authService.me()
      .then((data) => {
        if (active) setState({ user: data.user, workspace: data.workspace, loading: false });
      })
      .catch(() => {
        if (active) setState({ user: null, workspace: null, loading: false });
      });
    const clearSession = () => setState({ user: null, workspace: null, loading: false });
    window.addEventListener("amplifai:unauthorized", clearSession);
    return () => {
      active = false;
      window.removeEventListener("amplifai:unauthorized", clearSession);
    };
  }, []);

  const value = useMemo(() => ({
    ...state,
    async login(values) {
      const data = await authService.login(values);
      setState({ user: data.user, workspace: data.workspace, loading: false });
      return data;
    },
    async signup(values) {
      const data = await authService.signup(values);
      setState({ user: data.user, workspace: data.workspace, loading: false });
      return data;
    },
    async logout() {
      await authService.logout();
      setState({ user: null, workspace: null, loading: false });
    },
    setWorkspace(workspace) {
      setState((current) => ({ ...current, workspace }));
    },
    setUser(user) {
      setState((current) => ({ ...current, user }));
    },
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
