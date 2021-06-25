import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paper, Avatar, Button } from "@material-ui/core";
import {
  Language,
  AccountCircle,
  PeopleAlt,
  Work,
  Chat,
  Menu,
} from "@material-ui/icons";
import UserSubMenu from "../usermenu";
import LanguageSubMenu from "../language";
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

  const { t } = useTranslation();

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
  const [languageDropdown, setLanguageDropdown] = useState(null);

  const handleLangClick = (event) => {
    setLanguageDropdown(event.currentTarget);
  };
  const handleLangClose = () => {
    setLanguageDropdown(null);
  };

  const handleMeClick = (event) => {
    setDropdownAnchor(event.currentTarget);
  };
  const handleMeClose = () => {
    setDropdownAnchor(null);
  };

  const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <header className={styles.header}>
      <section className={styles.header__container}>
        <div className={styles.header__left}>
          <Link to={ROUTES.jobs}>
            <div className={styles.header__thumbnail}>
              <img
                // src="https://res.cloudinary.com/dghvjalhh/image/upload/v1623952564/avatars/job_xjiuyn.svg"
                src="https://res.cloudinary.com/dghvjalhh/image/upload/v1624443294/avatars/fine_job_logo_bfbrfr.svg"
                alt="Fine_Job"
              />
            </div>
          </Link>

          <input
            className={styles.header__search}
            placeholder={t("header.searchBar")}
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
                <span>{t("header.network")}</span>
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
                <span>{t("header.job")}</span>
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
                <span>{t("header.message")}</span>
              </Link>
            </li>
            <li>
              <a onClick={handleLangClick}>
                <Language />
                <span>{t("header.language")}</span>
              </a>
              <LanguageSubMenu
                anchorEl={languageDropdown}
                open={Boolean(languageDropdown)}
                onclose={handleLangClose}
              />
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
                <button onClick={handleMeClick}>
                  <Avatar
                    style={{
                      height: "1.6rem",
                      width: "1.6rem",
                      marginBottom: "0.4rem",
                    }}
                    alt="Avatar"
                    src="https://mcnewsmd1.keeng.net/netnews/archive/images/2020/07/20/tinngan_011115_916156142_0.jpg"
                  />
                  <span>{t("header.me")}</span>
                </button>
                <Paper className={styles.header__userIcon__submenu}>
                  <UserSubMenu
                    user={auth.user}
                    anchorEl={dropdownAnchor}
                    open={Boolean(dropdownAnchor)}
                    onclose={handleMeClose}
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
                  <span>{t("header.auth")}</span>
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
