import { supabase } from "../lib/supabase";

export async function getConversation() {
  const { data, error } = await supabase
    .from("conversation_members")
    .select("conversation_id")
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data.conversation_id;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      conversation_id,
      sender_id,
      message_type,
      content,
      created_at
    `,
    )
    .eq("conversation_id", conversationId)
    .eq("message_type", "text")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function sendMessage(conversationId, senderId, content) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      message_type: "text",
      content: content.trim(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
