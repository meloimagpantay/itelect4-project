// src/components/Layout.tsx
// ===== SESSION 6: the top of this file, before today ===================
// import { NavLink, Outlet } from "react-router";
// import useToggle from "../hooks/useToggle";
// import useAuthStore from "../store/authStore";  // we build this later today
//
// function Layout() {
//   // Dark mode MOVES here, out of Session 5's App.tsx
//   const [isDarkMode, toggleDarkMode] = useToggle(false);
//   const userName = useAuthStore((state) => state.userName);
//   const logout = useAuthStore((state) => state.logout);
//
// NOTE: Only those lines changed. Everything below -- linkClass, the
//       nav bar, the Outlet -- is byte for byte last week's file.
// ===== SESSION 7: dark mode now comes from the store ===================
import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore";

function Layout() {
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);

  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  // The classes every nav link shares, then the two variants
  const base = "rounded px-3 py-1.5 text-sm";
  const activeLink = `${base} bg-blue-600 font-semibold text-white`;
  const idleLink = `${base} text-gray-700 hover:bg-gray-200 dark:text-gray-300`;
 
  // NavLink hands this function an isActive flag on every render
  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? activeLink : idleLink;
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
 
        <nav className="flex flex-wrap items-center gap-2 border-b
          border-gray-200 bg-white p-4 dark:border-gray-700
          dark:bg-gray-800">
 
          <span className="mr-4 font-bold text-gray-900 dark:text-white">
            Submission Tracker
          </span>
 
          <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>
          <NavLink to="/submissions" className={linkClass}>
            Submissions
          </NavLink>
          {userName === null ? (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <button onClick={logout}
              className="rounded px-3 py-1.5 text-sm text-gray-700
                dark:text-gray-300">
              Logout ({userName})
            </button>
          )}
 
          <button onClick={toggleDarkMode}
            className="ml-auto rounded bg-gray-800 px-3 py-1.5 text-sm
              text-white dark:bg-gray-200 dark:text-gray-900">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>
 
        <main className="p-6">
          <Outlet />                       {/* <-- THE HOLE */}
        </main>
 
      </div>
    </div>
  );
}
 
export default Layout;
