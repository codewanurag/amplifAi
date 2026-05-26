import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { workspaceService } from "../services/workspaceService";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const auth = useAuth();
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    let active = true;
    if (!auth.user) {
      setWorkspaces([]);
      return undefined;
    }
    workspaceService.list().then((items) => {
      if (active) setWorkspaces(items);
    }).catch(() => {
      if (active) setWorkspaces(auth.workspace ? [auth.workspace] : []);
    });
    return () => {
      active = false;
    };
  }, [auth.user, auth.workspace?._id]);

  const value = useMemo(() => ({
    workspaces,
    current: auth.workspace,
    async create(values) {
      const workspace = await workspaceService.create(values);
      setWorkspaces((items) => [workspace, ...items]);
      return workspace;
    },
    async switchTo(id) {
      const workspace = await workspaceService.switchTo(id);
      auth.setWorkspace(workspace);
      return workspace;
    },
    async update(values) {
      const workspace = await workspaceService.update(auth.workspace._id, values);
      auth.setWorkspace(workspace);
      setWorkspaces((items) => items.map((item) => (item._id === workspace._id ? workspace : item)));
      return workspace;
    },
  }), [auth, workspaces]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
