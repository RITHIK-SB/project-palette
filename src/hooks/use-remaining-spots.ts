import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const MAX_REGISTRATIONS = 99;

export function useRemainingSpots() {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchRemaining() {
      const { data, error } = await supabase.rpc("get_remaining_spots");
      if (cancelled) return;
      if (error) {
        setRemaining(null);
        return;
      }
      const value = data as number;
      setRemaining(value);
      setIsFull(value <= 0);
    }

    fetchRemaining();

    return () => {
      cancelled = true;
    };
  }, []);

  return { remaining, isFull, MAX_REGISTRATIONS };
}
