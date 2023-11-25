import { useRouter } from "next/router";
import { useAuthContext } from "../hooks/useAuthContext";
import styles from "../styles/Home.module.css";
import TransactionForm from "../components/TransactionForm";
import { useCollection } from "../hooks/useCollection";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();

  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", (user ? user.uid : null)],
    ["createdAt", "desc"]
  );

  if (!user) {
    router.push("/login");
    return null;
  }

  //console.log(user);
  //console.log(documents);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        {user && <TransactionForm uid={user.uid} />}
      </div>
    </div>
  );
}
