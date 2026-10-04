'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const categoriesData: Record<string, string[]> = {
  Assembly: [
    'Bed',
    'Desk',
    'Bookshelf',
    'Patio Furniture',
    'General furniture',
    'Other',
  ],
  Cleaning: [
    'AirBNB',
    'Deep Cleaning',
    'Move Out Cleaning',
    'Garage Cleaning',
    'General Cleaning',
  ],
  'Home service': [
    'Indoor Painting',
    'Furniture Painting',
    'Wallpapering',
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Furniture repair',
    'Appliance installation',
    'Other',
  ],
  'Mechanical Service': [
    'Change oil',
    'Break',
    'Change tire',
    'replace parts',
    'Other',
  ],
  Moving: ['Help Moving', 'Trash removal', 'Reorganizing', 'Driver', 'Other'],
  'Outdoor Services': [
    'Yard work',
    'Pressure washing',
    'Leaf Raking',
    'Gutter Cleaning',
    'Hedge Trimming',
    'Other',
  ],
};

export default function Home() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState('Assembly');

  const goToRequest = () => router.push('/request');

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="flex justify-end p-6">
        <button className="flex flex-col items-center text-gray-500 hover:text-gray-900 transition">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
          <span className="text-xs mt-1 font-medium">Account</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto text-center mt-4 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1f4a38] mb-10 tracking-tight">
        Believe, <br className="hidden md:block" /> we can do it
          🍁
        </h1>

        <div className="max-w-2xl mx-auto flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm mb-14">
          <input
            type="text"
            placeholder="What do you need help with?"
            className="w-full px-6 py-4 outline-none text-lg text-gray-700"
          />
          <button className="bg-[#187a5a] hover:bg-[#126046] text-white px-8 py-5 transition">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 border-b border-gray-200 pb-10">
          <CategoryIcon
            name="Assembly"
            active={activeCat === 'Assembly'}
            onClick={() => setActiveCat('Assembly')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
              </svg>
            }
          />
          <CategoryIcon
            name="Cleaning"
            active={activeCat === 'Cleaning'}
            onClick={() => setActiveCat('Cleaning')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                ></path>
              </svg>
            }
          />
          <CategoryIcon
            name="Home service"
            active={activeCat === 'Home service'}
            onClick={() => setActiveCat('Home service')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            }
          />
          <CategoryIcon
            name="Mechanical Service"
            active={activeCat === 'Mechanical Service'}
            onClick={() => setActiveCat('Mechanical Service')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 10l1.5-3.5A2 2 0 018.3 5h7.4a2 2 0 011.8 1.5L19 10m-14 0h14m-14 0v5a2 2 0 002 2h1m10-7v5a2 2 0 01-2 2h-1M7 17a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                ></path>
              </svg>
            }
          />
          <CategoryIcon
            name="Moving"
            active={activeCat === 'Moving'}
            onClick={() => setActiveCat('Moving')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
            }
          />
          <CategoryIcon
            name="Outdoor Services"
            active={activeCat === 'Outdoor Services'}
            onClick={() => setActiveCat('Outdoor Services')}
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3zM12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                ></path>
              </svg>
            }
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {categoriesData[activeCat].map((subCat, index) => (
            <SubcategoryButton
              key={index}
              name={subCat}
              onClick={goToRequest}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function CategoryIcon({
  name,
  icon,
  active,
  onClick,
}: {
  name: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center group relative cursor-pointer outline-none w-24"
    >
      <div
        className={`p-4 rounded-xl mb-3 transition ${
          active
            ? 'bg-[#e9e6fb] text-[#4a3198]'
            : 'text-gray-500 group-hover:bg-gray-50 group-hover:text-gray-900'
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs md:text-sm text-center leading-tight ${
          active
            ? 'font-semibold text-[#4a3198]'
            : 'font-medium text-gray-600 group-hover:text-gray-900'
        }`}
      >
        {name}
      </span>
      {active && (
        <div className="absolute -bottom-10 w-8 h-[3px] bg-[#4a3198] rounded-t-md"></div>
      )}
    </button>
  );
}

function SubcategoryButton({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="border border-gray-300 hover:border-gray-900 rounded-full px-5 py-2.5 text-[15px] font-medium text-gray-800 transition-colors shadow-sm bg-white"
    >
      {name}
    </button>
  );
}
