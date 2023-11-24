import styles from '../styles/Navbar.module.css'

import Link from "next/link";

const Navbar = () => {
    return (
      <nav>
        <div className={styles.navbar}>
          <ul>
            <li className={styles.title}><Link href="/">myMoney</Link></li>

            <li>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Navbar;