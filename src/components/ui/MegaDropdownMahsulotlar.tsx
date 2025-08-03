
import React from 'react';
import { motion, px, rgba } from 'framer-motion';
import { Play, QrCode, Gamepad2, FlaskConical, Eye, Layers } from 'lucide-react';

interface MegaDropdownMahsulotlarProps {
  isOpen: boolean;
}

const MegaDropdownMahsulotlar: React.FC<MegaDropdownMahsulotlarProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-16 z-50 flex items-start justify-center"
      style={{ width: '100vw', left: 0, right: 0 }}
    >
      <div className="flex w-max-2xl"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '43px',
        background: 'linear-gradient(90deg, #8CEA95 0%, #ABF8B2 27.4%, #68FE77 58.74%, #44C651 81.25%, #198424 100%)',
      }}> 
        <div className="" 
        style={{
          display: 'flex',
          padding: '32px 20px 32px 64px',
          alignItems: 'flex-start',
          gap: '100px',
          flex: '1 0 0',
        }}>
          {/* Left Section - Green Background */}
        <div
          className="flex flex-col justify-between"
          style={{
            display: 'flex',
            width: '376px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >          
          <h3 className="text-white font-bold text-lg mb-4"
          style={{
            color: '#626971',
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: '150%',            
          }}
          >Bizning ishlanmalarni faqat o’zingiz ko’ring</h3>

            
            <div
              className="flex flex-col"
              style={{
                display: 'flex',
                padding: '0px 0px 1px 0px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                alignSelf: 'stretch',
                borderRadius: '18px',
                background: '#01B786',
              }}
            >
              {/* Media */}
             
            <a
              href="/#"
              className="flex items-start space-x-3 text-white transition-colors duration-150 hover:bg-white/10 cursor-pointer group"
              style={{
                display: 'flex',
                minWidth: '375px',
                padding: '15px 0px 8.005px 20px',
                alignItems: 'flex-start',
                gap: '12.008px',
                borderBottom: '0.1px solid #797676',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              style={{
                marginTop:'6px',
              }}>
                <Play className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold"
                style={{
                  color: '#F5F5F5',
                  fontSize: '16.011px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '150%',
                  marginBottom:'3px'
                }}
                >Media</h4>
                <p className="text-sm opacity-90"
                style={{
                  color: '#F5F5F5',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14.009px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '150%',
                }}
                >Siz "Qora Tuynuk" haqida bilasizmi</p>
              </div>
            </a>

            {/* 3D Animation */}
            <a
              href="/#"
              className="flex items-start space-x-3 text-white transition-colors duration-150 hover:bg-white/10 cursor-pointer group"
              style={{
                display: 'flex',
                minWidth: '375px',
                padding: '13px 0px 13px 20px',
                alignItems: 'flex-start',
                gap: '12.008px',
                borderBottom: '0.1px solid #797676',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
               style={{
                flexShrink: 0,
                marginTop:'6px',
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2437 7.15599L21.1036 6.90583C20.9229 6.60332 20.668 6.35189 20.3631 6.17534L13.6487 2.30277C13.3447 2.12641 12.9996 2.03321 12.648 2.03259H12.3578C12.0063 2.03321 11.6612 2.12641 11.3572 2.30277L4.64271 6.18535C4.33948 6.36073 4.0876 6.6126 3.91223 6.91584L3.77213 7.166C3.59577 7.47004 3.50257 7.81517 3.50195 8.16667V15.9218C3.50257 16.2733 3.59577 16.6185 3.77213 16.9225L3.91223 17.1726C4.09213 17.4723 4.343 17.7232 4.64271 17.9031L11.3672 21.7757C11.6697 21.9557 12.0158 22.0492 12.3678 22.0459H12.648C12.9996 22.0453 13.3447 21.9521 13.6487 21.7757L20.3631 17.8931C20.6693 17.7217 20.9222 17.4688 21.0936 17.1626L21.2437 16.9125C21.4179 16.6076 21.511 16.263 21.5139 15.9118V8.15666C21.5133 7.80517 21.4201 7.46004 21.2437 7.15599ZM12.3578 4.03392H12.648L18.5119 7.41617L12.5079 10.8785L6.50395 7.41617L12.3578 4.03392ZM13.5086 19.5442L19.3625 16.162L19.5126 15.9118V9.14732L13.5086 12.6196V19.5442Z" fill="#F5F5F5"/>
</svg>
              </div>
              <div>
                <h4 className="font-semibold"
                style={{
                  color: '#F5F5F5',
                  fontSize: '16.011px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '150%',
                  marginBottom:'3px'
                }}
                >3D Animation</h4>
                <p className="text-sm opacity-90">Dinazavrlarni qanchalik yaqindan ko’rgansiz</p>
              </div>
            </a>

            {/* QR code, Kitoblar, Maqolalar */}
            <a
              href="/#"
              className="flex items-start space-x-3 text-white transition-colors duration-150 hover:bg-white/10 cursor-pointer group"
              style={{
                display: 'flex',
                minWidth: '375px',
                padding: '13px 0px 13px 20px',
                alignItems: 'flex-start',
                gap: '12.008px',
                borderBottom: '0.1px solid #797676',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              style={{
                flexShrink: 0,
                marginTop:'6px',
              }}>
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold"
                style={{
                  color: '#F5F5F5',
                  fontSize: '16.011px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '150%',
                  marginBottom:'3px'
                }}
                >QR code, Kitoblar, Maqolalar</h4>
                <p className="text-sm opacity-90">Mahsulot yoki Kitobni izlang</p>
              </div>
            </a>

            {/* Interactive Mashg'ulotlar */}
            <a
              href="/#"
              className="flex items-start space-x-3 text-white transition-colors duration-150 hover:bg-white/10 cursor-pointer group"
              style={{
                display: 'flex',
                minWidth: '375px',
                padding: '13px 0px 15px 20px',
                alignItems: 'flex-start',
                gap: '12.008px',
                borderBottom: '0.1px solid #797676',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              style={{
                flexShrink: 0,
                marginTop:'6px',
              }}>
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold"
                style={{
                  color: '#F5F5F5',
                  fontSize: '16.011px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '150%',
                  marginBottom:'3px'
                }}
                >Interactive Mashg'ulotlar</h4>
                <p className="text-sm opacity-90">Test mi? , Amaliyot bilan o'rganing</p>
              </div>
            </a>
            </div>
        </div>

        {/* Middle Section - AMATHING */}
        <div className=""
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
          flex: '1 0 0',
        }}>
          <h3
            className="font-semibold text-lg  mb-4 text-center tracking-wide"
            style={{
              color: '#5C5F64',
              marginLeft:'3px',
            }}
          >
            AMATHING
          </h3>
          
          <div className="space-y-2"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '13px',
          }}>
            {/* Meta Darslik */}
            <a
              href="/meta-darslik"
              className="flex items-center space-x-3 border border-white border-[1.5px] cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{
                width: '270px',
                padding: '8px',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 100 100" fill="none">
  <path d="M45.8335 50.0003L80.2293 26.2336C85.0668 22.8919 91.6668 26.3586 91.6668 32.2336V67.7669C91.6668 73.6419 85.0668 77.1086 80.2293 73.7669L45.8335 50.0003Z" fill="url(#paint0_radial_1_5753)"/>
  <path d="M45.8335 50.0003L80.2293 26.2336C85.0668 22.8919 91.6668 26.3586 91.6668 32.2336V67.7669C91.6668 73.6419 85.0668 77.1086 80.2293 73.7669L45.8335 50.0003Z" fill="url(#paint1_linear_1_5753)" fill-opacity="0.75"/>
  <path d="M8.3335 34.3752C8.3335 30.7837 9.7602 27.3393 12.2998 24.7998C14.8393 22.2602 18.2837 20.8335 21.8752 20.8335H48.9585C50.7368 20.8335 52.4977 21.1838 54.1407 21.8643C55.7836 22.5448 57.2764 23.5423 58.5339 24.7998C59.7914 26.0572 60.7888 27.55 61.4694 29.193C62.1499 30.8359 62.5002 32.5968 62.5002 34.3752V65.6252C62.5002 67.4035 62.1499 69.1644 61.4694 70.8073C60.7888 72.4503 59.7914 73.9431 58.5339 75.2006C57.2764 76.458 55.7836 77.4555 54.1407 78.136C52.4977 78.8166 50.7368 79.1668 48.9585 79.1668H21.8752C18.2837 79.1668 14.8393 77.7401 12.2998 75.2006C9.7602 72.661 8.3335 69.2166 8.3335 65.6252V34.3752Z" fill="url(#paint2_radial_1_5753)"/>
  <path opacity="0.5" d="M16.667 62.5003C16.667 60.2902 17.545 58.1706 19.1078 56.6078C20.6706 55.045 22.7902 54.167 25.0003 54.167H45.8337C48.0438 54.167 50.1634 55.045 51.7262 56.6078C53.289 58.1706 54.167 60.2902 54.167 62.5003C54.167 64.7105 53.289 66.8301 51.7262 68.3929C50.1634 69.9557 48.0438 70.8337 45.8337 70.8337H25.0003C22.7902 70.8337 20.6706 69.9557 19.1078 68.3929C17.545 66.8301 16.667 64.7105 16.667 62.5003Z" fill="url(#paint3_linear_1_5753)"/>
  <path d="M25.0002 58.3335C23.8951 58.3335 22.8353 58.7725 22.0539 59.5539C21.2725 60.3353 20.8335 61.3951 20.8335 62.5002C20.8335 63.6052 21.2725 64.665 22.0539 65.4464C22.8353 66.2278 23.8951 66.6668 25.0002 66.6668H33.3335C34.4386 66.6668 35.4984 66.2278 36.2798 65.4464C37.0612 64.665 37.5002 63.6052 37.5002 62.5002C37.5002 61.3951 37.0612 60.3353 36.2798 59.5539C35.4984 58.7725 34.4386 58.3335 33.3335 58.3335H25.0002ZM45.8335 66.6668C46.9386 66.6668 47.9984 66.2278 48.7798 65.4464C49.5612 64.665 50.0002 63.6052 50.0002 62.5002C50.0002 61.3951 49.5612 60.3353 48.7798 59.5539C47.9984 58.7725 46.9386 58.3335 45.8335 58.3335C44.7284 58.3335 43.6686 58.7725 42.8872 59.5539C42.1058 60.3353 41.6668 61.3951 41.6668 62.5002C41.6668 63.6052 42.1058 64.665 42.8872 65.4464C43.6686 66.2278 44.7284 66.6668 45.8335 66.6668Z" fill="#BABAFF"/>
  <defs>
    <radialGradient id="paint0_radial_1_5753" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(70.8335 12.5003) rotate(74.876) scale(79.8492 134.065)">
      <stop offset="0.081" stop-color="#F08AF4"/>
      <stop offset="0.394" stop-color="#9C6CFE"/>
      <stop offset="1" stop-color="#4E44DB"/>
    </radialGradient>
    <linearGradient id="paint1_linear_1_5753" x1="58.5668" y1="50.0003" x2="91.6377" y2="49.0294" gradientUnits="userSpaceOnUse">
      <stop stop-color="#312A9A"/>
      <stop offset="1" stop-color="#312A9A" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="paint2_radial_1_5753" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.51353 23.2624) rotate(44.73) scale(87.7229 184.315)">
      <stop stop-color="#F08AF4"/>
      <stop offset="0.341" stop-color="#9C6CFE"/>
      <stop offset="1" stop-color="#4E44DB"/>
    </radialGradient>
    <linearGradient id="paint3_linear_1_5753" x1="15.817" y1="54.167" x2="21.4753" y2="76.4337" gradientUnits="userSpaceOnUse">
      <stop stop-color="#3B148A"/>
      <stop offset="1" stop-color="#4B20A0"/>
    </linearGradient>
  </defs>
</svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Meta Darslik</h4>
                <p className="text-sm text-gray-600">Taqdimotlar, TechMeta Kitoblar</p>
              </div>
            </a>

            {/* Vr */}
            <a
              href="/meta-darslik"
              className="flex items-center space-x-3 border border-white border-[1.5px] cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{
                width: '270px',
                padding: '8px',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14" fill="none">
  <mask id="mask0_172_67" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14">
    <path d="M0 0H14V14H0V0Z" fill="white"/>
  </mask>
  <g mask="url(#mask0_172_67)">
    <path d="M12.4572 5.10757C12.5039 5.12857 12.5494 5.15213 12.5937 5.17827C12.8167 5.27347 13.1418 5.49397 13.2941 5.69207C13.5517 6.02737 13.6882 6.69377 13.6882 7.22577C13.6882 7.89322 13.4869 8.77837 13.0872 8.95022C12.9122 9.05137 12.7194 9.11647 12.5188 9.14167C12.3039 9.88157 11.9868 10.4962 11.5507 10.6946C11.3131 10.899 10.4643 11.0971 9.47312 11.2294C9.32849 11.2521 9.18047 11.2382 9.04262 11.1888C8.79552 11.1013 8.37412 10.808 8.20332 10.619L8.20262 10.618C7.97092 10.5259 7.65767 10.4633 7.23312 10.4633C6.38122 10.4633 5.97452 10.7076 5.77012 10.9323C5.67211 11.0409 5.54863 11.1234 5.41079 11.1724C5.27295 11.2214 5.12509 11.2353 4.98052 11.213C4.37957 11.1339 3.84127 11.031 3.45382 10.9176C2.94982 10.7702 2.41607 10.4713 2.06712 10.0769C1.84522 9.82697 1.66707 9.45387 1.53162 9.02652C1.30132 8.92502 1.12842 8.74897 0.912823 8.62682C0.513123 8.45532 0.311523 7.56947 0.311523 6.90202C0.311523 6.23457 0.513123 5.34942 0.912823 5.17792C1.08344 5.07803 1.27207 5.01273 1.46792 4.98577C1.68247 4.25252 1.99992 3.63827 2.43567 3.44997C2.83887 3.10662 4.99277 2.75977 6.76657 2.75977C8.13017 2.75977 9.71077 2.97222 10.5518 3.22107C11.0943 3.38102 11.6813 3.71177 12.0169 4.17202C12.1954 4.41562 12.3414 4.74182 12.4572 5.10722V5.10757Z" fill="#00034A" stroke="#00034A" stroke-width="0.35" stroke-miterlimit="10"/>
    <path d="M12.5937 5.1784C12.4232 5.07856 12.2347 5.01327 12.039 4.98625C11.8374 4.253 11.5203 3.63875 11.0842 3.45045C10.6813 3.12005 8.54037 2.76025 6.76657 2.76025C4.99277 2.76025 2.83887 3.10675 2.43602 3.45045C1.99992 3.63875 1.68282 4.253 1.46792 4.98625C1.27219 5.01327 1.08368 5.07856 0.913173 5.1784C0.513123 5.3499 0.311523 6.23505 0.311523 6.90215C0.311523 7.56925 0.513123 8.45475 0.912823 8.6266C1.08432 8.7239 1.27262 8.78655 1.46792 8.81175C1.66952 9.545 1.98627 10.1593 2.42237 10.3476C2.66037 10.5492 3.49267 10.7508 4.50032 10.8831C4.64492 10.9054 4.7928 10.8914 4.93064 10.8423C5.06848 10.7932 5.19195 10.7107 5.28992 10.602C5.49467 10.3777 5.90102 10.133 6.75327 10.133C7.60552 10.133 8.01187 10.3871 8.20332 10.6185C8.30133 10.7272 8.42486 10.8098 8.56277 10.8588C8.70067 10.9079 8.84862 10.9219 8.99327 10.8995C9.98412 10.7672 10.8332 10.5691 11.0709 10.364C11.507 10.1659 11.8241 9.55165 12.039 8.81175C12.2394 8.78661 12.4327 8.72138 12.6074 8.61995C13.0067 8.44845 13.208 7.56295 13.208 6.8955C13.208 6.22805 12.9934 5.3499 12.5937 5.17805V5.1784Z" fill="#9BFF00" stroke="#00034A" stroke-width="0.35" stroke-miterlimit="10"/>
    <path d="M9.87801 8.90765C10.459 8.69625 10.7502 7.60635 10.7502 6.7835C10.7502 5.96065 10.4594 4.8711 9.87801 4.65935C9.58751 4.44795 8.03806 4.2334 6.75286 4.2334C5.46801 4.2334 3.91856 4.44795 3.62806 4.65935C3.04636 4.8711 2.75586 5.96135 2.75586 6.78385C2.75586 7.60635 3.04636 8.69625 3.62806 8.90765C3.91856 9.1222 5.46836 9.1222 6.75286 9.1222C8.03806 9.1222 9.58681 9.1222 9.87801 8.90765Z" fill="white" stroke="#00034A" stroke-width="0.35" stroke-miterlimit="10"/>
    <path d="M5.10178 5.31982C4.16693 5.40907 4.05808 5.42552 3.84668 5.95717" stroke="#00034A" stroke-width="0.35" stroke-miterlimit="10" stroke-linecap="round"/>
  </g>
</svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Vr</h4>
                <p className="text-sm text-gray-600">Hayotiy his eting</p>
              </div>
            </a>

            {/* Ar */}
            <a
              href="/meta-darslik"
              className="flex items-center space-x-3 border border-white border-[1.5px] cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{
                width: '270px',
                padding: '8px',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 34 34" fill="none">
  <path d="M10.3333 13.6667L17 17M10.3333 13.6667V20.3333L17 23.6667M10.3333 13.6667L17 10.3333L23.6667 13.6667M17 17L23.6667 13.6667M17 17V23.6667M17 23.6667L23.6667 20.3333V13.6667M12.6667 32C8.93333 32 7.06667 32 5.64 31.2733C4.38564 30.6342 3.36581 29.6144 2.72667 28.36C2 26.9333 2 25.0667 2 21.3333M32 21.3333C32 25.0667 32 26.9333 31.2733 28.36C30.6342 29.6144 29.6144 30.6342 28.36 31.2733C26.9333 32 25.0667 32 21.3333 32M21.3333 2C25.0667 2 26.9333 2 28.36 2.72667C29.6144 3.36581 30.6342 4.38564 31.2733 5.64C32 7.06667 32 8.93333 32 12.6667M12.6667 2C8.93333 2 7.06667 2 5.64 2.72667C4.38564 3.36581 3.36581 4.38564 2.72667 5.64C2 7.06667 2 8.93333 2 12.6667" stroke="#157630" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Ar</h4>
                <p className="text-sm text-gray-600">Voqealar yonginangizda</p>
              </div>
            </a>

            {/* Hologramma */}
            <a
              href="/meta-darslik"
              className="flex items-center space-x-3 border border-white border-[1.5px] cursor-pointer transition-transform duration-200 hover:scale-105"
              style={{
                width: '270px',
                padding: '8px',
                borderRadius: '18px',
                textDecoration: 'none',
              }}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#ffa629" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 22h18m-4-3l-1-4m-8 0l-1 4m5-3v3m0-12c.495 0 .956-.199 1.877-.595l.665-.287C16.181 5.412 17 5.059 17 4.5s-.82-.912-2.458-1.618l-.665-.287C12.958 2.198 12.496 2 12 2s-.956.199-1.877.595l-.665.287C7.819 3.588 7 3.941 7 4.5s.82.912 2.458 1.618l.665.287C11.043 6.8 11.505 7 12 7m0 0v6"/><path d="M17 4.5v6c0 .559-.82.912-2.458 1.618l-.665.287c-.92.397-1.382.595-1.877.595s-.956-.198-1.877-.595l-.665-.287C7.819 11.412 7 11.059 7 10.5v-6"/></g></svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Hologramma</h4>
                <p className="text-sm text-gray-600">Tez Kunda</p>
              </div>
            </a>
          </div>
          </div>
        </div>
        {/* Right Section - Tavorlar Etilganlar */}
        <div className="w-80 bg-gray-50 p-6 rounded-r-lg"
        style={{
          display: 'flex',
          width: '660px',
          padding: '32px 20px 32px 32px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
          flexShrink: 0,
          alignSelf: 'stretch',
        }}>
          <h3 className="font-bold text-lg text-gray-800 mb-2">Tavsiya Etilganlar</h3>
          
          <div className="space-y-4">
            {/* VR Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <img src="/images/vr.jpg" alt="VR" className=" object-cover rounded-lg mr-4 flex-shrink-0" style={{
                width: '250px',
                height: '130px',
              }} />
              <a
                href="/v-laboratoriya-atom-bombasi"
                className="block focus:outline-none"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">VR: Quyosh Sistemasini kashf etish</h4>
                <p className="text-sm text-gray-600 mb-2">Quyosh sistemasini VR orqali o'rganing</p>
                <p className="text-xs text-gray-500">Bonus sayyoralarga tegib ko'rish</p>
                <button
                    className="text-emerald-600 text-sm font-medium mt-2"
                    type="button"
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                  >
                    Read more
                  </button>
              </div>
              </a>
            </div>

            {/* V-Laboratoriya Card */}
            <div className="bg-white rounded-lg p-4 shadow-sm flex items-start">
              <img src="/images/atom_bomba.jpg" alt="VR" className=" object-cover rounded-lg mr-4 flex-shrink-0" style={{
                width: '250px',
                height: '130px',
              }} />
              <a
                href="/v-laboratoriya-atom-bombasi"
                className="block focus:outline-none"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">V-Laboratoriya: Atom bombasi</h4>
                  <p className="text-sm text-gray-600 mb-2">Kimyoviy Moddalar orqali Portlash jarayonlarini nazorat qilish</p>
                  <button
                    className="text-emerald-600 text-sm font-medium mt-2"
                    type="button"
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                  >
                    Read more
                  </button>
                </div>
              </a>
            </div>

            <div className="flex items-center  mt-6">
              <a href="#" className="text-gray-600">Ko'proq</a>
              <button className="text-emerald-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaDropdownMahsulotlar;
