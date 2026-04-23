import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  MessageCircle,
  QrCode,
  Download,
  BookType,
} from "lucide-react";
import { ProductDetail, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { generateQRCode, formatDate } from "@/lib/utils";

interface ProductTabsProps {
  product: ProductDetail;
}

type TabType = "about" | "comments" | "qr" | "instructions";

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [newComment, setNewComment] = useState("");

  const tabs = [
    { id: "about" as const, label: "Haqida", icon: FileText },
    { id: "comments" as const, label: "Comments", icon: MessageCircle },
    { id: "qr" as const, label: "QR code", icon: QrCode },
    { id: "instructions" as const, label: "Instructions", icon: BookType },
  ];

  const handleTabKeyDown = (event: React.KeyboardEvent, tabId: TabType) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(tabId);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const tabIds: TabType[] = ["about", "comments", "qr", "instructions"];
      const currentIndex = tabIds.findIndex((id) => id === activeTab);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabIds.length - 1;
      setActiveTab(tabIds[prevIndex]);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const tabIds: TabType[] = ["about", "comments", "qr", "instructions"];
      const currentIndex = tabIds.findIndex((id) => id === activeTab);
      const nextIndex = currentIndex < tabIds.length - 1 ? currentIndex + 1 : 0;
      setActiveTab(tabIds[nextIndex]);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      if (process.env.NODE_ENV === "development") {
        console.log("Adding comment:", newComment);
      }
      setNewComment("");
    }
  };

  const renderAboutContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Description
        </h3>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="success" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Category</h4>
          <p className="text-gray-600">{product.category}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Published</h4>
          <p className="text-gray-600">{formatDate(product.publishedAt)}</p>
        </div>
        {product.duration && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
            <p className="text-gray-600">{product.duration}</p>
          </div>
        )}
        {product.price !== undefined && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Price</h4>
            <p className="text-gray-600">
              {product.price === 0 ? "Free" : `$${product.price}`}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderCommentsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Add Comment Form */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Add a Comment
        </h3>
        <div className="space-y-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <Button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Post Comment
            </Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Comments ({product.comments?.length ?? 0})
        </h3>
        {(product.comments ?? []).map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                {comment.author.avatar ? (
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-emerald-600 font-medium text-sm">
                    {comment.author.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">
                    {comment.author.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-emerald-600">
                    <span>👍</span>
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-sm text-gray-500 hover:text-emerald-600">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderQRContent = () => {
    const qrResources =
      product.resources?.filter((r) => r.type === "qr") ?? [];

    if (qrResources.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              QR Code
            </h3>
            <div className="inline-block p-4 bg-white border border-gray-200 rounded-lg">
              <img
                src={generateQRCode(window.location.href)}
                alt="QR Code for this product"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Scan this QR code to quickly access this product
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-900">QR Codes</h3>
        <div className="grid gap-3">
          {qrResources.map((resource, index) => (
            <motion.a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group"
              whileHover={{ x: 4 }}
            >
              <span className="text-gray-700 group-hover:text-emerald-700">
                {resource.label}
              </span>
              <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderInstructionsContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {product.resources &&
        product.resources.filter((r) => r.type !== "qr").length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Resources
          </h3>
          <div className="grid gap-3">
            {product.resources
              .filter((resource) => resource.type !== "qr")
              .map((resource, index) => {
                const isDownload = resource.isDownload ?? false;
                return (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target={isDownload ? "_self" : "_blank"}
                    rel={isDownload ? undefined : "noopener noreferrer"}
                    download={isDownload ? "" : undefined}
                    className="flex items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-colors group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-gray-700 group-hover:text-emerald-700">
                      {resource.label}
                    </span>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                  </motion.a>
                );
              })}
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
                  activeTab === tab.id
                    ? "border-emerald-300 rounded-lg text-emerald-600"
                    : "border-transparent rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                id={`tab-${tab.id}`}
                data-tab={tab.id}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <div
            key={activeTab}
            role="tabpanel"
            id={`tabpanel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {activeTab === "about" && renderAboutContent()}
            {activeTab === "comments" && renderCommentsContent()}
            {activeTab === "qr" && renderQRContent()}
            {activeTab === "instructions" && renderInstructionsContent()}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
