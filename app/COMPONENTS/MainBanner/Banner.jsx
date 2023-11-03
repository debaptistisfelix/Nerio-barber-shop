import styles from "./Banner.module.css";
import Image from "next/image";
import BannerImg  from "@/public/barbershopBrown.jpg"
import Logo from "./Logo";
export default function Banner() {
  return (
    <>
      <main className={styles.banner}>
        <Image alt="banner-img" src={BannerImg} layout="fill" objectFit="cover" placeholder="blur" priority={true} size="100vw"  />
        <div className={styles.shader}></div>
        <Logo />
      </main>
    </>
  );
}