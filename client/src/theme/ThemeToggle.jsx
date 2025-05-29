const ThemeToggle = ({ darkMode, toggleTheme }) => (
  <label className="switch">
    <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
    <span className="slider"></span>
  </label>
);

export default ThemeToggle;
