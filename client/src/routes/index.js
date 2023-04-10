import config from '../config';

// Layouts
// Pages
import Dashboard from '../pages/Dashboard';
import User from '../pages/User/UserList';
import Device from '../pages/Device/DeviceList';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [
    { path: config.routes.dashboard, component: Dashboard },
    { path: config.routes.user, component: User },
    { path: config.routes.device, component: Device },
];

export { publicRoutes, privateRoutes };
