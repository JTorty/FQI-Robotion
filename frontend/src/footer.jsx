import logo from './assets/logo-icon.svg';
import './style/footer.css';
import Stack from '@mui/material/Stack';

function Footer() {
  return (
      <footer>
          <Stack direction="row" spacing={'0.85vw'}>
              <img src={logo} className="logo-icon" alt="logo-icon" />
              <span>Copyright © 2023 FenztraQ Italia. All rights reserved.</span>
          </Stack>
          <span className="bottom-links">
              <a href="." className="link">Terms of service</a> • <a href="." className="link">Privacy policy</a>
          </span>
      </footer>
  );
}

export default Footer;
