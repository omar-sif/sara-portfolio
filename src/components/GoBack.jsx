import { motion } from 'framer-motion';

export default function GoBack() {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.href = '/';
    }
  };

  return (
    <motion.button
      onClick={handleGoBack}
      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white transition-colors group"
      whileHover={{ x: -5 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span 
        className="material-symbols-outlined text-sm"
        animate={{ x: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        north_west
      </motion.span>
      <span className="group-hover:underline">Go Back</span>
    </motion.button>
  );
}
