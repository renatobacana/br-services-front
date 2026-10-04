'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase'; //Ajuste para '../lib/supabase' se sua pasta for minúscula

export default function RequestService() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // Estados mapeados exatamente para as colunas do seu SQL do Supabase
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [description, setDescription] = useState('');
  const [timing, setTiming] = useState('As soon as possible'); // mapeia para preferred_time
  const [street, setStreet] = useState(''); // mapeia para address
  const [name, setName] = useState(''); // mapeia para customer_name
  const [email, setEmail] = useState(''); // mapeia para customer_email
  const [phone, setPhone] = useState(''); // mapeia para customer_phone
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Envio corrigido conforme a sua estrutura SQL exata
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const { error } = await supabase.from('service_requests').insert([
      {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        address: street,
        postal_code: postalCode,
        description: description,
        preferred_date: 'Flexible', // Valor padrão caso não tenha campo específico de data
        preferred_time: timing,
        status: 'pending',
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error('Error saving request:', error);
      alert(
        'There was an error submitting your request. Please check the console.'
      );
    } else {
      alert('Request submitted successfully! Pros will contact you soon.');
      window.location.href = '/';
    }
  };

  // Lógica do código postal (mantida)
  const getFallbackCity = (prefix: string) => {
    const nbCities: Record<string, string> = {
      E1A: 'Moncton',
      E1C: 'Moncton',
      E1E: 'Moncton',
      E1G: 'Moncton',
      E1J: 'Moncton',
      E1V: 'Miramichi',
      E1N: 'Miramichi',
      E2A: 'Bathurst',
      E2J: 'Saint John',
      E2K: 'Saint John',
      E2L: 'Saint John',
      E2M: 'Saint John',
      E2P: 'Saint John',
      E2S: 'Saint John',
      E2E: 'Quispamsis / Rothesay',
      E2G: 'Quispamsis / Rothesay',
      E2V: 'Oromocto',
      E3B: 'Fredericton',
      E3C: 'Fredericton',
      E3A: 'Fredericton',
      E3G: 'Fredericton',
      E3V: 'Edmundston',
      E4C: 'Sussex',
    };
    if (nbCities[prefix]) return nbCities[prefix];

    const firstLetter = prefix.charAt(0);
    const provinces: Record<string, string> = {
      E: 'New Brunswick',
      B: 'Nova Scotia',
      C: 'PEI',
      G: 'Quebec',
      H: 'Quebec',
      J: 'Quebec',
      K: 'Ontario',
      L: 'Ontario',
      M: 'Ontario',
      N: 'Ontario',
      P: 'Ontario',
    };
    return provinces[firstLetter] || 'Valid Location';
  };

  const fetchCityFromAPI = async (prefix: string) => {
    setIsSearching(true);
    setCity('Searching...');
    try {
      const response = await fetch(`https://api.zippopotam.us/ca/${prefix}`);
      if (response.ok) {
        const data = await response.json();
        setCity(data.places[0]['place name']);
      } else {
        setCity(getFallbackCity(prefix));
      }
    } catch (error) {
      setCity(getFallbackCity(prefix));
    } finally {
      setIsSearching(false);
    }
  };

  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[\s-]/g, '');
    if (value.length > 3) {
      value = value.substring(0, 3) + ' ' + value.substring(3, 6);
    }
    setPostalCode(value);

    const prefix = value.replace(/\s/g, '').substring(0, 3);
    if (prefix.length === 3) {
      if (/^[A-Z][0-9][A-Z]$/.test(prefix)) {
        if (city === '' || city === 'Invalid Format') fetchCityFromAPI(prefix);
      } else {
        setCity('Invalid Format');
      }
    } else if (prefix.length < 3) {
      setCity('');
    }
  };

  const isPostalCompleteAndValid = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/.test(
    postalCode
  );

  const isStepValid = () => {
    if (step === 1)
      return (
        isPostalCompleteAndValid && !isSearching && city !== 'Invalid Format'
      );
    if (step === 2) return description.trim().length > 5;
    if (step === 3) return timing !== '';
    if (step === 4) return street.trim().length > 3;
    if (step === 5)
      return (
        name.trim().length > 2 && email.includes('@') && phone.trim().length > 8
      );
    return false;
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* CABEÇALHO */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-600">
              Service Request
            </span>
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="text-gray-400 hover:text-gray-800 cursor-pointer p-2 transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#4a3198] h-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* ETAPA 1: CÓDIGO POSTAL */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
              Describe your job and get in touch with
              <br />
              pros near you.
            </h1>
            <div className="mb-12">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Postal code for the job
              </label>
              <div className="flex items-center border border-gray-400 rounded-md overflow-hidden max-w-sm focus-within:border-[#4a3198] focus-within:ring-1 focus-within:ring-[#4a3198]">
                <input
                  type="text"
                  value={postalCode}
                  onChange={handlePostalChange}
                  placeholder="A1A 1A1"
                  className="w-[120px] px-4 py-3 outline-none text-gray-700 uppercase"
                  maxLength={7}
                />
                <div className="h-6 w-px bg-gray-300 mx-2"></div>
                <input
                  type="text"
                  value={city}
                  readOnly
                  placeholder="City"
                  className={`w-full px-2 py-3 outline-none bg-white font-medium ${
                    isSearching ? 'text-[#4a3198] animate-pulse' : ''
                  } ${
                    city === 'Invalid Format' ? 'text-red-500' : 'text-gray-900'
                  } placeholder-gray-400`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Example: E1A 1A1 or E2J 3Z1
              </p>
            </div>
          </div>
        )}

        {/* ETAPA 2: DESCRIÇÃO */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-8">
              Please describe the service you need
            </h1>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-400 rounded-md p-4 h-40 focus:outline-none focus:border-[#4a3198] focus:ring-1 focus:ring-[#4a3198] transition"
              placeholder="Give pros as much detail as possible..."
            ></textarea>
          </div>
        )}

        {/* ETAPA 3: URGÊNCIA */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-8">
              When do you need this done?
            </h1>
            <div className="flex flex-col gap-4 max-w-md">
              <TimingOption
                label="As soon as possible"
                value="As soon as possible"
                current={timing}
                setTiming={setTiming}
              />
              <TimingOption
                label="Within a week"
                value="Within a week"
                current={timing}
                setTiming={setTiming}
              />
              <TimingOption
                label="Flexible / No rush"
                value="Flexible / No rush"
                current={timing}
                setTiming={setTiming}
              />
            </div>
          </div>
        )}

        {/* ETAPA 4: MORADA */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-8">
              Where exactly is the job?
            </h1>
            <div className="flex flex-col gap-4 max-w-md">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-[#4a3198]"
                  placeholder="e.g., 123 Main St, Saint John"
                />
              </div>
            </div>
          </div>
        )}

        {/* ETAPA 5: CONTACTOS */}
        {step === 5 && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold mb-4">Your contact details</h1>
            <p className="text-gray-600 mb-8">
              Pros will use this to contact you with quotes.
            </p>
            <div className="flex flex-col gap-5 max-w-md">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-[#4a3198]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-[#4a3198]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-400 rounded-md p-3 focus:outline-none focus:border-[#4a3198]"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        )}

        {/* BOTÕES DE NAVEGAÇÃO */}
        <div className="flex gap-4 mt-10 pt-6 border-t border-gray-100">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 border border-gray-400 text-[#4a3198] font-bold rounded-md hover:bg-gray-50 transition"
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
          <button
            onClick={step === totalSteps ? handleSubmit : nextStep}
            disabled={!isStepValid() || isSubmitting}
            className={`px-8 py-3 font-bold rounded-md transition ${
              !isStepValid() || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#4a3198] text-white hover:bg-[#3b277a]'
            }`}
          >
            {step === totalSteps
              ? isSubmitting
                ? 'Submitting...'
                : 'Submit Request'
              : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}

function TimingOption({
  label,
  value,
  current,
  setTiming,
}: {
  label: string;
  value: string;
  current: string;
  setTiming: (val: string) => void;
}) {
  const isActive = current === value;
  return (
    <div
      onClick={() => setTiming(value)}
      className={`flex items-center p-4 border rounded-md cursor-pointer transition ${
        isActive
          ? 'border-[#4a3198] bg-[#f5f3ff]'
          : 'border-gray-300 hover:border-gray-500'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
          isActive ? 'border-[#4a3198]' : 'border-gray-400'
        }`}
      >
        {isActive && (
          <div className="w-2.5 h-2.5 bg-[#4a3198] rounded-full"></div>
        )}
      </div>
      <span
        className={`font-medium ${
          isActive ? 'text-[#4a3198]' : 'text-gray-700'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
