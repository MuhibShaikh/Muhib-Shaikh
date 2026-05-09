import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';

export function DemoBanner() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-amber-500/10 border-b border-amber-500/20 py-2 px-4 flex items-center justify-center gap-2 text-amber-500 text-sm font-medium"
    >
      <ShieldAlert className="w-4 h-4" />
      <span>Running in Demo Mode: Supabase credentials missing. Data is local to this session.</span>
    </motion.div>
  );
}
