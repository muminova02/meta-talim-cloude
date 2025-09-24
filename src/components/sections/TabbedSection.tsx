import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TabHeader from "../ui/TabHeader";
import TabPanel from "../ui/TabPanel";
import Tab1Content from "./tabs/Tab1Content";
import Tab2Content from "./tabs/Tab2Content";
import Tab3Content from "./tabs/Tab3Content";
import { GraduationCap, Users, Building } from "lucide-react";

const TabbedSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["O'quvchilarga", "O'qituvchilarga", "Tashkilotlarga"];

  const tabContent = [
    {
      subject: "O'quvchilar",
      title: "Darsingizni samarali o'ting, Qolganini bizga qo'yib bering",
      description:
        "Biz bilan hamkorlik qiling, Darslarni yanada Qiziqarliroq va Samaralinoq o'ting. Kelajak bilan uchish ->",
      buttonText: "Koʻproq...",
      icon: <GraduationCap className="w-8 h-8 text-emerald-600" />,
      content: <Tab1Content />,
    },
    {
      subject: "O'qituvchilar",
      title: "O'qituvchilar uchun zamonaviy vositalar",
      description:
        "Eng mashxur ustozlar Musavvir Edu qurilmalaridan foydalangan holda keraksiz Vaqt va Kuch sarflashdan saqlandilar. Yuqori nargiza ->",
      buttonText: "Batafsil",
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      content: <Tab2Content />,
    },
    {
      subject: "Tashkilotlar",
      title: "Tashkilotlar uchun keng imkoniyatlar",
      description:
        "Maktab va universitetlar uchun to'liq ta'lim ekotizimi. Barcha jarayonlarni boshqaring va samaradorlikni oshiring.",
      buttonText: "Konsultatsiya",
      icon: <Building className="w-8 h-8 text-emerald-600" />,
      content: <Tab3Content />,
    },
  ];

  const handleButtonClick = (tabIndex: number) => {
    console.log(`Button clicked for tab: ${tabs[tabIndex]}`);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <TabHeader
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <AnimatePresence mode="wait">
          <TabPanel
            subject={tabContent[activeTab].subject}
            key={activeTab}
            title={tabContent[activeTab].title}
            description={tabContent[activeTab].description}
            buttonText={tabContent[activeTab].buttonText}
            onButtonClick={() => handleButtonClick(activeTab)}
          >
            {tabContent[activeTab].content}
          </TabPanel>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TabbedSection;
