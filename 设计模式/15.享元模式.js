/**
 * Created by Photon_palanx on 2017/5/11.
 */
/*
 * 享元模式解决了类似的东西大量创建带来的性能问题
 * 比如有50张桌子，可以让50个人搬，但是这样的创建量实在太大了
 * 现在可以只创建一个人（或者是必要的人数）一张张搬（当然这个人会很累2333），节省消耗
 *
 * 反应在页面里，可以是一个分页显示图片的页面，假设一个页面显示5张图片，下一个页面可以复用前面的图片容器，更改照片内容
 * 也可以是吧之前创建过的缓存起来下次直接使用，这样一次只要创建5个容器，而不是一次吧所有的容器创建起来设定哪些显示
 *
 * 还有一个经典的案例是js设计模式动物书中的借书
 * 一个图书馆假设有3本同样的书，但是借书的人自然是不一样的
 * 我们可以创建3个完全的对象，有isbn，title，borrower，date等,这是最直接的做法
 * 但是其实isbn和title这3本书是一样的，这部分内容可以复用
 * 当然这样的复用会用一个工厂，起到缓存作用（享元）
 * */

// 以借书为例
function Book (isbn, title) {
  this.isbn = isbn;
  this.title = title
}

function BookFactory (isbn, title) {
  if (!BookFactory.existBooks) BookFactory.existBooks = {};
  var book = BookFactory.existBooks[isbn];
  if (book) return book;
  else {
    book = new Book(isbn, title);
    BookFactory.existBooks[isbn] = book;
    return book;
  }
}

// 这里简化，不考虑书有几本，只考虑添加借书信息
function BookManager (isbn, title, borrower) {
  this.book = BookFactory(isbn, title);
  this.borrower = borrower;
  this.lendDate = new Date();
}

// 测试
var book1 = new BookManager(123, 'JS设计模式', 'T');
var book2 = new BookManager(123, 'JS设计模式', 'T2');

console.log(book1.book === book2.book); // true
console.log(book1.borrower); // T
console.log(book2.borrower); // T2