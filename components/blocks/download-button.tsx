"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  href: string;
  label: string;
  className?: string;
}

export function DownloadButton({ href, label, className = "" }: DownloadButtonProps) {
  return (
    <motion.a
      href={href}
      download
      className={`
        inline-flex items-center gap-3 px-6 py-3.5
        bg-black text-white
        font-light tracking-wide text-sm uppercase
        border border-black
        transition-all duration-300
        hover:bg-white hover:text-black
        group
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      <span>{label}</span>
    </motion.a>
  );
}

