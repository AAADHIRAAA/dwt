
const Book = require('../models/bookModel');
const AppError = require('../utils/AppError');

async function addBook(req, res) {
    try {
        const userid=req.params.id;
        console.log(req.body);
       
          const {
            _id,
            title,
            pages_scanned,
            ID_url,
            author_name,
            publisher_name,
            year,
            total_pages,
          } = req.body;
          
          const newBook = new Book({
            _id,
            title,
            pages_scanned,
            ID_url,
            author_name,
            publisher_name,
            year,
            total_pages,
          });
          await newBook.save();
        
        res.status(201).json(
            { message: 'New book added'}
        );
    } catch (error) {
        // console.error('Error adding a new book:', error);
        const e = new AppError("Error adding a new book: "+error.message, 400);
        e.sendResponse(res)
    }
}

async function updateBook(req, res) {
    try {
        const bookId = req.params.id;
        const { title, author_name,publisher_name, pages_scanned, total_pages, ID_url, year } = req.body;
        console.log(req.body);
        // Update the book details in the Books collection
        const updatedBook = await Book.findByIdAndUpdate(
             bookId,
            { title, author_name, publisher_name, pages_scanned, total_pages, ID_url, year,updated_at:Date.now()},
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(
            { message: 'Book updated successfully'});
    } catch (error) {
        // console.error('Error updating book:', error);
        const e = new AppError("Error Updating book: "+error.message, 400);
        e.sendResponse(res)    }
}

// Function to fetch overall statistics
const getOverallStatistics = async (req, res) => {
    try {
      const booksScanned = await Book.countDocuments();
      const pagesScanned = await Book.aggregate([{ $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } }]);
      const authorCount = (await Book.distinct('author_name')).length;
      const publisherCount = (await Book.distinct('publisher_name')).length;
  
      res.json({
        booksScanned,
        pagesScanned: pagesScanned[0].totalPages,
        authorCount,
        publisherCount,
      });
    } catch (error) {
      console.error('Error fetching overall statistics:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Function to fetch statistics for a specific date
  const getStatisticsForDate = async (req, res) => {
    let  currentdate  = new Date();
    try {
      const startOfDay = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
      const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

      const booksScannedToday = await Book.countDocuments({
          scanned_at: {
              $gte: startOfDay,
              $lt: endOfDay,
          },
      });

      const pagesScannedToday = await Book.aggregate([
          {
              $match: {
                  scanned_at: {
                      $gte: startOfDay,
                      $lt: endOfDay,
                  },
              },
          },
          { $group: { _id: null, totalPages: { $sum: '$pages_scanned' } } },
      ]);

      res.json({
          booksScannedToday,
          pagesScannedToday: pagesScannedToday[0]?.totalPages || 0,
      });
  } catch (error) {
      console.error('Error fetching statistics for date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
    
  };

module.exports = {
    addBook,
    updateBook,
    getOverallStatistics,
    getStatisticsForDate
};