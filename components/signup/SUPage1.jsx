import styles from '../form.module.scss';

export default function({ formData, setFormData, nextPage }) {
  function handleNext() {
    nextPage();
  }

  return (
    <div>
      <h2 className={styles.heading}>Enter your phone number:</h2>
      <div className={styles.container}>
        <input
        className={styles.inputField}
        placeholder="Phone number"
        value={formData.number}
        onChange={(event) =>
          setFormData({ ...formData, number: event.target.value })
        }
        />
        <button className={styles.blackbtn} onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
}