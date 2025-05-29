import ThemeToggle from '../theme/ThemeToggle';

const Header = ({ darkMode, toggleTheme }) => (
  <div className="top-bar">
    <h1 className="app-header">Notes App</h1>
    <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
  </div>
);

export default Header;
