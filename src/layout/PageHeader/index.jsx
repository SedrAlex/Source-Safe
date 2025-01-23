// styling
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";

// components
import { Helmet } from "react-helmet";
import RangeSlider from "@ui/RangeSlider";
import SidebarTrigger from "@ui/SidebarTrigger";
import Search from "./Search";
import TruncatedText from "@components/TruncatedText";
import { Link } from "react-router-dom";
import  noti  from "../../assets/noti.jpg";

// hooks
import { useWindowSize } from "react-use";
import { useThemeProvider } from "@contexts/themeContext";
import { useShopProvider } from "@contexts/shopContext";
import useMeasure from "react-use-measure";
import useStoreRoute from "@hooks/useStoreRoute";

// utils
import PropTypes from "prop-types";
import User from "./User";
import { useGetUnReadNotificationsQuery } from "api/groups/groupsApi";

const TabletHeader = ({ title }) => {
  const [ref, { width }] = useMeasure();
  const [flag, setflag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <div
      className={`${styles.tablet} d-flex align-items-center justify-content-between g-20`}
    >
      <div className="d-flex align-items-center flex-1 g-30">
        <SidebarTrigger />
        <div className="flex-1" ref={ref}>
          <TruncatedText
            className={`${styles.title} h2`}
            text={title}
            width={width}
            lines={1}
          />
        </div>
      </div>
      <div className="d-flex align-items-center g-20">
        <Search />
        <User />
      </div>
    </div>
  );
};

const DesktopHeader = ({ title }) => {
  const { width } = useWindowSize();
  const {
    theme,
    toggleTheme,
    fontScale,
    changeFontScale,
    direction,
    toggleDirection,
  } = useThemeProvider();
  const { setCartOpen } = useShopProvider();
  const [ref, { width: titleWidth }] = useMeasure();
  const isStoreRoute = useStoreRoute();
  const [flag, setflag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false);
  const { data:notifications } = useGetUnReadNotificationsQuery();
  const iconStyle = {
    fontSize: "24px",
    padding:"4px",
    color:"rgb(111, 135, 56)",
    position: "relative",
    display: "inline-block",
  };

  const badgeStyle = {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "#FFC348",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
  };


  const handleNotification = () => {
    setflag(false);
    setIsOpen(false);
    setProfile(false);
  };
  return (
    <div
      className={`${styles.desktop} d-flex justify-content-between align-items-center g-20`}
    >
      <div className="d-flex align-items-center flex-1 g-30">
        {width < 1920 && <SidebarTrigger />}
        <div className="flex-1" ref={ref}>
          <TruncatedText
            className={`${styles.title} h2`}
            text={title}
            width={titleWidth}
            lines={1}
          />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <Search />
        <div className="d-flex g-30" style={{ margin: "0 50px" }}>
          <button className={`${styles.control} h5`} onClick={toggleTheme}>
            <i className={`icon-${theme === "light" ? "moon" : "sun"}`} />
            Theme
          </button>

          <button className={`${styles.control} h5`} onClick={toggleDirection}>
            <i className="icon icon-book-regular" />
            {direction === "ltr" ? "RTL" : "LTR"}
          </button>
          <li className="dropdown h5">
            <Link
              to="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
              onClick={handleNotification}
            >
              <i className="icon icon-bell-regular" style={iconStyle}/>
              {notifications?.data?.length > 0 && (
                <span style={badgeStyle}>{notifications.data.length}</span>
              )}
            </Link>
            <div
              className={`dropdown-menu dropdown-menu-end notifications ${
                notification ? "show" : ""
              }`}
            >
              <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <Link
                  to="#"
                  className="clear-noti text-[#DFAA42]"
                >
                  {" "}
                  Clear All{" "}
                </Link>
              </div>
              <div className="noti-content">
                <ul className="notification-list">
                  {notifications?.data?.map((val, index) => {
                    return (
                      <li className="notification-message" key={index}>
                        <Link
                          onClick={() =>
                            localStorage.setItem("minheight", "true")
                          }
                          to="/app/administrator/activities"
                        >
                          <div className="media d-flex">
                            <span className="avatar flex-shrink-0">
                              <img alt="" src={noti} />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">{val.data.message}</span>{" "}
                                {val.contents}{" "}
                                <span className="noti-title">
                                  {val.contents_2}
                                </span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">
                                  {val.created_at}
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <Link
                  onClick={() => localStorage.setItem("minheight", "true")}
                  to="/app/administrator/activities"
                >
                  View all Notifications
                </Link>
              </div>
            </div>
          </li>
          <div className="d-flex g-16">
            <span className={`${styles.control} h5`}>
              <i className="icon-text" /> Font size
            </span>
            <RangeSlider
              value={fontScale}
              onChange={(e) => changeFontScale(e.target.value)}
              min={1}
              max={1.06}
              step={0.01}
            />
          </div>

          {isStoreRoute && (
            <button
              className={`${styles.control} ${styles[direction]} h5`}
              onClick={() => setCartOpen(true)}
            >
              <i className="icon icon-bag-solid" />
              <span className={styles.control_indicator} />
              Cart (2 items)
            </button>
          )}
        </div>
        <User />
      </div>
    </div>
  );
};

const PageHeader = ({ title }) => {
  const { width } = useWindowSize();

  return (
    <>
      <Helmet>
        <title>{title} | Source Safe</title>
      </Helmet>
      {width < 1280 ? (
        width < 768 ? (
          <h1 className={`${styles.title} h2`}>{title}</h1>
        ) : (
          <TabletHeader title={title} />
        )
      ) : (
        <DesktopHeader title={title} />
      )}
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
