'use strict'

/// Globa variable
const keywordArr= [];

// Image Constructor
function ImgStorage(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    ImgStorage.allimageStorage.push(this);
  }
  ImgStorage.allimageStorage = [];
  ImgStorage.allimageStorage2 = [];


// Rendering Images with Mustache and jQuery
ImgStorage.prototype.renderWithJQueryAndMustache = function() {

  const imgTemplateHtml = $('#mustache-template-section').html(); //  1. get the html from the script tag
  const outputFromMustache = Mustache.render(imgTemplateHtml, this); //  2. pass the html and an object to Mustache.render(html, object)  
  $('body > section').append(outputFromMustache);   // 3. append it to the page
};

// This Function utilizes AJAX to pull images from the server
  function objectFile(arrayObject) {    // STAND ALONE FUNCTION
  
    arrayObject.forEach(animalPic => {
        
    new ImgStorage(animalPic.image_url, animalPic.title, animalPic.description, animalPic.keyword, animalPic.horns);
    
            // Fills the Select Element
            if ($(`select:contains(${animalPic.keyword})`).length === 0){
            renderAnimalOptions(animalPic.keyword);
            }
    });
    ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderWithJQueryAndMustache());
  }

/// Renders Dropdown Menu
function renderAnimalOptions(dropdownOptions){
    $('select').append('<option>' + dropdownOptions + '</option>');
  }


/////////////////////////
///// Main Program
/////////////////////////
// This Intiates Data File to be read and stored locally
$.ajax('data/page-1.json').then(objectFile); 

/// Function to click and filter
$('select').on('change', filterSelection);



function filterSelection(event) {
 $('body > section').empty();

 ImgStorage.allimageStorage.forEach(animalpic => {
  if (animalpic.keyword === event.target.value){
          animalpic.renderWithJQueryAndMustache()
      }
    })
  }


  $('button:first-of-type').on('click', () => {
    $('body > table tr:nth-child(n+2)').empty();
    ImgStorage.allimageStorage.forEach(animalPic => animalPic.renderWithJQueryAndMustache());
  });
  
  $('button:nth-of-type(2)').on('click', () => {
    $('body > table tr:nth-child(n+2)').empty();
    ImgStorage.allimageStorage2.forEach(animalPic2 => animalPic2.renderWithJQueryAndMustache());
  
  });


















