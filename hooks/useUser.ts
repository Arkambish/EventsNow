import { cookies } from "next/headers";

export default function useUser() {
  const store = cookies();
  const username = store.get("next-auth.session-token")?.value;
  return [username];
}
