import { useEffect, useState } from "react";
import styles from "../styles/login.module.css";
import { useLogin } from "../hooks/useLogin";
import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isPending} = useLogin()
  const router = useRouter()
  const {user} = useAuthContext()

  const handleSubmit = (e) =>{
    //console.log(isPending);
    e.preventDefault();
    login(email, password)
  }

  if(user) router.push('/')

  return (
    <form className={styles["login-form"]} onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>Loading...</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
