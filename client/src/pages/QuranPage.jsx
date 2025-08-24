import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all Surahs
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((json) => {
        if (json.code !== 200) throw new Error("فشل في جلب قائمة السور");
        setSurahs(json.data);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Fetch selected Surah
  const fetchSurah = (id) => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.code !== 200) throw new Error("فشل في جلب السورة");
        setSelectedSurah(json.data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section
      id="quran"
      className="py-30 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            القرآن الكريم
          </h2>
        </motion.div>

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 dark:text-red-400 font-semibold bg-light-surface dark:bg-dark-surface px-6 py-3 rounded-xl shadow-md font-amiri">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Surah List */}
          <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[70vh]">
            <h3 className="text-xl font-bold mb-4 text-light-primary dark:text-dark-primary font-amiri">
              السور
            </h3>
            <ul className="space-y-2">
              {surahs.map((s) => (
                <li key={s.number}>
                  <button
                    onClick={() => fetchSurah(s.number)}
                    className="w-full text-right px-3 py-2 rounded-lg hover:bg-light-border dark:hover:bg-dark-border transition font-amiri"
                  >
                    {s.number}. {s.name} 
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Surah Content */}
          <div className="md:col-span-3 bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[70vh]">
            {loading && (
              <div className="text-center text-lg animate-pulse font-amiri">
                ...جاري التحميل
              </div>
            )}

            {!loading && selectedSurah && (
              <>
                <h3 className="text-2xl font-bold text-center mb-6 text-light-primary dark:text-dark-primary font-amiri">
                  {selectedSurah.name} 
                </h3>

                {/* Big Bismillah at the top (except Surah 9) */}
                {selectedSurah.number !== 9 && (
                  <p className="text-4xl text-center text-light-gold dark:text-dark-gold font-amiri mb-10">
                    ﷽
                  </p>
                )}

                {/* Ayahs flowing inline */}
                <div className="text-3xl leading-loose text-right font-amiri tracking-wide">
                  {selectedSurah.ayahs.map((a) => {
                    let text = a.text.trim();

                    // Skip basmala if it's the first ayah
                    if (
                      a.numberInSurah === 1 &&
                      text.startsWith("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ")
                    ) {
                      text = text.replace(
                        /^بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ/,
                        ""
                      ).trim();
                    }

                    return (
                      <span key={a.number} className="inline">
                        {text && (
                          <>
                            {text}{" "}
                            <span className="text-light-gold dark:text-dark-gold">
                              ﴿{a.numberInSurah}﴾
                            </span>{" "}
                          </>
                        )}
                      </span>
                    );
                  })}
                </div>
              </>
            )}

            {!loading && !selectedSurah && (
              <p className="text-center text-light-subtext dark:text-dark-subtext font-amiri">
                اختر سورة من القائمة لعرضها
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
