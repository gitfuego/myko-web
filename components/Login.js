import styles from './Login.module.scss'
import LoginForm from './LoginForm';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function({clickLogin}) {
  return (
    <div className={styles.container}>
      <div id='login' className={styles.main} >
        <div className={styles.hi}>Welcome back!</div>
        <IconButton style={{width: 'min-content'}} onClick={clickLogin} color="primary">
          <CloseIcon />
        </IconButton>
        <LoginForm />
      </div>
    </div>
  );
}