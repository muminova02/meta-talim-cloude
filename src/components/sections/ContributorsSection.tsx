import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { ProductDetail } from "@/types";

interface ContributorsSectionProps {
  product: ProductDetail;
}

export function ContributorsSection({ product }: ContributorsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="space-y-6">
        {/* Buyurtmachi (Customer/Requester) */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Buyurtmachi</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Kimdir</p>
              <p className="text-sm text-gray-600">
                show more video by this human
              </p>
            </div>
          </div>
        </div>

        {/* Makers */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Makers</h3>
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Kimdir</p>
                  <p className="text-xs text-gray-600">
                    show more video this human
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
