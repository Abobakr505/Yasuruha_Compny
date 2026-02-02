import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Terminal() {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    { text: '$ npm install @yasuruha/innovation', delay: 0 },
    { text: 'Installing smart solutions...', delay: 0.8, color: 'text-emerald-400' },
    { text: 'Configuring excellence...', delay: 1.6, color: 'text-cyan-400' },
    { text: 'Building your digital future...', delay: 2.4, color: 'text-teal-400' },
    { text: '$ yasuruha deploy --production', delay: 3.2 },
    { text: '✓ Your digital future is ready!', delay: 4, color: 'text-emerald-400' },
    { text: 'Success rate: 100%', delay: 4.8, color: 'text-emerald-400' },
    { text: '█', delay: 5.6, color: 'text-white', isCursor: true },
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
      }, lines[currentLine].delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentLine, lines]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="terminal relative w-full max-w-2xl mx-auto "
    >
      <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-emerald-500/30">
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-b border-emerald-500/20">
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
            />
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-3 h-3 rounded-full bg-emerald-500 cursor-pointer"
            />
          </div>
          <div className="flex-1 text-center">
            <span className="text-sm text-gray-400 font-mono">yasuruha-terminal</span>
          </div>
        </div>

        <div className="p-6 font-mono text-sm min-h-[280px]">
          {lines.slice(0, currentLine).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-2 ${line.color || 'text-gray-300'}`}
            >
              {line.text}
              {line.isCursor && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-20 -z-10"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
