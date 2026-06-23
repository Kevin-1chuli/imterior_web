import Link from 'next/link';
import CategorySlider from '../components/CategorySlider';
import { getFeaturedProducts, getCategories } from '../data/furniture-data';
import styles from '../styles/Home.module.css';

export default function HomePage() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Welcome to NGB Interiors</p>
          <h1 className={styles.heroHeading}>
            Handcrafted Furniture, Timeless Elegance
          </h1>
          <p className={styles.heroDescription}>
            Discover premium furniture pieces crafted by skilled artisans using
            the finest Ugandan hardwoods. Each piece tells a story of tradition,
            quality, and uncompromising attention to detail.
          </p>
          <div className={styles.heroActions}>
            <Link href="/beds" className="btn btn-primary">
              Shop Beds
            </Link>
            <Link href="/sofas" className="btn btn-outline">
              Shop Sofas
            </Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Curated Selection</p>
            <h2 className="section-heading">Featured Products</h2>
            <p className="section-subheading">
              Our most popular handcrafted pieces, loved by customers across Uganda
            </p>
          </div>
          <CategorySlider products={featuredProducts} />
        </div>
      </section>

      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Browse by Category</p>
            <h2 className="section-heading">Shop Our Collections</h2>
            <p className="section-subheading">
              Explore our complete range of handcrafted furniture
            </p>
          </div>

          <div style={categoriesGridStyle}>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.id}`}
                style={categoryCardStyle}
              >
                <div style={categoryCardContentStyle}>
                  <h3 style={categoryCardTitleStyle}>{category.displayName}</h3>
                  <span style={categoryCardLinkStyle}>
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.helpSection}`} id="help">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">We&apos;re Here to Help</p>
            <h2 className="section-heading">Need Assistance?</h2>
          </div>
          <div className={styles.helpContent}>
            <p className={styles.helpText}>
              Our team is ready to help you find the perfect furniture for your
              space. Contact us for custom orders, delivery inquiries, or design
              consultations.
            </p>
            <div className={styles.helpContact}>
              <div className={styles.contactItem}>
                <span>📞</span>
                <span>+256 700 123 456</span>
              </div>
              <div className={styles.contactItem}>
                <span>✉️</span>
                <span>hello@ngbinteriors.ug</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const categoriesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 'var(--sp-4)',
};

const categoryCardStyle = {
  position: 'relative',
  aspectRatio: '16 / 9',
  borderRadius: 'var(--radius-lg)',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
  display: 'flex',
  alignItems: 'flex-end',
  padding: 'var(--sp-4)',
  transition: 'transform var(--t-base), box-shadow var(--t-base)',
  cursor: 'pointer',
  textDecoration: 'none',
  boxShadow: 'var(--shadow-md)',
};

const categoryCardContentStyle = {
  width: '100%',
  zIndex: 2,
};

const categoryCardTitleStyle = {
  fontFamily: 'var(--f-display)',
  fontSize: 'var(--fs-xl)',
  fontWeight: '700',
  color: 'var(--c-white)',
  marginBottom: 'var(--sp-2)',
};

const categoryCardLinkStyle = {
  fontFamily: 'var(--f-heading)',
  fontSize: 'var(--fs-xs)',
  fontWeight: '600',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--c-gold-light)',
  transition: 'gap var(--t-fast)',
};
