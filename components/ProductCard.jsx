import styles from '../styles/components/ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.meta}>
          <span className={styles.material}>{product.material}</span>
          {product.woodType !== 'N/A' && (
            <span className={styles.woodType}>{product.woodType}</span>
          )}
        </div>

        <div className={styles.footer}>
          <p className={styles.price}>{product.price}</p>
          <button className={styles.likeButton} aria-label="Add to favorites">
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}
