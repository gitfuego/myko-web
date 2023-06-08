import styles from './Nav.module.scss';

export default function({ tab, changeTab }) {
  return (
    <nav className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <button type='button' className={tab === 'home' ? 'active' : ''} onClick={() => changeTab('home')}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.13672 9.40718L12.5447 2.08984L21.9527 9.40718V20.9058C21.9527 21.4603 21.7325 21.9921 21.3404 22.3842C20.9483 22.7762 20.4165 22.9965 19.8621 22.9965H5.22739C4.67291 22.9965 4.14114 22.7762 3.74906 22.3842C3.35698 21.9921 3.13672 21.4603 3.13672 20.9058V9.40718Z" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button type='button' className={tab === 'explore' ? 'active' : ''} onClick={() => changeTab('explore')}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.4994 19.8621C16.118 19.8621 19.8621 16.118 19.8621 11.4994C19.8621 6.88081 16.118 3.13672 11.4994 3.13672C6.88081 3.13672 3.13672 6.88081 3.13672 11.4994C3.13672 16.118 6.88081 19.8621 11.4994 19.8621Z" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21.9515 21.9515L17.4043 17.4043" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button type='button' className={tab === 'profile' ? 'active' : ''} onClick={() => changeTab('profile')}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.907 21.9517V19.861C20.907 18.7521 20.4664 17.6885 19.6823 16.9044C18.8981 16.1202 17.8346 15.6797 16.7256 15.6797H8.36297C7.25402 15.6797 6.19048 16.1202 5.40632 16.9044C4.62217 17.6885 4.18164 18.7521 4.18164 19.861V21.9517" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.5446 11.4994C14.8539 11.4994 16.7259 9.62734 16.7259 7.31805C16.7259 5.00877 14.8539 3.13672 12.5446 3.13672C10.2353 3.13672 8.36328 5.00877 8.36328 7.31805C8.36328 9.62734 10.2353 11.4994 12.5446 11.4994Z" stroke="#CECECE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <style jsx>{`
        nav div button.active:hover {
          background: unset;
        }
        nav div button.active svg path {
          stroke: black;
          fill: black;
        }
        nav div button:nth-child(2) svg path {
          fill: none;
        }
        nav div button:nth-child(2).active svg path {
          fill: none;
          stroke-width: 3.2;
        }
      `}</style>
    </nav>
  );
}