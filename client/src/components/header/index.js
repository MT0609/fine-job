import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Paper, Avatar, Button } from "@material-ui/core";
import { AccountCircle, PeopleAlt, Work, Chat, Menu } from "@material-ui/icons";
import UserSubMenu from "../usermenu";
import SidebarMenu from "../../container/sidebar/menu";
import { ROUTES } from "../../constants/routes";
import styles from "./header.module.scss";

function Header() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword") || "";
  const cate = queryParams.get("cate") || "all";
  const history = useHistory();
  const [textSearch, SetTextSearch] = useState(keyword);

  useEffect(() => {
    SetTextSearch(keyword);
  }, [keyword]);

  const [firstPathName, setFirstPathName] = useState(location.pathname);
  useEffect(() => {
    setFirstPathName(location.pathname.split("/")[1]);
  }, [location.pathname]);

  const handleSearch = (keyword) => {
    history.push(`/search?keyword=${keyword}&cate=${cate}`);
  };

  const auth = useSelector((state) => state.auth);

  const [dropdownAnchor, setDropdownAnchor] = useState(null);

  const handleClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setDropdownAnchor(null);
  };

  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <div className={styles.header__left}>
          <div className={styles.header__thumbnail}>
            <Link to={ROUTES.jobs}>
              <img
                // src="https://edumax.edu.vn/wp-content/uploads/2013/12/03.12.2013-TOEIC-b4.jpg"
                src="https://www.funnp.com/funny_pictures/464246679-funny_avatar_man_woman_toilet_sign.jpg"
                alt="Fine_Job"
              />
            </Link>
          </div>
          <input
            className={styles.header__search}
            placeholder="Search..."
            value={textSearch}
            onChange={(e) => SetTextSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e.target.value);
            }}
          />
        </div>
        <div className={styles.header__links}>
          <ul>
            <li>
              <Link to="/">
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
              <Link to={ROUTES.jobs}>
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
              <Link to={ROUTES.messages}>
                <Chat />
                <span>Messages</span>
              </Link>
            </li>

            <div className={styles.header__hamburger}>
              <Button onClick={() => setSidebarShow(true)}>
                <Menu />
              </Button>
              <SidebarMenu
                auth={auth}
                show={sidebarShow}
                onclose={() => setSidebarShow(false)}
              />
            </div>

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
                <Link to={ROUTES.authen}>
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
