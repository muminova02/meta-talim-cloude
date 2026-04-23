import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useProductPreview } from "@/hooks/useProductPreview";
import { ProductMedia } from "@/components/ui/ProductMedia";
import { ProductMeta } from "@/components/ui/ProductMeta";
import { ProductActions } from "@/components/ui/ProductActions";
import { ProductTabs } from "@/components/sections/ProductTabs";
import { PreviewSidebar } from "@/components/sections/PreviewSidebar";
import { ContributorsSection } from "@/components/sections/ContributorsSection";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { RelatedItem } from "@/types";
import { useNavigate } from "react-router-dom";

export function ProductPreviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data,
    loading,
    error,
    toggleBookmark,
    copyLink,
    openShare,
    isBookmarked,
  } = useProductPreview(id || "1");

  const handleBackClick = () => {
    // Navigate back to products page
    window.history.back();
  };

  const handleRelatedItemClick = (item: RelatedItem) => {
    // Navigate to the related product
    if (process.env.NODE_ENV === "development") {
      console.log("Navigating to related product:", item.id);
    }
    navigate(`/products/${item.id}`);
  };

  const handleQRCodeClick = () => {
    // Scroll to QR tab
    const qrTab = document.querySelector('[data-tab="qr"]');
    if (qrTab) {
      qrTab.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCommentsClick = () => {
    // Scroll to comments tab
    const commentsTab = document.querySelector('[data-tab="comments"]');
    if (commentsTab) {
      commentsTab.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={handleBackClick}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navigation */}
      <Navigation />

      {/* Product Navigation */}

      {/* Main Content */}
      <div className="w-full px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProductMedia
                product={data}
                onShare={openShare}
                onDownload={() => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("Downloading media");
                  }
                }}
              />
            </motion.div>

            {/* Product Meta - Description, Publication Date, Interactive Elements */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ProductMeta product={data} />
            </motion.div> */}

            {/* Tabs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ProductTabs product={data} />
            </motion.div>

            {/* Contributors Section - Buyurtmachi va Makers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ContributorsSection product={data} />
            </motion.div>

            {/* Product Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <ProductActions
                product={data}
                isBookmarked={isBookmarked}
                onBookmark={toggleBookmark}
                onShare={openShare}
                onQRCode={handleQRCodeClick}
                onDownload={() => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("Downloading resources");
                  }
                }}
                onComments={handleCommentsClick}
                onLike={() => {
                  if (process.env.NODE_ENV === "development") {
                    console.log("Liked product");
                  }
                }}
              />
            </motion.div>
          </div>

          {/* Right Column - Sidebar (1/3 width) - YouTube style */}
          <div className="lg:col-span-1">
            <PreviewSidebar
              product={data}
              onRelatedItemClick={handleRelatedItemClick}
            />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
