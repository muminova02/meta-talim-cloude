import React from 'react';
import { motion } from 'framer-motion';

interface MegaDropdownProps {
  isOpen: boolean;
}

const MegaDropdown2: React.FC<MegaDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  const subjects = [
    'Biyalogiya',
    'Kimyo',
    'Fizika',
    'Tarix',
    'Matematika',
    'Informatika',
    'Ona tili',
    'Biyalogiya',
    'Kimyo',
    'Fizika',
    'Tarix',
    'Matematika',
    'Informatika',
    'Ona tili'
  ];

  const activities = [
    'AI mashg\'ulotlar',
    'Testlar',
    'Raqamli Lug\'at',
    'Darslik O\'yinlari',
    'Laboratoriyalar',
    'Vr sarguzashtlar',
    'Ar darslik',
  ];

  const grades = [
    '1-sinf', '2-sinf', '3-sinf', '4-sinf', '5-sinf', '6-sinf', '7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf', 'Dars qo\'llanmalar'
  ];

  // SINFLAR ni ikki ustunga bo'lamiz
  const gradesLeft = grades.slice(0, 7); // 1-7
  const gradesRight = grades.slice(7);   // 8-11, Dars qo'llanmalar

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-16 z-50 flex items-start justify-center"
    >
      <div className="flex min-h-[534px] min-w-[1333px]">
        {/* Chap panel */}
        <div className="w-80 flex flex-col flex-shrink-0">
          {/* Kartochka 1 */}
          <div
            className="flex-1 p-6 flex items-end rounded-tl-none rounded-bl-none"
            style={{
              background: 'linear-gradient(180deg, #E1E507 0%, #EADE62 23.56%, #EDC652 52.4%, #C3BD04 76.44%, #BA9108 100%)'
            }}
          >
            <a href="#">
            <div>
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 68 67" fill="none">
                  <path d="M17.5023 11.7743L1.19584 5.74931L17.6402 0L33.8952 5.85962L17.5023 11.7743ZM18.5648 25.7639C22.0494 24.676 25.5757 24.8109 28.8352 25.9146L35.1381 13.9034V7.65017L18.5648 13.6301V25.7639ZM47.1572 0.185166L47.1867 48.4943L68 39.8153L47.1572 0.185166ZM30.8013 26.7457C35.0038 29.0415 38.1504 32.3907 38.626 37.4251C38.297 41.2501 36.696 44.7696 34.0328 47.4579C31.1823 50.3352 27.3332 51.9856 23.4729 51.9856C19.5845 51.9856 15.715 50.5857 12.8564 48.1449C9.91525 45.6337 8.28498 42.2676 8.25655 38.6576C8.38804 33.52 10.7305 29.3371 16.4309 26.6034V13.6238L0 7.55294V29.0148L8.91916 33.0283C7.19259 35.6715 6.19039 38.8177 6.19039 42.1948C6.19039 51.5617 13.8971 59.1551 23.4038 59.1551C31.4487 59.1551 38.2038 53.7173 40.0913 46.3688L44.7683 48.4945L44.7387 0.185428L30.8013 26.7457Z" fill="#2463B6"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-1 text-white">Kub hajmi</h4>
              <p className="text-sm text-white/90">3d Animatsiya Orqali Kubning ko'rinishini o'rganing</p>
            </div>
            </a>
          </div>
          {/* Kartochka 2 */}
          <div className="flex-1 p-6 flex items-end rounded-bl-none rounded-tl-none"
          style={{
            background: 'linear-gradient(180deg, #71E67D 0%, #3BE14B 27.4%, #67E473 58.74%, #16CE28 81.25%, #0B9619 100%)'
          }}>
            <a href="#">
            <div>
              <div className="mb-4">
                <svg width="48" height="48" viewBox="0 0 59 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.2915 14.75H17.2082M29.7457 46.7083L24.7798 41.7917M29.7457 46.7083L24.7798 51.625M29.7457 46.7083C17.3311 46.7083 6.90775 41.7917 4.9165 36.875M37.1969 46.1454C45.7298 44.8179 52.2788 41.2754 54.0832 36.875M17.2082 7.375H41.7915C46.3886 7.375 48.6847 7.375 50.3957 8.36325C51.5167 9.01052 52.4477 9.94145 53.0949 11.0625C54.0832 12.7735 54.0832 15.0696 54.0832 19.6667C54.0832 24.2637 54.0832 26.5598 53.0949 28.2708C52.4477 29.3919 51.5167 30.3228 50.3957 30.9701C48.6847 31.9583 46.3886 31.9583 41.7915 31.9583H40.8229C39.134 31.9583 38.2908 31.9583 37.5017 31.7838C36.444 31.5489 35.4511 31.084 34.5935 30.4219C33.9543 29.9253 33.4135 29.2787 32.3318 27.9807C31.4714 26.9482 31.0388 26.432 30.5446 26.1985C30.2177 26.045 29.861 25.9654 29.4998 25.9654C29.1387 25.9654 28.782 26.045 28.455 26.1985C27.9609 26.4295 27.5307 26.9458 26.6678 27.9807C25.5862 29.2787 25.0453 29.9253 24.4062 30.4219C23.5486 31.084 22.5556 31.5489 21.498 31.7838C20.7113 31.9583 19.8656 31.9583 18.1768 31.9583H17.2082C12.6111 31.9583 10.315 31.9583 8.604 30.9701C7.48295 30.3228 6.55202 29.3919 5.90475 28.2708C4.9165 26.5598 4.9165 24.2637 4.9165 19.6667C4.9165 15.0696 4.9165 12.7735 5.90475 11.0625C6.55202 9.94145 7.48295 9.01052 8.604 8.36325C10.315 7.375 12.6111 7.375 17.2082 7.375Z" stroke="white" strokeWidth="3.6875" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-1 text-white">Vr Quyosh sistemasi</h4>
              <p className="text-sm text-white/90">Sayoralarni o'z ko'zingiz bilan ko'ring</p>
            </div>
            </a>
          </div>
        </div>
        {/* O'ng panel */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center min-w-[700px]">
          <div className="grid grid-cols-3 gap-8 h-full min-w-[600px]">
            {/* FANLAR */}
            <div
              style={{
                display: "grid",
                width: "324px",
                height: "420px",
                rowGap: "2px",
                columnGap: "32px",
                flexShrink: 0,
                gridTemplateRows: "repeat(8, minmax(0, 1fr))",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
            >
              <h3
                className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500"
                style={{ gridColumn: "1 / span 2", gridRow: "1" }}
              >
                FANLAR
              </h3>
              {subjects.map((subject, idx) => (
                <a href="#"
                  key={idx}
                  className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200"
                  style={{
                    gridColumn: (idx % 2) + 1,
                    gridRow: Math.floor(idx / 2) + 2,
                    alignSelf: "center",
                  }}
                >
                  {subject}
                </a>
              ))}
            </div>
            {/* MASHG'ULOT */}
            <div
              className=" pl-10"
              style={{
                display: "flex",
                width: "260px",
                height: "420px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500">MASHG'ULOT</h3>
              <ul style={{ gap: "13px", display: "flex", flexDirection: "column" }}>
                {activities.map((activity, idx) => (
                  <li key={idx}>
                    <a href="#" className="block p-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200">{activity}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* SINFLAR */}
            <div
              className="border-l border-gray-200 pl-8"
              style={{
                display: "grid",
                width: "324px",
                height: "420px",
                rowGap: "2px",
                columnGap: "32px",
                flexShrink: 0,
                gridTemplateRows: "repeat(8, minmax(0, 1fr))",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              }}
            >
              <h3
                className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b-2 border-emerald-500"
                style={{ gridColumn: "1 / span 2", gridRow: "1" }}
              >
                SINFLAR
              </h3>
              {grades.map((grade, idx) => (
                <a href="#"
                  key={idx}
                  className="block py-2 px-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors duration-200"
                  style={{
                    gridColumn: (idx % 2) + 1,
                    gridRow: Math.floor(idx / 2) + 2,
                    alignSelf: "center",
                  }}
                >
                  {grade}
                </a>
              ))}
            </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
};

export default MegaDropdown2;
