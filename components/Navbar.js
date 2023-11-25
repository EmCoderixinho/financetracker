import styles from "../styles/Navbar.module.css";
import Link from "next/link";

import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const context = useAuthContext();

  //console.log(context);

  return (
    <nav>
      <div className={styles.navbar}>
        <ul>
          <li className={styles.title}>
            <Link href="/">myMoney</Link>
          </li>
          {!context.user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Sign up</Link>
              </li>
            </>
          )}
          {context.user && (
            <>
              <li>Hello, {context.user.displayName}</li>
              <li>
                <button className="btn" onClick={logout}>
                  Log out
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
