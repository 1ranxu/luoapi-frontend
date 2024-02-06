import {ProLayoutProps} from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
    pwa?: boolean;
    logo?: string;
    navTheme?: string
} = {
    navTheme: 'light',
    colorPrimary: "#13C2C2",
    layout: 'top',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    splitMenus: false,
    title: '落API',
    pwa: false,
    // logo: 'https://img.luoying.icu/typory/logo.gif',
    iconfontUrl: 'https://img.luoying.icu/typory/logo.gif',
};
export default Settings;
