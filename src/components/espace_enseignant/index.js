import styles from "./styles.module.css";
import Sidebar from "../sidenavs/sidenavens";
const Main = () => {
  return (
    <div className={styles.main_container}>
      <Sidebar />
    </div>
  );
};

export default Main;
