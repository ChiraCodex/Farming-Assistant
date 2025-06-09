import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Footer from "../footer/Footer";

interface WholesalePrice {
  commodity: string;
  market: string;
  wholesale_price: number;
  unit: string;
  trend: string;
}

const Home: React.FC = () => {
  const [prices, setPrices] = useState<WholesalePrice[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<WholesalePrice[]>(
          "/data/wholesale-price.json"
        );
        setPrices(response.data);
      } catch (err) {
        setError("Failed to load market prices from local file");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(
    (item) =>
      item.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-8">
  

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-black text-springBeige"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome to AgriTrack
          </motion.h1>

          <motion.p
            className="my-4 text-base sm:text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Your Smart Farming Companion — stay ahead with real-time updates on
            crop prices, harvest schedules, and weather forecasts tailored for
            your region.
          </motion.p>

          <motion.h2
            className="underline decoration-someBrown decoration-4 underline-offset-8 mb-4 mt-10 text-base font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Key Features:
          </motion.h2>

          <ul className="space-y-4">
            {[
              { to: "/markets", label: "Live Market Prices" },
              { to: "/harvests", label: "Harvest Alerts" },
              { to: "/weather", label: "Weather Updates" },
            ].map((item, index) => (
              <motion.li
                key={item.to}
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.4, duration: 0.6 }}
              >
                <Link
                  to={item.to}
                  className="flex items-center  gap-2 hover:underline underline-offset-4 decoration-someBrown decoration-2"
                >
                  {item.label}
                  <FaArrowRight />
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Table */}
        <motion.section
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="md:w-1/3"
        >
          <div className="bg-springBeige/90 text-jungleGreen mt-6 p-4 rounded-xl w-full">
            <h3 className="text-center font-semibold mb-4">
              Weekly Market Updates
            </h3>

            <input
              type="text"
              placeholder="Search markets or commodities..."
              className="w-full mb-4 p-2 border bg-springBeige text-jungleGreen rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-xs sm:text-sm">
                <thead className="sticky top-0 bg-springBeige/90 text-center">
                  <tr>
                    <th className="px-2 py-2">Commodity</th>
                    <th className="px-2 py-2">Market</th>
                    <th className="px-2 py-2">Price</th>
                    <th className="px-2 py-2">Unit</th>
                    <th className="px-2 py-2">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPrices.slice(0, 10).map((price, idx) => (
                    <tr key={idx} className="bg-someBrown/20 border-b">
                      <td className="px-4 py-2 text-left">{price.commodity}</td>
                      <td className="text-center bg-neonGreen/40">
                        {price.market}
                      </td>
                      <td className="text-center font-medium">
                        Ksh. {price.wholesale_price}
                      </td>
                      <td className="text-center text-xs bg-neonGreen/40">
                        {price.unit}
                      </td>
                      <td className="text-center">
                        <img
                          className="w-4 mx-auto"
                          src={price.trend}
                          alt="trend"
                        />
                      </td>
                    </tr>
                  ))}
                  {filteredPrices.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center text-sm text-red-600 py-6"
                      >
                        No matching results.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-sm sm:text-base">
          Would you like to subscribe to the weekly newsletter and stay informed
          on market updates?
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-4 max-w-lg mx-auto">
          <input
            className="w-full sm:flex-1 px-4 py-2 rounded sm:rounded-l-xl border text-jungleGreen bg-springBeige"
            type="email"
            placeholder="Enter your Email"
          />
          <button
            className="px-4 py-2 bg-someBrown text-white rounded sm:rounded-r-xl hover:bg-springBeige hover:text-someBrown"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </motion.section>
      <Footer/>
    </main>
  );
};

export default Home;
