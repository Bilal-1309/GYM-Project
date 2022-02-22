import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./footer.module.css";
import Contacts from "../Contacts/";
import { loadUsers } from "../../redux/features/admin";

const Footer = () => {
  const users = useSelector((state) => state.adminReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  return (
    <div className={styles.footer} >
      <div className={styles.container}>
        <Contacts />

        <div className={styles.users}>
            {users.map((item) => {
              return (
                <div className={styles.users__img} key={item._id}>
                  {item.img ? <img
                  className={styles.user}
                  src={`/${item.img}`}
                  alt="service"
                /> : <img
                      className={styles.user}
                      src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
                      alt=""
                  />}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
