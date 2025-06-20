import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import {
    FaHome,
    FaBoxOpen,
    FaShoppingCart,
    FaUsers,
    FaCog,
    FaChartBar,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUser,
    FaBell,
    FaSearch,
    FaTags,
    FaList,
    FaChevronDown,
    FaChevronRight,
    FaClipboardList,
    FaStore,
    FaUserCircle,
    FaCogs
} from 'react-icons/fa';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const { auth } = usePage().props;
    const userDropdownRef = useRef(null);

    // Responsive fix: close sidebar on desktop resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        if (window.innerWidth >= 1024) {
            setSidebarOpen(false);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close user dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setUserDropdownOpen(false);
            }
        }
        if (userDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userDropdownOpen]);

    // Sidebar navigation for ecommerce with submenus
    const navigation = [
        {
            name: 'Dashboard',
            href: route('admin.dashboard'),
            icon: FaHome,
        },
        {
            name: 'Products',
            icon: FaBoxOpen,
            subItems: [
                { name: 'All Products', href: '#', icon: FaList },
                { name: 'Categories', href: '#', icon: FaTags },
                { name: 'Inventory', href: '#', icon: FaClipboardList },
            ],
        },
        {
            name: 'Orders',
            icon: FaShoppingCart,
            subItems: [
                { name: 'All Orders', href: '#', icon: FaList },
                { name: 'Returns', href: '#', icon: FaChevronRight },
            ],
        },
        {
            name: 'Customers',
            href: '#',
            icon: FaUsers,
        },
        {
            name: 'Stores',
            href: '#',
            icon: FaStore,
        },
        {
            name: 'Analytics',
            href: '#',
            icon: FaChartBar,
        },
        {
            name: 'Settings',
            href: '#',
            icon: FaCog,
        },
    ];

    const toggleSidebar = () => {
        setSidebarOpen((open) => !open);
    };

    const handleMenuClick = (name) => {
        setOpenMenus((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex">
            {/* Sidebar */}
            <aside
                className={`
                    fixed z-40 inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-purple-100 transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0 lg:static lg:inset-0
                `}
                style={{ willChange: 'transform' }}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-purple-100 bg-gradient-to-r from-purple-700 to-purple-800">
                    <div className="flex items-center">
                        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow">
                            <span className="text-purple-800 font-extrabold text-xl">A</span>
                        </div>
                        <span className="ml-3 text-white font-bold text-xl tracking-wide">Admin <sup>1.0</sup></span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden text-white hover:text-purple-200 transition"
                        aria-label="Close sidebar"
                    >
                        <FaTimes className="h-6 w-6" />
                    </button>
                </div>
                <nav className="mt-8 px-4">
                    <ul className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            if (item.subItems) {
                                return (
                                    <li key={item.name}>
                                        <button
                                            type="button"
                                            onClick={() => handleMenuClick(item.name)}
                                            className="flex items-center w-full px-4 py-3 rounded-lg text-purple-800 font-medium hover:bg-purple-100 transition group focus:outline-none"
                                        >
                                            <Icon className="h-5 w-5 mr-3 text-purple-500 group-hover:text-purple-700 transition" />
                                            <span className="flex-1 text-left">{item.name}</span>
                                            <span>
                                                {openMenus[item.name] ? (
                                                    <FaChevronDown className="h-4 w-4 text-purple-400" />
                                                ) : (
                                                    <FaChevronRight className="h-4 w-4 text-purple-400" />
                                                )}
                                            </span>
                                        </button>
                                        {openMenus[item.name] && (
                                            <ul className="ml-8 mt-1 space-y-1">
                                                {item.subItems.map((sub) => {
                                                    const SubIcon = sub.icon;
                                                    return (
                                                        <li key={sub.name}>
                                                            <Link
                                                                href={sub.href}
                                                                className="flex items-center px-3 py-2 rounded-lg text-purple-700 font-normal hover:bg-purple-50 transition group"
                                                            >
                                                                <SubIcon className="h-4 w-4 mr-2 text-purple-400 group-hover:text-purple-700 transition" />
                                                                <span>{sub.name}</span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center px-4 py-3 rounded-lg text-purple-800 font-medium hover:bg-purple-100 transition group"
                                    >
                                        <Icon className="h-5 w-5 mr-3 text-purple-500 group-hover:text-purple-700 transition" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                {/* User section at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-purple-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center shadow">
                                <FaUser className="h-5 w-5 text-white" />
                            </div>
                            <div className="ml-3">
                                <p className="text-base font-semibold text-purple-900">{auth?.user?.name || 'Admin'}</p>
                                <p className="text-xs text-purple-400">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-purple-400 hover:text-purple-700 transition"
                            title="Logout"
                        >
                            <FaSignOutAlt className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                {/* Top header */}
                <header className="bg-white shadow border-b border-purple-100 sticky top-0 z-20 w-full">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 w-full">
                        <div className="flex items-center w-full">
                            <button
                                onClick={toggleSidebar}
                                className="lg:hidden p-2 rounded-md text-purple-700 hover:text-purple-900 hover:bg-purple-100 transition"
                                aria-label="Open sidebar"
                            >
                                <FaBars className="h-6 w-6" />
                            </button>
                            {/* Search bar */}
                            <div className="ml-4 flex-1 max-w-md">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="h-5 w-5 text-purple-300" />
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="block w-full pl-10 pr-3 py-2 border border-purple-100 rounded-lg bg-purple-50 text-purple-900 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <button className="p-2 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-full relative transition">
                                <FaBell className="h-6 w-6" />
                                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                            </button>
                            {/* User dropdown */}
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-purple-100 transition focus:outline-none"
                                    onClick={() => setUserDropdownOpen((open) => !open)}
                                    aria-haspopup="true"
                                    aria-expanded={userDropdownOpen}
                                >
                                    <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center shadow">
                                        <FaUser className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="hidden md:block text-base font-semibold text-purple-900">
                                        {auth?.user?.name || 'Admin'}
                                    </span>
                                    <FaChevronDown className="ml-1 text-purple-400" />
                                </button>
                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-purple-100 z-50">
                                        <Link
                                            href="#"
                                            className="flex items-center px-4 py-3 text-purple-800 hover:bg-purple-50 transition"
                                        >
                                            <FaUserCircle className="h-5 w-5 mr-2 text-purple-500" />
                                            Profile
                                        </Link>
                                        <Link
                                            href="#"
                                            className="flex items-center px-4 py-3 text-purple-800 hover:bg-purple-50 transition"
                                        >
                                            <FaCogs className="h-5 w-5 mr-2 text-purple-500" />
                                            Setting
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-3 text-purple-800 hover:bg-purple-50 transition"
                                        >
                                            <FaSignOutAlt className="h-5 w-5 mr-2 text-purple-500" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                {/* Page content */}
                <main className="p-4 lg:p-8 lg:ml-4">
                    {children}
                </main>
                
            </div>
        </div>
    );
};

export default Layout;
