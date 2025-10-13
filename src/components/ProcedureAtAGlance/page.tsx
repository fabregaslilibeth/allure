"use client";
import { motion } from "framer-motion";
import { Clock, Layers, CheckCircle, Timer } from "lucide-react";

interface ProcedureData {
  procedure_time: string;
  treatments: string;
  results: string;
  recovery_time: string;
}

interface ProcedureAtAGlanceProps {
  data: ProcedureData;
}

const ProcedureAtAGlance = ({ data }: ProcedureAtAGlanceProps) => {
  const procedureItems = [
    {
      icon: Clock,
      title: "PROCEDURE TIME",
      description: data.procedure_time,
      delay: 0.1,
    },
    {
      icon: Layers,
      title: "TREATMENTS",
      description: data.treatments,
      delay: 0.2,
    },
    {
      icon: CheckCircle,
      title: "RESULTS",
      description: data.results,
      delay: 0.3,
    },
    {
      icon: Timer,
      title: "RECOVERY TIME",
      description: data.recovery_time,
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  return (
    <div className="relative py-20 px-6 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-black to-primary" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-6 tracking-wider"
            variants={titleVariants}
          >
            PROCEDURE AT A GLANCE
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"
            variants={titleVariants}
          />
        </motion.div>

        {/* Procedure Items */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {procedureItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Card Background */}
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full transition-all duration-300 group-hover:border-amber-500/50 group-hover:shadow-2xl group-hover:shadow-amber-500/10">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon */}
                  <motion.div
                    className="relative mb-6 flex justify-center"
                    variants={iconVariants}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      <div className="relative w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600 group-hover:border-amber-500/50 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-white group-hover:text-amber-400 transition-colors duration-300" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <motion.h3
                      className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-amber-400 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ 
            opacity: 1, 
            scaleX: 1,
            transition: { duration: 1, delay: 0.8, ease: "easeOut" }
          }}
          viewport={{ once: true }}
        >
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProcedureAtAGlance;
