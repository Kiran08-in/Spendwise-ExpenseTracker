import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-nav">
                    <NavLink to="/" className="sidebar-link">
                        Dashboard
                    </NavLink>
                     <NavLink to="/income" className="sidebar-link">
                        Income
                    </NavLink>
                     <NavLink to="/expenses" className="sidebar-link">
                        Expenses
                    </NavLink>
                    <NavLink to="/categories" className="sidebar-link">
                        Categories
                    </NavLink>
                    <NavLink to="/reports" className="sidebar-link">
                        Reports
                    </NavLink>
                    <NavLink to="/budget" className="sidebar-link">
                        Budgets
                    </NavLink>
                    <div className="sidebar-divider"> </div>
                        <NavLink to="/setting" className="sidebar-link">
                        Settings
                    </NavLink>
                </div>
            </div>
        </>
    );
}
export default Sidebar;