import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../styles/Home.module.css";

export default function Home() {

  const router = useRouter()
  const {user} = useAuthContext()

  if(!user) router.push('/login');

  return <div>home</div>;
}
