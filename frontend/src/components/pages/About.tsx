import { motion } from "framer-motion";
import { useState } from "react";
import Query2 from "../FAQs/Query2";
import Query1 from "../FAQs/Query1";
import Query3 from "../FAQs/Query3";
import Query4 from "../FAQs/Query4";
import Footer from "../footer/Footer";


function About() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
    
      <div className="grid ">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className=" w-[80vw] ml-40 flex flex-col justify-center max-sm:static max-sm:ml-0 max-sm:w-full max-sm:px-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-springBeige">
              Empowering Farmers with Timely Information
            </h2>
            <p className="w-1/2 max-sm:w-3/4 text-sm">
              At AgriTrack, our mission is simple: to equip farmers with
              accurate, timely, and localized data that helps improve
              productivity, increase income, and make smarter farming
              decisions...
            </p>
          </div>

          <br />
          <div className="lg:mt-10">
            <h2 className="text-2xl font-bold text-springBeige">
              What We Offer
            </h2>
            <ul className="text-sm">
              <li className="">
                <h3 className="font-semibold underline decoration-someBrown decoration-4">
                  Live Market Prices
                </h3>
                <p>Know the going rates for your crops...</p>
              </li>
              <li>
                <h3 className="font-semibold underline decoration-someBrown decoration-4">
                  Harvest Time Tracking
                </h3>
                <p>Get personalized alerts based on your crop type...</p>
              </li>
              <li>
                <h3 className="font-semibold underline decoration-someBrown decoration-4">
                  Accurate Weather Forecasts
                </h3>
                <p>Make daily decisions confidently...</p>
              </li>
            </ul>
          </div>

           <div>
             <div className="block mt-8 lg:flex items-end">
               <div className="w-1/2 max-sm:w-full">
            <h2 className="text-4xl font-bold text-springBeige">Our Vision</h2>
            <p className="">
              To create a connected farming community...
            </p>
            <br />
            <h2 className="font-bold text-4xl text-springBeige">Our Mission</h2>
            <p className="text-sm">
              To bridge the information gap in agriculture...
            </p>
            </div>
            <div className="w-3/4">
              <h2 className="mt-8  font-bold text-2xl text-springBeige">Our Values</h2>
            <ul className="">
              <li className="leading-4">
                <span className="font-semibold text-someBrown">
                  Transparency
                </span>
                <br />
                We provide clear and verified data.
              </li>
              <br />
              <li className="leading-4">
                <span className="font-semibold text-someBrown">
                  Reliability
                </span>
                <br />
                You can count on us for accurate, timely updates.
              </li>
              <br />
              <li className="leading-4">
                <span className="font-semibold text-someBrown">
                  Empowerment
                </span>
                <br />
                We help farmers make informed choices.
              </li>
              <br />
              <li className="leading-4">
                <span className="font-semibold text-someBrown ">Innovation</span>
                <br />
                We use modern technology to solve real farming challenges.
              </li>
            </ul>
            </div>
           </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="relative mt-12 max-sm:static max-sm:w-full max-sm:left-0 max-sm:px-4"
        >
          <h2 className="font-bold text-2xl text-springBeige text-center">
            FAQs
          </h2>
          <div className="max-sm:w-full">
            <div className="block lg:flex items-center justify-between gap-8 lg:gap-4">
              <button
                className="text-jungleGreen"
                onClick={handleClick}>
                <Query1 />
              </button>
              <button className="text-jungleGreen" onClick={handleClick}>
                <Query2 />
              </button>
              <button className="text-jungleGreen" onClick={handleClick}>
                <Query3 />
              </button>
              <button className="text-jungleGreen" onClick={handleClick}>
                <Query4 />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="py-8 flex flex-col items-center justify-center"
      >
        <Footer />
      </motion.div>
    </>
  );
}

export default About;
