// GA
import ReactGA from 'react-ga4';

// utils
import {lazy, Suspense} from 'react';

// styles
import ThemeStyles from '@styles/theme';
import './style.scss';

// libs styles

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./assets/css/line-awesome.min.css";
import "./assets/scss/main.scss";
import "./assets/css/material.css";
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-grid-layout/css/styles.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// fonts
import '@fonts/icomoon/icomoon.woff';

// contexts
import {SidebarProvider} from '@contexts/sidebarContext';
import {ThemeProvider} from 'styled-components';

// hooks
import {useThemeProvider} from '@contexts/themeContext';
import {useEffect, useRef} from 'react';
import {useWindowSize} from 'react-use';
import useAuthRoute from '@hooks/useAuthRoute';

// utils
import {StyleSheetManager} from 'styled-components';
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import {preventDefault} from '@utils/helpers';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

// components
import {Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Sidebar from '@layout/Sidebar';
import BottomNav from '@layout/BottomNav';
import Navbar from '@layout/Navbar';
import ScrollToTop from '@components/ScrollToTop';
import Invitations from '@pages/Invitations';
import Users from '@pages/Users';

// pages


const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));
const Groups = lazy(() => import('@pages/Groups'));
const NewGroup = lazy(() => import('@pages/NewGroup'));
const Invitation = lazy(() => import('@pages/Invitation'));
 const NewFile = lazy(() => import('@pages/NewFile'));
 const Main = lazy(() => import('@pages/Main'));
 const Files = lazy(() => import('@pages/FileManager'));
 const FileDetails = lazy(() => import('@pages/FileManager/FileDetails'));

const App = () => {
    const appRef = useRef(null);
    const {theme, direction} = useThemeProvider();
    const {width} = useWindowSize();
    const isAuthRoute = useAuthRoute();

    // Google Analytics init
    const gaKey = process.env.REACT_APP_PUBLIC_GA;
    gaKey && ReactGA.initialize(gaKey);

    // auto RTL support for Material-UI components and styled-components

    const plugins = direction === 'rtl' ? [rtlPlugin] : [];

    const muiTheme = createTheme({
        direction: direction,
    });

    const cacheRtl = createCache({
        key: 'css-rtl',
        stylisPlugins: plugins,
    });

    useEffect(() => {
        // scroll to top on route change
        appRef.current && appRef.current.scrollTo(0, 0);

        preventDefault();
    }, []);

    return (
        <CacheProvider value={cacheRtl}>
            <MuiThemeProvider theme={muiTheme}>
                <SidebarProvider>
                    <ThemeProvider theme={{theme: theme}}>
                        <ThemeStyles/>
                        <ToastContainer theme={theme} autoClose={2500} position={direction === 'ltr' ? 'top-right' : 'top-left'}/>
                        <StyleSheetManager stylisPlugins={plugins}>
                            <div className={`app ${isAuthRoute ? 'fluid' : ''}`} ref={appRef}>
                                <ScrollToTop/>
                                {
                                    !isAuthRoute && (
                                        <>
                                            <Sidebar/>
                                            {
                                                width < 768 && <Navbar/>
                                            }
                                            {
                                                width < 768 && <BottomNav/>
                                            }
                                        </>
                                    )
                                }
                                <div className="app_container">
                                    <div className="app_container-content d-flex flex-column flex-1">
                                        <Suspense>
                                            <Routes>
                                            <Route path="/" element={<Main/>}/>
                                                <Route path="/sign-in" element={<Login/>}/>
                                                <Route path="/groups" element={<Groups/>}/>
                                                <Route path="/groups/:groupId" element={<NewGroup/>}/>
                                                <Route path="/groups/:groupId/invite" element={<Invitation/>}/>
                                                <Route path="/groups/:groupId/files/new" element={<NewFile/>}/>
                                                <Route path="/groups/:groupId/files" element={<Files/>}/>
                                                <Route path="/files" element={<Files/>}/>
                                                <Route path="/groups/:groupId/files/:fileId/details" element={<FileDetails/>}/>
                                                <Route path="/invitations" element={<Invitations/>}/>
                                                <Route path="/groups/:groupId/users" element={<Users/>}/>

                                                <Route path="/sign-up" element={<SignUp/>}/>
                                            </Routes>
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </StyleSheetManager>
                    </ThemeProvider>
                </SidebarProvider>
            </MuiThemeProvider>
        </CacheProvider>
    );
}

export default App
