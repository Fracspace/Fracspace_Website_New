import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "../../../assets/newsImages/dc-logo-2.png";
import img2 from "../../../assets/newsImages/the-enterprise-world.png";
import img3 from "../../../assets/newsImages/ET_Now.jpg";
import img4 from "../../../assets/newsImages/5.png";
import img5 from "../../../assets/newsImages/et.png";
import img6 from "../../../assets/newsImages/aroundtelugu-logo.png";
import img7 from "../../../assets/newsImages/Et_Insights.png";

import img01 from "../../../assets/newsImages/forbes1.png";
import img02 from "../../../assets/newsImages/forbes2.png";

import Image from "next/image";

function InTheNews() {
  return (
    <section className="mx-auto max-w-7xl px-10">
      <h2 className="text-4xl font-jakarta mb-12 mt-4 text-center">
        In the News
      </h2>
      <div>
        <Marquee
          pauseOnClick={true}
          pauseOnHover={true}
          speed={50}
          gradient={false}
        >
          <a
            className=""
            href="https://www.etnownews.com/companies/tech-horizons-unveiling-forbes-picks-for-the-next-global-players-article-115661660"
            target="_blank"
          >
            {" "}
            <Image
              className="w-[30vw] h-[8vh] md:w-[16vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img01}
              alt="Tech Horizons: Unveiling Forbes' Picks for the Next Global Players"
            ></Image>
          </a>

          <a
            className=""
            href="https://images.news18.com/ms/prod/forbesindia/Fracspace_01a7eb15b7.pdf"
            target="_blank"
          >
            {" "}
            <Image
              className="w-[35vw] h-[8vh] md:w-[16vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img02}
              alt="Tech Horizons: Unveiling Forbes' Picks for the Next Global Players"
            ></Image>
          </a>

          <a
            className=""
            href="https://www.deccanchronicle.com/general/fracspace-revolutionizes-real-estate-ownership-with-mobile-app-897133"
            target="_blank"
          >
            {" "}
            <Image
              className="w-[30vw] h-[6vh] md:w-[18vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img1}
              alt="Deccan Chronicle - Fracspace revolutionizes real estate ownership"
            ></Image>
          </a>

          <a
            className=""
            href="https://theenterpriseworld.com/unnath-reddy-a-visionary-leader-reforming/"
            target="_blank"
          >
            <Image
              className="w-[45vw] h-[8vh] md:w-[22vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img2}
              alt="The Enterprise World - Unnath Reddy: A visionary leader"
            ></Image>
          </a>

          <a
            className=""
            href="https://www.youtube.com/watch?v=Z1JVsH6AwDI"
            target="_blank"
          >
            <Image
              className="w-[30vw] h-[8vh] md:w-[14vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img3}
              alt="ET Now - Watch our feature"
            ></Image>
          </a>

          <a
            className=""
            href="https://www.bizzbuzz.news/industry/fracspace-allows-fractional-ownership-of-properties-1212346"
            target="_blank"
          >
            <Image
              className="w-[35vw] h-[8vh] md:w-[16vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img4}
              alt="Bizz Buzz - Fracspace allows fractional ownership of properties"
            ></Image>
          </a>

          <a
            className=""
            href="https://entrepreneurstoday.in/unnath-reddys-fracspace-revolutionizing-real-estate-investment-and-empowering-dreams/"
            target="_blank"
          >
            <Image
              className=" w-[20vw] h-[8vh] md:w-[8vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img5}
              alt="Entrepreneurs Today - Fracspace revolutionizing real estate investment"
            ></Image>
          </a>

          <a
            className=""
            href="https://youtu.be/DMCjEC1BQQE?si=DjmgtonohyGQfboG"
            target="_blank"
          >
            <Image
              className="w-[20vw] h-[8vh] md:w-[9vw] md:h-[16vh] ml-12 aspect-[3/4]"
              src={img6}
              alt="Around Telugu - Latest news feature"
            ></Image>
          </a>

          <a
            className=""
            href="https://etedge-insights.com/in-focus/trending/fracspace-launches-in-app-features-for-interiors-and-real-estate-enthusiasts-in-hyderabad-and-bangalore/"
            target="_blank"
          >
            <Image
              className="w-[50vw] h-[8vh] md:w-[20vw] md:h-[12vh] ml-12 aspect-[3/4]"
              src={img7}
              alt="ET INSIGHTS - Fracspace app launches new features"
            ></Image>
          </a>
        </Marquee>
      </div>
    </section>
  );
}

export default InTheNews;
