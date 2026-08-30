import logo from '../assets/sw.full.logo.png'; 
import './Navbar.css'

function Navbar() {
    return (
        <>
            <header className="topbar">
                <div className="topbar-logo">
                    <img src={logo} alt="spendwise logo" />
                </div>

                <div className="topbar-search">
                    <input type="text" placeholder="Search transactions" />
                </div>

                <div className="topbar-actions">
                    <button className="icon-btn">🔔</button>
                    <div className="topbar-profile">
                        <div className="avatar">K</div>
                        <span>Kiran</span>
                    </div>
                </div>
            </header>
        </>
    );
}
export default Navbar;