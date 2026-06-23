import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import { getProductsByCategory } from '../../data/furniture-data';
import styles from '../../styles/Category.module.css';

export const metadata = {
  title: 'Sofas & Living Room Furniture - NGB Interiors',
  description: 'Handcrafted sofas and living room furniture. Contemporary, classic, and modern designs.',
};

export default function SofasPage() {
  const products = getProductsByCategory('sofas');

  return (
    <>
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>Sofas & Living Room</h1>
        <p className={styles.categorySubtitle}>
          Elegant sofas crafted for comfort and sophistication. From contemporary
          designs to classic styles, find the perfect centerpiece for your living space.
        </p>
      </div>

      <section className="section">
        <div className="container">
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>

          {products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🛋️</div>
              <p className={styles.emptyStateText}>
                No sofas available at the moment
              </p>
              <Link href="/" className="btn btn-primary">
                Explore Other Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
