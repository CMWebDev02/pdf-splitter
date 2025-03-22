import type { ChangeEvent, Dispatch } from 'react';
import styles from './styles/view-checkbox.module.css';

interface ViewCheckBoxProps {
  alterView: Dispatch<boolean>;
}

export function ViewCheckBox({ alterView }: ViewCheckBoxProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    alterView(e.target.checked);
  }

  return (
    <div className={styles.mainDiv}>
      <label htmlFor="isTwoPageViewSet">Two Pages</label>
      <input type="checkbox" onChange={handleChange} id="isTwoPageViewSet" />
    </div>
  );
}
