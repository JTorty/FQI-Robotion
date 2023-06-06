import logo from './assets/logo-white.svg';
import './style/header.css';

function Header() {
  return (
      <header>
          <img src={logo} className="logo" alt="logo" />
      </header>
  );
}

export default Header;
