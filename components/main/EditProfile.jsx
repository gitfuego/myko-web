import { useRouter } from 'next/router';
import styles from './EditProfile.module.scss';
import { useState } from 'react';

export default function({ user, setUser }) {
  const router = useRouter();

  const [newPic, setNewPic] = useState(user?.profile_pic);
  const [newUsername, setNewUsername] = useState(user.username);
  
  function changeImage(e) {
    const input = e.target;
    const reader = new FileReader();

    reader.onload = () => {
      const dataURL = reader.result;
      setNewPic(dataURL);
    }

    reader.readAsDataURL(input.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const file = document.getElementById('profile-pic-upload').files[0];
    let imageUrl = user.profile_pic;
    if (file) {
      // get url in s3 bucket from server endpoint
      const { url } = await fetch('/api/s3Url').then(res => res.json())
      
      // post image to the s3 bucket
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
      })
  
      imageUrl = url.split('?')[0];
    }



    // update path in db
    fetch(`/api/updateProfilePic/${user.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ imageUrl, username: newUsername }),
    })
      .then((data) => {
        setUser({...user, profile_pic: imageUrl, username: newUsername})
        router.push('/home');
      })
      .catch((err) => {
        window.alert('error updating profile');
      })

  }

  return (
  <div className={styles.outer}>
    <div className={styles.main}>
      <header className={styles.header}>
        <div className={styles.topFlex}>
          <button className={styles.back} type='button' onClick={() => { router.back() }}></button>
          <div className={styles.name}><span>Edit Profile</span></div>
          <div></div>
        </div>
      </header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor='profile-pic-upload' className={styles.piclabel}>
        <input id='profile-pic-upload' type='file' accept='image/*' onChange={(e) => changeImage(e)}/>
        <div className={styles.image} style={{backgroundImage: `url(${newPic ?? '/profileicon.svg'})`}}></div>
        <h5>Edit Profile Picture</h5>
        </label>
        <label htmlFor='edit-username' className={styles.editUsername}>
          <input id='edit-username' 
          type='text' 
          placeholder='Name'
          value={newUsername} 
          onChange={(e) => setNewUsername(e.target.value)} />
          <h6>Edit Display Name</h6>
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.submit} type='submit'>Save Changes</button>
          <button className={styles.cancel} type='button' onClick={() => { router.back() }}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
  );
}