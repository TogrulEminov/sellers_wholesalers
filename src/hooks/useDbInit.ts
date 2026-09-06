import { useEffect, useState } from "react";
import { ensureSeeded } from "../services/seedService";

interface DbInitState {
  ready: boolean;
  error: string | null;
}

export function useDbInit(): DbInitState {
  const [state, setState] = useState<DbInitState>({ ready: false, error: null });

  useEffect(() => {
    ensureSeeded()
      .then(() => setState({ ready: true, error: null }))
      .catch((err: unknown) => {
        setState({
          ready: false,
          error: err instanceof Error ? err.message : "Verilənlər bazası yüklənmədi",
        });
      });
  }, []);

  return state;
}
