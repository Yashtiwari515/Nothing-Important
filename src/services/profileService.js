import { supabase } from "../lib/supabase";

export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, last_seen");

  if (error) {
    throw error;
  }

  return data;
}

export async function updateLastSeen(userId) {
  const { error } = await supabase
    .from("profiles")
    .update({
      last_seen: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw error;
  }
}
