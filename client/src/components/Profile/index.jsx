import React, { useEffect } from "react";
import styles from "./profile.module.css";
import stylesS from "../Subscriptions/subscription.module.css";
import stylesT from "../Trainers/trainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, uploadAvatar } from "../../redux/features/profile";
import { NavLink, useParams } from "react-router-dom";
import { loadSubscriptions } from "../../redux/features/subscription";
import { loadTrainers } from "../../redux/features/trainer";
import Timer from "./Timer";
import { loadAllCarts, loadCartItems } from "../../redux/features/cart";
import Cart from "../Shop/Cart";
import logo from "../../assets/logo-white.png";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadCartItems(id));
    // eslint-disable-next-line no-use-before-define
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(loadSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadTrainers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllCarts());
  }, [dispatch]);

  const users = useSelector((state) => state.profileReducer.users);

  const userProfile = users.find((user) => user._id === id);

  const subscriptions = useSelector(
    (state) => state.subscriptionsReducer.subscriptions
  );

  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  console.log();

  const subsId = subscriptions.find(
    (item) => item._id === cartItems.subscription
  );

  const trainers = useSelector((state) => state.trainerReducer.trainers);

  const trainer = useSelector((state) => state.cartReducer.cartItems.trainer);

  const trainerId = trainers.find((item) => item._id === trainer);

  const handleChangeImg = (e) => {
    dispatch(uploadAvatar(e.target.files[0], id));
  };

  if (!users.length) {
    return "загрузка";
  }
  return (
    <div className={styles.profile__container}>
      <div className={styles.header}>
        <div className={styles.profile__header__logo}><NavLink to={"/"}>
          <img
              className={styles.profile__header__logo}
              src={logo}
              alt="logo"
          />
        </NavLink></div>
        <div className={styles.header__name}>Мой профиль</div>
        <div className={styles.profile__header__cart}>
          <Cart />
        </div>
      </div>
      <hr/>
      <div className={styles.profile__info__row}>
        <div className={styles.profile__info__user}>
          {userProfile.img ? (
            <div className={styles.profile__image__div}>
              <img width={200} src={`/${userProfile.img}`} alt="avatar" />
            </div>
          ) : (
             <div className={styles.profile__image__div}>
              <img width={200}
               src="https://avatars.mds.yandex.net/get-pdb/1996600/d1725ec1-41d3-4b2c-ab24-91ec603557bf/s375"
               alt="avatar"
              />
             </div>
          )}

          <div className={styles.input__wrapper}>
            <input
              onChange={(e) => handleChangeImg(e)}
              name="file"
              type="file"
              id="input__file"
              className={`${styles.input} ${styles.input__file}`}
            />
            <label htmlFor="input__file" className={styles.input__file_button}>
              <span className={styles.input__file_icon_wrapper}>
                <img
                  className="input__file-icon"
                  src="https://api.icons8.com/download/701b0dd6bd171059d1441478b6cc26171f4df035/Android_L/PNG/512/Very_Basic/picture-512.png"
                  alt="Выбрать файл"
                  width="40"
                />
              </span>
            </label>
          </div>

          <div className={styles.profile__userInfo__div}>
            <div className={styles.profile__userData}>
              Имя: {userProfile.name}
            </div>
            <div className={styles.profile__userData}>
              Вес: {userProfile.weight}
            </div>
            <div className={styles.profile__userData}>
              Почта: {userProfile.email}
            </div>
          </div>
        </div>

        <div className={styles.main__info_purpose}>
          <div>
            <h2>Цель тренировок:</h2>
            <p className={styles.profile__userData}>
              {userProfile.purposeTrain}
            </p>
          </div>
        </div>
      </div>
      {trainerId || subsId ? (
        <div className={styles.footer}>
          {subsId ? (
            <figure className={stylesS.cart} key={subsId._id}>
              <h2 className={stylesS.cart__img__title}>{subsId.name}</h2>
              <img src={`/${subsId.img}`} alt="" />
              <figcaption>
                <h3 className={stylesS.cart__price}>{subsId.price} ₽</h3>
                <p>Абонемент на: {subsId.time / 3600 / 24} дней</p>
                <p>{subsId.text}</p>
                <div className={styles.timer}>
                  <Timer timestampMs={cartItems.subscriptionDeadTime} />
                </div>
              </figcaption>
            </figure>
          ) : null}
          {trainerId ? (
            <figure className={stylesS.cart} key={trainerId._id}>
              <img src={`/${trainerId.img}`} alt=""/>
              <figcaption>
                <h2 className={stylesS.cart__price}>{trainerId.name}</h2>
                <p>{trainerId.description}</p>
                <h1 className={styles.cart__rating}>★{trainerId.rating}</h1>
              </figcaption>
            </figure>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
