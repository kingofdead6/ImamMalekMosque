import { useEffect, useState } from "react";

const METHOD = 2; // Calculation method
const DEFAULT_LOCATION = { lat: 36.7538, lon: 3.0588 }; // Algiers coordinates

export default function Mawaqit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("الجزائر"); // Default to Algiers

  useEffect(() => {
    if (!navigator.geolocation) {
      setErr("المتصفح لا يدعم تحديد الموقع الجغرافي");
      setLocation(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        // Reverse geocoding to get city name
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const json = await response.json();
          setCity(json.address.city || json.address.town || "موقع غير معروف");
        } catch {
          setCity("موقع غير معروف");
        }
      },
      () => {
        setErr("لم يتم السماح بالوصول إلى الموقع");
        setLocation(DEFAULT_LOCATION);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    fetch(
      `https://api.aladhan.com/v1/timings?latitude=${location.lat}&longitude=${location.lon}&method=${METHOD}`
    )
      .then((r) => r.json())
      .then((json) => {
        if (json.code !== 200) throw new Error("فشل في جلب المواقيت");
        setData(json.data);
        setErr("");
      })
      .catch((e) => setErr(e.message || "خطأ"))
      .finally(() => setLoading(false));
  }, [location]);

  const prayers = [
  { key: "Fajr", label: "الفجر", image: "https://res.cloudinary.com/dtwa3lxdk/image/upload/v1755975852/sunrise_jveebm.png" },
  { key: "Dhuhr", label: "الظهر", image: "https://res.cloudinary.com/dtwa3lxdk/image/upload/v1755976028/sun_2_xsubuj.png" },
  { key: "Asr", label: "العصر", image: "https://res.cloudinary.com/dtwa3lxdk/image/upload/v1755976027/sun_1_teiwgc.png" },
  { key: "Maghrib", label: "المغرب", image: "https://res.cloudinary.com/dtwa3lxdk/image/upload/v1755976030/sunsets_lsxkle.png" },
  { key: "Isha", label: "العشاء", image: "https://res.cloudinary.com/dtwa3lxdk/image/upload/v1755976031/moon_poczdh.png" },
];


  return (
    <section
      id="mawaqit"
      className="py-20 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block">
            مواقيت الصلاة
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-lg font-medium text-light-subtext dark:text-dark-subtext animate-pulse">
            ...جاري تحميل المواقيت
          </div>
        )}

        {/* Error */}
        {err && (
          <div className="text-center text-red-500 dark:text-red-400 font-semibold bg-light-surface dark:bg-dark-surface px-6 py-3 rounded-xl shadow-md neon-glow-red">
            حدث خطأ: {err}
          </div>
        )}

        {/* Content */}
        {data && (
          <>
            {/* Location & Date Box */}
            <div className="flex justify-center mb-10">
              <div className="relative p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 neon-glow-card w-full max-w-xl text-center overflow-hidden">
                <div className="relative flex flex-col sm:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-red-500 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xl font-semibold text-light-primary dark:text-dark-primary">
                      الموقع: {city}
                    </span>
                  </div>
                  <div className="w-full sm:w-px h-px sm:h-16 bg-light-border dark:bg-dark-border"></div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xl text-light-subtext dark:text-dark-subtext font-medium">
                      {data.date.gregorian.weekday.ar}  {data.date.hijri.weekday.ar}
                    </span>
                    <span className="text-lg font-bold text-light-primary dark:text-dark-primary">
                      {data.date.hijri.day} {data.date.hijri.month.ar} {data.date.hijri.year} هـ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
              {prayers.map((p) => (
                <div
  key={p.key}
  className="relative p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 neon-glow-card overflow-hidden"
>
  {/* Dynamic background image */}
  <div
    className="absolute inset-0 rounded-2xl bg-cover bg-center opacity-50 pointer-events-none"
    style={{ backgroundImage: `url(${p.image})` }}
  ></div>

  <div className="relative flex flex-col">
    <div className="flex items-center gap-3 mb-3">
      <svg
        className="w-5 h-5 text-light-gold dark:text-dark-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 12a9 9 0 11-6.22-8.66M12 3v3m0 12v3m9-9h-3m-12 0H3"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
        />
      </svg>
      <h3 className="font-bold text-xl text-light-primary dark:text-dark-primary">
        {p.label}
      </h3>
    </div>
    <p className="text-2xl font-mono text-light-text dark:text-dark-text">
      {data.timings[p.key]}
    </p>
  </div>
</div>

              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
