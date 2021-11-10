const books = require('../../model/book');
const librarian = require('../../model/librarian');
const user = require('../../model/user');
const bookIssued = require('../../model/bookIssued');
const { router } = require('../../app');

const invalidInput =async function(result) {
    try{
        return res.json(result);
    }catch(err){return err}
    };


module.exports = function (router) {
    //for creating book record
  router.post('/addbook',  function (req, res) {
        let bookData =  user.findOne({ isbn: req.body.isbn });
        if (bookData == null) {
            let newBook = new books(req.body);
            newBook.save(res.json(invalidInput(err,newBook)))
        }
        else {
            console.log(req.body.isbn);
            res.json({ msg: 'Book already exists'});
        }
    })

    //for creating new users
    router.post('/addUser',async  function (req, res) {
        let userData = await user.findOne({ allocId: req.body.allocId });
        try{
        if (userData == null) {
            let newUser = new user(req.body);
            newUser.save(res.json(invalidInput(newUser))) 
        }}
        catch {
            console.log(userData);
            res.json({ msg: 'User already exists' });
        }
    })

    //Get book by isbn
    router.get('/books/:isbn', function (req, res) {
            let bookData =  books.find({isbn:req.params.isbn});
           // res.json(bookData);
            invalidInput(bookData);
    })

    //Get book by name
    router.get('/book/:name',  function (req, res) {
            let bookData =  books.find({ name: req.params.name });
            res.json(invalidInput(bookData))
    })

    //for updation after issuing a book
    router.post('/issueBooks', async function (req, res) {
        try {
            let userData = await user.findOne({ allocId: req.body.allocId });
            let bookData = await books.findOne({ isbn: req.body.isbn });
            let issuedData = new bookIssued();
            issuedData.userId = userData._id;
            issuedData.bookId = bookData._id;
            var date = new Date(); // Now
            date.setDate(date.getDate() + 30); // Set now + 30
            issuedData.dueDate = date;
            issuedData.save(res.json(invalidInput(err, response)))
        }
        catch (err) {
            res.json(err);
        }
    })

    router.put('/returnbooks/:id',  function (req, res) {
            let book =  bookIssued.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: 'INACTIVE' } });
            res.invalidInput(err,book);
    });

    router.get('/:userId',  function (req, res) {
            let userData =  user.findOne({ allocId: req.params.allocId });
            res.invalidInput(err,userData);
    })
}

