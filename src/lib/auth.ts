import { supabase } from "@/integrations/supabase/client";

/**
 * Checks whether a given user has the 'admin' role in the database.
 */
export async function checkIsAdmin(userId: string): Promise<boolean> {
  if (!userId) return false;

  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    return data.role === "admin";
  } catch {
    return false;
  }
}
