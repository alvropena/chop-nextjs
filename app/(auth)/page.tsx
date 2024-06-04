import { useUser } from "@auth0/nextjs-auth0/client";

export default function Login() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <a href="/api/auth/logout">Logout</a>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}
