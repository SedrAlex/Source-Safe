// GA
import ReactGA from 'react-ga4';

// utils
import {lazy, Suspense} from 'react';

// styles
import ThemeStyles from '@styles/theme';
import './style.scss';

// libs styles
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

// pages


const Login = lazy(() => import('@pages/Login'));
const SignUp = lazy(() => import('@pages/SignUp'));


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
                                                <Route path="/" element={<Login/>}/>
                                                
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
