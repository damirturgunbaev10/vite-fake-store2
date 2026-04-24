import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Cards from "../components/Cards";
import Card from "../components/Card";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SLIDES = [
  {
    id: 1,
    title: "Summer Collection 2026",
    text: "Get up to 50% off on all electronics and jewelry items.",
    bg: "linear-gradient(135deg, #ff9f43 0%, #ff6b6b 100%)",
    btnColor: "#ff6b6b",
    btnText: "Shop Now",
  },
  {
    id: 2,
    title: "Golden Hour Savings",
    text: "Take an extra 30% off pre-fall arrivals and summer favorites.",
    bg: "linear-gradient(135deg, #FFD194 0%, #702963 100%)",
    btnColor: "#a54f96",
    btnText: "Shop Now",
  },
  {
    id: 3,
    title: "Midsummer Oasis",
    text: "Dive into 40% off premium outdoor and beach essentials.",
    bg: "linear-gradient(135deg, #00AFB9 0%, #005F73 100%)",
    btnColor: "#005F73",
    btnText: "Shop Now",
  },
  {
    id: 4,
    title: "Tropical Heatwave Sale",
    text: "Refresh your vibe. Up to 60% off select curated picks.",
    bg: "linear-gradient(135deg, #99E265 0%, #FFFB7D 100%)",
    btnColor: "#2c571d",
    btnText: "Shop Now",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Alex R.",
    text: "Amazing quality! The electronics I ordered arrived in perfect condition and very fast.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah M.",
    text: "Best jewelry collection I've seen online. The 'Summer Oasis' deals are unbeatable.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ivan K.",
    text: "Great customer support. They helped me choose the right size for the jacket.",
    rating: 4,
  },
  {
    id: 4,
    name: "Elena V.",
    text: "The interface is so smooth and beautiful. Shopping here is a real pleasure!",
    rating: 5,
  },
];

const BENEFITS = [
  { id: 1, icon: "🚚", title: "Free Shipping", desc: "On orders over $100" },
  {
    id: 2,
    icon: "💳",
    title: "Secure Payment",
    desc: "100% protected payments",
  },
  {
    id: 3,
    icon: "🔄",
    title: "Easy Returns",
    desc: "30-day money back guarantee",
  },
  {
    id: 4,
    icon: "🎧",
    title: "24/7 Support",
    desc: "Dedicated friendly support",
  },
];

const StarRating = ({ count }) => (
  <div className={styles.stars}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < count ? styles.starFilled : styles.starEmpty}
      >
        ★
      </span>
    ))}
  </div>
);

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay - now;
      setTimeLeft({
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTrendings = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=8");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        setTrending(await res.json());
      } catch (err) {
        console.log("Loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendings();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
        <p>Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: `.${styles.navNext}`,
            prevEl: `.${styles.navPrev}`,
          }}
          pagination={{ clickable: true, el: `.${styles.swiperPagination}` }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          className={styles.mySwiper}
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <section
                className={styles.banner}
                style={{ background: slide.bg }}
              >
                <div className={styles.bannerContent}>
                  <h1 className={styles.bannerTitle}>{slide.title}</h1>
                  <p className={styles.bannerText}>{slide.text}</p>
                  <Link
                    to="/products"
                    className={styles.shopButton}
                    style={{ color: slide.btnColor }}
                  >
                    {slide.btnText}
                    <span className={styles.btnArrow}>→</span>
                  </Link>
                </div>
              </section>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${styles.navBtn} ${styles.navPrev}`}
          aria-label="Previous"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className={`${styles.navBtn} ${styles.navNext}`}
          aria-label="Next"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        <div className={styles.swiperPagination} />
      </div>

      <section className={styles.benefitsGrid}>
        {BENEFITS.map((item) => (
          <div key={item.id} className={styles.benefitCard}>
            <div className={styles.benefitIcon}>{item.icon}</div>
            <div className={styles.benefitInfo}>
              <h4 className={styles.benefitTitle}>{item.title}</h4>
              <p className={styles.benefitDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Now</h2>
        <Cards>
          {trending.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </Cards>
      </section>

      <section className={styles.specialOffer}>
        <div className={styles.offerContent}>
          <span className={styles.badge}>LIMITED TIME</span>
          <h2 className={styles.offerTitle}>Deal of the Day</h2>
          <p className={styles.offerText}>
            Get an extra 25% OFF on all premium accessories. Use code:{" "}
            <b>FLASH25</b>
          </p>
          <div className={styles.timer}>
            {[
              { value: timeLeft.hours, label: "hr" },
              { value: timeLeft.minutes, label: "min" },
              { value: timeLeft.seconds, label: "sec" },
            ].map((t, i) => (
              <React.Fragment key={t.label}>
                {i > 0 && <div className={styles.timerDivider}>:</div>}
                <div className={styles.timerItem}>
                  <span>{String(t.value).padStart(2, "0")}</span>
                  <p>{t.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
          <Link to="/products" className={styles.offerButton}>
            Claim Offer Now
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What Customers Say</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className={styles.reviewsSwiper}
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id}>
              <div className={styles.reviewCard}>
                <StarRating count={review.rating} />
                <p className={styles.reviewText}>"{review.text}"</p>
                <h4 className={styles.reviewName}>— {review.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className={styles.footerBanner}>
        <h2 className={styles.sectionTitle}>Free Shipping Worldwide</h2>
        <p>On all orders over $100. Secure payments and easy returns.</p>
        <Link to="/products" className={styles.footerBannerBtn}>
          Browse Products
        </Link>
      </section>
    </div>
  );
};

export default Home;
