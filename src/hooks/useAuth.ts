import { useLiveQuery } from "dexie-react-hooks";
import { getAuthState } from "../services/authService";
import type { AuthUser } from "../db/types";

export function useAuth():
  | { isAuthenticated: boolean; user: AuthUser | null; loading: true }
  | { isAuthenticated: boolean; user: AuthUser | null; loading: false } {
  const auth = useLiveQuery(() => getAuthState(), []);

  if (auth === undefined) {
    return { isAuthenticated: false, user: null, loading: true };
  }

  return { ...auth, loading: false };
}
