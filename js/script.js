'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute("href")
    console.log(articleSelector)
    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
}



const opts = {
  ArticleSelector: '.post',
  TitleSelector: '.post-title',
  TitleListSelector: '.titles',
  ArticleTagsSelector: '.post-tags .list',
  ArticleAuthorSelector: '.post-author',
  TagsListSelector: '.tags.list',
  AuthorsListSelector: '.authors.list',
  CloudClassCountAuthors: 2,
  CloudClassAuthorsPrefix: 'author-size-',
  CloudClassCount: 4,
  CloudClassPrefix: 'tag-size-'
  };

function generateTitleLinks(customSelector = '') {
  
  /* remove contents of titleList */

  const titleList = document.querySelector(opts.TitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(opts.ArticleSelector + customSelector);

  let html = '';

  for (const article of articles) {
    /* get the article id */
    
    const articleId = article.getAttribute("id");

    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(opts.TitleSelector).innerHTML;
    
    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList
    titleList.insertAdjacentHTML('beforeend', linkHTML); */
    /* INSERT LINK INTO HTML VARIABLE  */
    html = html + linkHTML;

    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
  link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  console.log(params);
  return params;
}

function calculateAuthorsParams(authors) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }

  console.log(params);
  return params;
}

function calculateTagClass(count , params) {
  
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opts.CloudClassCount - 1) + 1);

  return opts.CloudClassPrefix + classNumber;

}

function calculateAuthorClass(count , params) {
  
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opts.CloudClassCountAuthors - 1) + 1);

  return opts.CloudClassAuthorsPrefix + classNumber;

}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(opts.ArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {
    /* find tags wrapper */

    const tagList = article.querySelector(opts.ArticleTagsSelector);
    /* make html variable with empty string */

    let html = '';
    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      } /* END LOOP: for each tag */
    
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;
  /* END LOOP: for every article: */
  }
   

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.TagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:',tagsParams);

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML; 
  console.log(allTagsHTML);

  }

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log(tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const relatedTags = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let relatedTag of relatedTags) {
    /* add class active */
    relatedTag.classList.add('active');
    console.log(relatedTag);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.list-horizontal a');
  /* START LOOP: for each link */

  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty array */
  let allAuthors = {};
  
  /* find all articles */

  const articles = document.querySelectorAll(opts.ArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author wrapper */

    const authorList = article.querySelector(opts.ArticleAuthorSelector);
    console.log(authorList);
    /* make html variable with empty string */

    let html = '';
    /* get author from data-author attribute */

    const author = article.getAttribute("data-author");
    console.log(author);

    const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
    console.log(linkHTML);

    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors.hasOwnProperty(author)) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

    /* insert HTML of all the links into the author wrapper */

    /* END LOOP: for every article: */
    authorList.innerHTML = html;
  }
  
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(opts.AuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:',authorsParams);

  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = '<li><a href="#author-' + author + '" class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
    allAuthorsHTML += authorLinkHTML;
  }
  /* [NEW] END LOOP: for each author in allAuthors: */

  /* [NEW] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = allAuthorsHTML; 
  console.log(allAuthorsHTML);
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-','');
  console.log(author);
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  }
  /* END LOOP: for each active author link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const relatedAuthors = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for (let relatedAuthor of relatedAuthors) {
    /* add class active */
    relatedAuthor.classList.add('active');
    console.log(relatedAuthor);
  }
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('.post-author a');
  /* START LOOP: for each link */

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
    /* add authorClickHandler as event listener for that link */
  }
  /* END LOOP: for each link */
}
addClickListenersToAuthors();