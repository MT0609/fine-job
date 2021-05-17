import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Paper, Link, Avatar } from "@material-ui/core";
import { AccountCircle, PeopleAlt, Work, Chat } from "@material-ui/icons";
import UserSubMenu from "../usermenu";
import { ROUTES } from "../../constants/routes";
import styles from "./header.module.scss";

function Header() {
  const [firstPathName, setFirstPathName] = useState("");
  useEffect(() => {
    setFirstPathName(window.location.pathname.split("/")[1]);
  }, []);

  const auth = useSelector((state) => state.auth);

  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const handleClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setDropdownAnchor(null);
  };

  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <Link href={ROUTES.jobs} className={styles.header__thumbnail}>
          <img
            // src="https://edumax.edu.vn/wp-content/uploads/2013/12/03.12.2013-TOEIC-b4.jpg"
            src="https://www.funnp.com/funny_pictures/464246679-funny_avatar_man_woman_toilet_sign.jpg"
            alt="Fine_Job"
          />
        </Link>
        <div className={styles.header__links}>
          <ul>
            <li>
              <Link href="">
                <PeopleAlt />
                <span>My Network</span>
              </Link>
            </li>
            <li
              className={
                `${firstPathName}` === ROUTES.jobs.replace("/", "") ||
                `${firstPathName}` === ROUTES.home.replace("/", "")
                  ? styles["header__links--active"]
                  : ""
              }
            >
              <Link href={ROUTES.jobs}>
                <Work />
                <span>Jobs</span>
              </Link>
            </li>
            <li
              className={
                `${firstPathName}` === ROUTES.messages.replace("/", "")
                  ? styles["header__links--active"]
                  : ""
              }
            >
              <Link href={ROUTES.messages}>
                <Chat />
                <span>Messages</span>
              </Link>
            </li>
            {auth.isAuth ? (
              <li className={styles.header__userIcon}>
                <button onClick={handleClick}>
                  <Avatar
                    style={{
                      height: "1.6rem",
                      width: "1.6rem",
                      marginBottom: "0.4rem",
                    }}
                    alt="Avatar"
                    src="https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                  />
                  <span>Me</span>
                </button>
                <Paper className={styles.header__userIcon__submenu}>
                  <UserSubMenu
                    user={auth.user}
                    anchorEl={dropdownAnchor}
                    open={Boolean(dropdownAnchor)}
                    onclose={handleClose}
                  />
                </Paper>
              </li>
            ) : (
              <li
                className={
                  `${firstPathName}` === ROUTES.authen.replace("/", "")
                    ? styles["header__links--active"]
                    : ""
                }
              >
                <Link href={ROUTES.authen}>
                  <AccountCircle />
                  <span>Login/Register</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>
    </header>
  );
}

export default Header;
