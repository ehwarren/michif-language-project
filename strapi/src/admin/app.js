import Logo from './extensions/logo.png';
import LogoSquare from './extensions/logo-square.png';

export default {
  config: {
    locales: [
      'en'
    ],
    auth: {
      logo: Logo,
    },
    menu: {
      logo: LogoSquare
    },
    tutorials: false,
    notification: {
      release: false
    }
  },
  bootstrap(app) {
  },
};
