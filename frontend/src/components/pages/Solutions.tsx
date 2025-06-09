import { motion } from 'framer-motion';
import Footer from '../footer/Footer';

const solutions = [
  {
    title: 'Real-Time Market Prices',
    icon: '📊',
    description:
      'Get up-to-date crop prices from nearby markets. Make smarter selling decisions with accurate and current price data.',
  },
  {
    title: 'Local Weather Forecasts',
    icon: '🌦️',
    description:
      'Plan farm activities with 7-day forecasts, rainfall predictions, and temperature alerts, all based on your location.',
  },
  {
    title: 'Income & Expense Tracking',
    icon: '💸',
    description:
      'Track farm income and expenses with ease. View summaries of balance, profit, and losses at a glance.',
  },
  {
    title: 'Smart Logistics Support (Coming Soon)',
    icon: '🚚',
    description:
      'Connect with local delivery options to transport your crops quickly and affordably.',
  },
  {
    title: 'Farmer Profiles & Records',
    icon: '🧑‍🌾',
    description:
      'Keep a digital record of your inputs, planting history, and seasonal yields for smarter farming decisions.',
  },
  {
    title: 'Secure & Easy Access',
    icon: '🔐',
    description:
      'Sign in securely with Clerk. Your data is private, backed up, and accessible from any device.',
  },
];

export default function Solutions() {
  return (
    <>
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8"
      >
        Our Solutions
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center text-lg mb-10 text-gray-600"
      >
        AgriTrack empowers farmers with the tools they need to thrive — from prices and weather to record keeping and security.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {solutions.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-springBeige/50 backdrop-blur p-6 rounded-2xl shadow hover:shadow-lg  border-someBrown/50 border-8"
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        
        <p className="text-gray-700 max-w-xl mx-auto">
          <span className='text-4xl text-someBrown'>"</span>AgriTrack is more than a tool. It’s a movement to empower farmers with technology, transparency, and trust — one field at a time. <span  className='text-4xl text-someBrown'>"</span>
        </p>
      </motion.div>
    </div>
    <Footer/>
    </>
  );
}
