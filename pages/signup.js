import { useState } from "react";
import styles from "../styles/signup.module.css";
import { useSignup } from "../hooks/useSignup";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const router = useRouter()
  const {user} = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName);
  };

  if(user) router.push('/')

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && <button className="btn"> Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
      { error && <p>{error}</p>}
    </form>
  );
}
