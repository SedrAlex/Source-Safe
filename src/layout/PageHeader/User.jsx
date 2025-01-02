import React, { useState } from 'react';
import styles from './styles.module.scss';
import Submenu from '@ui/Submenu';
import SettingsPopup from '@layout/BottomNav/SettingsPopup';
import useSubmenu from '@hooks/useSubmenu';
import { useWindowSize } from 'react-use';
import useStoreRoute from '@hooks/useStoreRoute';
import { useShopProvider } from '@contexts/shopContext';
import userImage from '@assets/user.webp';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from 'api/auth/authApi';
import { clearUser } from 'api/user/userSlice';
import { useNavigate } from 'react-router';

const User = () => {
    const [popupOpen, setPopupOpen] = useState(false);
    const { anchorEl, open, handleClick, handleClose } = useSubmenu();
    const isTablet = useWindowSize().width < 1280;
    const isStoreRoute = useStoreRoute();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { setCartOpen } = useShopProvider();
    const user = useSelector((state) => state.user);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('auth_Token'); 
            dispatch(clearUser());
            navigate("/sign-in");
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };
    
    const submenuActions = [
        {
            label: 'Logout',
            icon: 'exit',
            onClick: handleLogout
        }
    ];

    return (
        <div className="d-flex align-items-center g-16">
            <div className={styles.avatar}>
                <img className="c-pointer" src={userImage} alt="user" onClick={handleClick} />
                {
                    isStoreRoute && isTablet && (
                        <button className={styles.avatar_cart} aria-label="Shopping cart" onClick={() => setCartOpen(true)}>
                            <i className="icon-bag-solid" />
                        </button>
                    )
                }
            </div>
            <div className="d-flex flex-column">
                <span className="h3" style={{ letterSpacing: 0.2 }}>
                    {user?.user?.name}
                </span>
                <span className="text-12">{user?.user?.email}</span>
            </div>
            <Submenu open={open}
                     onClose={handleClose}
                     anchorEl={anchorEl}
                     actions={submenuActions} />
            <SettingsPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
        </div>
    );
};

export default User;
