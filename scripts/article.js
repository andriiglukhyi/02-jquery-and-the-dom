'use strict';

// empty array to store data
let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// tThis is a constructor function. Purpose - instantiate new objects.  this mean stuff inside this object.

// constructor function for new articles
function Article(rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.cat = rawDataObj.category;
  this.aut = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.bod = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // we can have the same structure and just render it to the page with new data. 
  // .clone() is a convenient way to duplicate elements on a page


  let $newArticle = $('article.template').clone().removeClass('template');
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */


  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category',this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */



  $newArticle.find('address').html('<a href=' + this.authorUrl + '>' + this.aut + '</a>');

  $newArticle.find('h1').html(this.title);
  // $('.templete').find('h1').html(this.title);

  $newArticle.find('.article-body').html(this.bod);
  // $('.templete')

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(item){
  articles.push(new Article(item) )});
// // console.log(rawData);

articles.forEach(function(item){
  $('#articles').append(item.toHtml())
});