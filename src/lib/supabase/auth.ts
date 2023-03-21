import { Session, User } from "@supabase/supabase-js";

import { supabase } from "./supabase";

export const signIn = async (
  email: string,
  password: string
): Promise<{ user: User; session: Session }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (!data.user || !data.session) {
    throw new Error("サインイン時のユーザー情報取得でエラーがありました。");
  }

  return { user: data.user, session: data.session };
};

export const signOut = async (): Promise<void> => {
  const result = confirm("ログアウトしますか？");
  if (!result) return;

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
