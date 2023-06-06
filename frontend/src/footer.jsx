import logo from './assets/logo-icon.svg';
import './style/footer.css';
import Stack from '@mui/material/Stack';

function Footer() {
  return (
      <footer>
          <Stack direction="row" spacing={2}>
              <img src={logo} className="logo-icon" alt="logo-icon" />
              <span>Copyright © 2023 FenztraQ. All rights reserved.</span>
          </Stack>
          <span className="bottom-links">
              <a href="." className="link">Terms of service</a> • <a href="." className="link">Privacy policy</a>
          </span>
      </footer>
  );
}

export default Footer;
