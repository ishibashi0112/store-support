import { useRouter } from "next/router";
import { useEffect } from "react";

import { supabase } from "@/lib/supabase/supabase";

export const useListenVerifyEmail = (
  active: number,
  setActive: React.Dispatch<React.SetStateAction<number>>
) => {
  const { pathname } = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && pathname === "/auth/signUp") {
        if (!session) return;

        if (session.user.confirmed_at) {
          alert("メール認証の完了が確認できました。");
          setActive((prev) => prev + 1);
          data.subscription.unsubscribe();
        }
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return;
};
