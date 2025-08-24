import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import axios from 'axios';
import { API_BASE_URL } from '../../../api.js';

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/books`);
        const mappedBooks = response.data
          .filter((book) => book.showOnMainPage)
          .map((book) => ({
            id: book._id,
            volumeInfo: {
              title: book.title,
              description: book.description || "لا توجد وصف متاح.",
              imageLinks: { thumbnail: book.images[0] || "https://via.placeholder.com/150x200?text=كتاب" }
            },
            images: book.images
          }));
        setBooks(mappedBooks);
        setFilteredBooks(mappedBooks);
        setError("");
      } catch (err) {
        setError("خطأ في جلب الكتب");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      setFilteredBooks(books);
      return;
    }
    const filtered = books.filter((book) =>
      book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
    setError(filtered.length === 0 ? "لم يتم العثور على كتب." : "");
  };

  const openPopup = (book) => {
    setSelectedBook(book);
    setCurrentImageIndex(0); // Reset to first image when opening popup
  };

  const closePopup = () => {
    setSelectedBook(null);
    setCurrentImageIndex(0); // Reset index when closing
  };

  const nextImage = () => {
    if (selectedBook && selectedBook.images && selectedBook.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === selectedBook.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedBook && selectedBook.images && selectedBook.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? selectedBook.images.length - 1 : prevIndex - 1
      );
    }
  };

  const getDescription = (description) => {
    return description ? description.slice(0, 100) + "..." : "لا توجد وصف متاح.";
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0 0 20px rgba(52, 211, 153, 0.6)" },
  };

  return (
    <section
      id="books-page"
      className="py-26 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-5xl font-extrabold text-light-primary dark:text-dark-primary relative inline-block font-amiri">
            تصفح الكتب
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-light-accent to-light-gold dark:from-dark-accent dark:to-dark-gold rounded-full neon-glow"></span>
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          className="flex justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن كتاب..."
            className="px-4 py-2 rounded-l-lg bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text border border-light-border dark:border-dark-border neon-glow-input font-amiri w-60 md:w-80"
          />
          <button
            type="submit"
            className="cursor-pointer px-8 py-2 rounded-lg bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent text-white font-semibold neon-glow-button font-amiri"
          >
            بحث
          </button>
        </motion.form>

        {loading && (
          <div className="text-center text-lg animate-pulse font-amiri">
            ...جاري البحث
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 dark:text-red-400 font-semibold font-amiri">
            {error}
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              className="relative p-4 rounded-lg bg-light-surface dark:bg-dark-surface shadow-xl neon-glow-card cursor-pointer"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ delay: index * 0.05 }}
              onClick={() => openPopup(book)}
            >
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-bold mt-2 text-light-primary dark:text-dark-primary font-amiri">
                {book.volumeInfo.title}
              </h3>
              <p className="text-sm text-light-subtext dark:text-dark-subtext font-amiri">
                {getDescription(book.volumeInfo.description)}
              </p>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-light-accent/10 to-light-gold/10 dark:from-dark-accent/10 dark:to-dark-gold/10 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Popup Modal with Slider */}
      {selectedBook && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-xl max-w-lg w-full mx-4 neon-glow-card relative flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closePopup}
              className="cursor-pointer absolute top-2 right-2 text-light-subtext dark:text-dark-subtext hover:text-red-500 duration-300 z-10"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="relative w-full h-64 mb-4">
              {selectedBook.images && selectedBook.images.length > 0 ? (
                <>
                  <motion.img
                    key={currentImageIndex}
                    src={selectedBook.images[currentImageIndex]}
                    alt={`Book page ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain rounded"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-light-primary dark:bg-dark-primary text-white p-2 rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
                    disabled={selectedBook.images.length <= 1}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-light-primary dark:bg-dark-primary text-white p-2 rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
                    disabled={selectedBook.images.length <= 1}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Image Counter */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-light-subtext dark:text-dark-subtext font-amiri text-sm">
                    {currentImageIndex + 1} / {selectedBook.images.length}
                  </div>
                </>
              ) : (
                <img
                  src={selectedBook.volumeInfo.imageLinks.thumbnail}
                  alt={selectedBook.volumeInfo.title}
                  className="w-full h-full object-contain rounded"
                />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-light-primary dark:text-dark-primary font-amiri">
              {selectedBook.volumeInfo.title}
            </h3>
            <p className="text-light-subtext dark:text-dark-subtext font-amiri">
              {selectedBook.volumeInfo.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function getDescription(description) {
  return description ? description.slice(0, 100) + "..." : "لا توجد وصف متاح.";
}