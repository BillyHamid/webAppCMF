import { motion } from 'framer-motion';
import { Users, MapPin, Shield, TrendingUp } from 'lucide-react';

const stats = [
  { icon: MapPin, value: '14', label: 'Pays en Afrique' },
  { icon: Users, value: '500K+', label: 'Clients actifs' },
  { icon: Shield, value: '15+', label: "Années d'expertise" },
  { icon: TrendingUp, value: '98%', label: 'Taux de satisfaction' },
];

export default function StatsBar() {
  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-coris-blue to-coris-blue-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={22} className="text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Red accent bar */}
      <div className="h-1 bg-coris-red" />
    </section>
  );
}
