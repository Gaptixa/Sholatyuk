import React, { useState, useEffect } from 'react';
import { getAllCities } from '../api';

interface City {
  id: string;
  lokasi: string;
}

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        const citiesData = await getAllCities();
        setCities(citiesData);
        setFilteredCities(citiesData);
      } catch (err) {
        setError('Gagal memuat data kota. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  useEffect(() => {
    const filtered = cities.filter(city =>
      city.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm, cities]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-400 mx-auto"></div>
          <p className="mt-4 text-gray-300">Memuat daftar kota...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-start pt-6 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Header */}
        <header className="text-center mb-6 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-400 to-purple-500 text-transparent bg-clip-text mb-4 tracking-tight">
            Sholatyuk
          </h1>
          
          <p className="text-gray-400 mb-6">Temukan waktu sholat tepat untuk daerahmu</p>
        </header>

        {/* Search Box */}
        <div className="max-w-3xl mx-auto card bg-gray-800/40 backdrop-blur-xl py-4 px-6 rounded-2xl shadow-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari kota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 bg-gray-900/30 text-gray-100 placeholder-gray-400 focus:outline-none text-lg rounded-xl border border-gray-700/30 focus:border-purple-500/50 transition-all duration-300"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* City List */}
        <div className="max-w-3xl mx-auto card bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <div 
            className="h-[calc(100vh-350px)] overflow-y-auto custom-scrollbar"
          >
            {filteredCities.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-lg">
                Tidak ada kota yang sesuai dengan pencarian
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
                {filteredCities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => onCitySelect(city)}
                    className="prayer-time-item bg-gray-800/40 backdrop-blur-xl py-4 px-4 rounded-xl hover:bg-gray-800/60 transition-all duration-300 border border-gray-700/30 hover:border-purple-500/50 group hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-100 group-hover:text-white transition-colors text-lg font-medium">
                        {city.lokasi}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelector; 