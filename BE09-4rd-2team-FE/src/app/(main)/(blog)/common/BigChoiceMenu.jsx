import styles from './BigChoiceMenu.module.css';

export default function BigChoiceMenu({ categories, selected, onSelect }) {
  return (
    <div className={styles.menu}>
      {categories.map(category => (
        <span
          key={category}
          onClick={() => onSelect(category)}
          className={`${styles.item} ${selected === category ? styles.itemSelected : ''}`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}
