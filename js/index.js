let dataHome =[] 


$("#onpenNav").click(function () {
    console.log("dd ");
    $('nav').animate({left:"0px"},580)
    $('#Search').animate({top: "20px" , opacity:1} , 700,function(){
      $('#Home').animate({top: "70px" ,opacity:1},600,function(){
        $('#Categories').animate({top: "120px" ,opacity:1} , 480,function(){
          $('#Area').animate({top: "170px",opacity:1} , 360,function(){
            $('#Ingredients').animate({top: "220px",opacity:1} , 240 ,function(){
                $('#Contact').animate({top: "270px",opacity:1} , 120)
            })
          })
        })
      })
     
    })
    $('#closeNav').css("display","block")
    $('#onpenNav').css("display","none")
  })
$("#closeNav").click(function(){
  $('#closeNav').css("display","none")
  $('#onpenNav').css("display","block")
  $('nav').animate({left:"-225px"},580)
  $('#Contact').animate({top: "650px" , opacity:0} , 500)
    $('#Ingredients').animate({top: "600px" ,opacity:0},500)
      $('#Area').animate({top: "550px" ,opacity:0} , 500)
        $('#Categories').animate({top: "500px",opacity:0} , 500)
          $('#Home').animate({top: "450px",opacity:0} , 500 )
              $('#Search').animate({top: "400px",opacity:0} , 500)
   
})
// start Home 
async function dataHomeApi(e){
  $('.loading-container').fadeIn(500)
  let apidata =await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
  let data =await apidata.json()
  dataHome =data.meals
  return dataHome
}

async function displaydataHome(){
 await dataHomeApi('')
let cartona=``
$('.loading-container').fadeOut(100) 
for (let i = 0; i < dataHome.length; i++) {
  cartona +=` <div class="col-xl-3  col-lg-4 col-md-6 ">
                <a onclick="apiChiledHome('${dataHome[i].strMeal}')"  id="imageHome" class="text-black"><div class="item w-100 position-relative overflow-hidden">
                <img src="${dataHome[i].strMealThumb}" alt="" class="w-100 rounded-3">
                <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 "  >
                    <h2>${dataHome[i].strMeal}</h2>
                </div>
                </div></a>
            </div>`
}

document.getElementById('rowdDataHome').innerHTML = cartona
}
if (document.getElementById('rowdDataHome')) {
  displaydataHome()
}

$('#Home').click(function(){
location.assign('index.html')
})
// end Home

//start Chiled
async function apiChiledHome(key){
localStorage.setItem('dataHomesStrMeal',key)
 location.assign('chiledHome.html')

}

async function dispalyChildHome() {
  $('.loading-container').fadeIn(300)
let keyapiChiled =localStorage.getItem('dataHomesStrMeal')
    let api = await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${keyapiChiled}`)
  let dataChiledHome = await api.json()
  let dataChlid =dataChiledHome.meals[0]
  let cartonas = ``
  $('.loading-container').fadeOut(100)
    cartonas+=` <div class=" col-lg-4 col-md-12 ">
            <div class="item">
                <img src="${dataChlid.strMealThumb}" alt="" class="w-100  rounded-3">
                <h4 class="py-2 mt-2 text-danger"">${dataChlid.strMeal}</h4>
            </div>
            </div>
            <div class="col-lg-8 col-md-12 ">
                <h3>Instructions</h3>
                <p class="py-1">${dataChlid.strInstructions}</p>
                <h5 class="py-2">Area:<span>${dataChlid.strArea}</span></h5>
                <h5 class="py-2">Category:<span>${dataChlid.strCategory}</span></h5>
                <h5 class="py-2 pb-4 mb-2">Tags:<span>Soup</span></h5>
                <button type="button" class="btn btn-success mx-2">Source</button>
                <button type="button" class="btn btn-outline-danger">Youtub</button>
            </div>`
    
  document.getElementById('rowdDataChiledHome').innerHTML = cartonas
}
if (document.getElementById('rowdDataChiledHome')) {
  dispalyChildHome()
}
// end Chiled



// start Categories
async function apicategories(){
  $('.loading-container').fadeIn(300)

  
   let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
   let dataCategories = await api.json()
   
   
   let dataCategoriesApi =dataCategories.categories
   let cartonas = ``
   $('.loading-container').fadeOut(100)
   for (let i = 0; i < dataCategoriesApi.length; i++) {
    cartonas+=` 
    <div class="col-xl-3  col-lg-4 col-md-6">
    <a  class="text-black" onclick="displayCiledOneCategory('${dataCategoriesApi[i].strCategory}')">
                    <div class="item w-100 position-relative overflow-hidden">
                    <img src="${dataCategoriesApi[i].strCategoryThumb}" alt="" class="w-100 rounded-3">
                    <div class=" item2 bg-white w-100 h-100 text-center  ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 ">
                        <h4>${dataCategoriesApi[i].strCategory}</h4>
                        <p>${dataCategoriesApi[i].strCategoryDescription}</p>
                    </div>
                    </div>
                    </a>
                </div>
    `
    
   }
   document.getElementById('rowdDataCategories').innerHTML = cartonas

}
if (document.getElementById('rowdDataCategories')) {
  apicategories()
}

$('#Categories').click(function(){

  location.assign('Categories.html')
  
})
// end Categories


 // start Ciled One Category
async function displayCiledOneCategory(key){
  console.log(key);
  
  localStorage.setItem('dataCiledOneCategory',key)
  location.assign('childCategories.html')
}

async function displaydataCiledOneCategory(){
  $('.loading-container').fadeIn(300)
  let key = localStorage.getItem('dataCiledOneCategory')
  let dataCiledOneCategory =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`)
  let {meals} =await dataCiledOneCategory.json()
 let cartona=``
 $('.loading-container').fadeOut(100)
 for (let i = 0; i < meals.length; i++) {
   cartona +=` <div class="col-xl-3  col-lg-4 col-md-6">
                 <a onclick="CiledtwoCategory('${meals[i].strMeal}')"  class="text-black"><div class="item w-100 position-relative overflow-hidden">
                 <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-3">
                 <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 "  >
                     <h2>${meals[i].strMeal}</h2>
                 </div>
                 </div></a>
             </div>`
 }
 document.getElementById('rowdDatachildCategories').innerHTML = cartona
 }

 if (document.getElementById('rowdDatachildCategories')) {
  displaydataCiledOneCategory()
 }
  // send Ciled One Category


  //start Ciled two Category
function CiledtwoCategory(key){
  console.log(key);
  
  localStorage.setItem('dataCiledTwoCategory',key)
  location.assign('childTwoCategories.html')
}

async function displaydataCiledtwoCategory(){
  $('.loading-container').fadeIn(300)
  let key = localStorage.getItem('dataCiledTwoCategory')
  let dataCiledTwoCategory =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
  let {meals} =await dataCiledTwoCategory.json()  
 let cartona=``
 $('.loading-container').fadeOut(100)
   cartona +=`
            <div class="  col-lg-4 col-md-12">
            <div class="item">
                <img src="${meals[0].strMealThumb}" alt="" class="w-100 rounded-3">
                <h4 class="py-2 mt-2 text-danger">${meals[0].strMeal}</h4>
            </div>
            </div>
            <div class=" col-lg-8 col-md-12">
                <h3>Instructions</h3>
                <p class="py-1">${meals[0].strInstructions}</p>
                <h5 class="py-2">Area:<span>${meals[0].strArea}</span></h5>
                <h5 class="py-2">Category:<span>${meals[0].strCategory}</span></h5>
                <h5 class="py-2 pb-4 mb-2">Tags:<span>Soup</span></h5>
                <button type="button" class="btn btn-success mx-2">Source</button>
                <button type="button" class="btn btn-outline-danger">Youtub</button>
            </div>
        
   `
 document.getElementById('rowdDataChildTwoCategories').innerHTML = cartona
 }

 if (document.getElementById('rowdDataChildTwoCategories')) {
  displaydataCiledtwoCategory()
 }
//
  //end Ciled two Category

  // start Area
  $('#Area').click(function(){
    location.assign('Area.html')
  }) 
  async function apiArea(){
    $('.loading-container').fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let {meals} = await api.json()
    let cartonas = ``
    $('.loading-container').fadeOut(100)
    for (let i = 0; i < meals.length; i++) {
      cartonas+=`
       <div class="col-xl-3  col-lg-4 col-md-6 ">
        <a onclick="AreaChiledOne('${meals[i].strArea}')"  class="text-white">
        <div class="itemArea py-2 text-center rounded-1 shadow    bg-black bg-gradient cursor">
            <i class="fa-solid fa-city fa-3x"></i>
            <h2 class="text-white ">${meals[i].strArea}</h2>
        </div>
         </a>
        </div>
      `
      
    }
    document.getElementById('rowdDataArea').innerHTML = cartonas
  }
  if (document.getElementById('rowdDataArea')) {
    apiArea()
  }

  // end Area 

  //start chlid one Area
  function AreaChiledOne(key){
  localStorage.setItem('dataCiledOneArea',key)
  location.assign('childOneArea.html')
  }

  async function displaydataChildOneArea(){
    $('.loading-container').fadeIn(300)
    let key = localStorage.getItem('dataCiledOneArea')
    let dataCiledOneArea =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`)
    let {meals} =await dataCiledOneArea.json()    
   let cartona=``
   $('.loading-container').fadeOut(100)
   for (let i = 0; i < meals.length; i++) {
     cartona +=`
          <div class="col-xl-3  col-lg-4 col-md-6">
          <a onclick="AreaChiledTwo('${meals[i].strMeal}')" class="text-black">
                <div class="item w-100 position-relative overflow-hidden">
                <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-3">
                <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 ">
                    <h2>${meals[i].strMeal}</h2>
                </div>
                </div>
                </a>
            </div>
     `
   }
   document.getElementById('rowDataChildOneArea').innerHTML = cartona
   }
if (document.getElementById('rowDataChildOneArea')) {
  displaydataChildOneArea()
}
  //end chlid one Area

  //strat child two Area
  function AreaChiledTwo(key){
  
  localStorage.setItem('dataCiledTwoArea',key)
  location.assign('childTwoArea.html')
  }

  async function displaydataCiledtwoArea(){
    $('.loading-container').fadeIn(300)
    let key = localStorage.getItem('dataCiledTwoArea')
    let dataCiledTwoArea =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    let {meals} =await dataCiledTwoArea.json()
  let cartona=``
  $('.loading-container').fadeOut(100)
  cartona +=`
              <div class=" col-lg-4 col-md-12 ">
              <div class="item">
                  <img src="${meals[0].strMealThumb}" alt="" class="w-100 rounded-3">
                  <h4 class="py-2 mt-2 text-danger">${meals[0].strMeal}</h4>
              </div>
              </div>
              <div class="col-lg-8 col-md-12 ">
                  <h3>Instructions</h3>
                  <p class="py-1">${meals[0].strInstructions}</p>
                  <h5 class="py-2">Area:<span>${meals[0].strArea}</span></h5>
                  <h5 class="py-2">Category:<span>${meals[0].strCategory}</span></h5>
                  <h5 class="py-2 pb-4 mb-2">Tags:<span>Soup</span></h5>
                  <button type="button" class="btn btn-success mx-2">Source</button>
                  <button type="button" class="btn btn-outline-danger">Youtub</button>
              </div>
     `
   document.getElementById('rowdDataChildTwoArea').innerHTML = cartona
   }

   if (document.getElementById('rowdDataChildTwoArea')) {
    displaydataCiledtwoArea()
   }
  //end child two Area

  // start Ingredients
  $("#Ingredients").click(function(){
    location.assign('Ingredients.html')
  })
  
  async function apiIngredients(){
    $('.loading-container').fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let {meals} = await api.json()
    let cartonas = ``
    $('.loading-container').fadeOut(100)
    for (let i = 0; i < meals.length; i++) {

      cartonas+=`
      ${
        i<20?`   <div class="col-xl-3  col-lg-4 col-md-6">
        <a onclick="IngredientsChiledOne('${meals[i].strIngredient}')"  class="text-white">
            <div class="items text-white text-center py-3 shadow px-1 bg-gradient rounded-2 cursor">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h4 class="py-1">${meals[i].strIngredient}</h4>
                <p class="pb-1 px-1">${meals[i].strDescription.split(' ').splice(0,20).join(" ")}</p>
            </div>
            </a>
        </div>`:""
      }
    
      `
      
    }
    document.getElementById('rowdDataIngredients').innerHTML = cartonas
  }
  if (document.getElementById('rowdDataIngredients')) {
    apiIngredients()
  }
  // end Ingredients



// start child one Ingredients
    function IngredientsChiledOne(key){
  localStorage.setItem('datachildOneIngredients',key)
  location.assign('childOneIngredients.html')
  }
  async function displaydataChildOneIngredients(){
    $('.loading-container').fadeIn(300)
    let key = localStorage.getItem('datachildOneIngredients')
    let dataCiledOneIngredients =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`)
    $('.loading-container').fadeOut(100)
    let {meals} =await dataCiledOneIngredients.json()    
   let cartona=``
   for (let i = 0; i < meals.length; i++) {
     cartona +=`
          <div class="col-xl-3  col-lg-4 col-md-6">
          <a onclick="IngredientsChiledTwo('${meals[i].strMeal}')"  class="text-black">
                <div class="item w-100 position-relative overflow-hidden">
                <img src="${meals[i].strMealThumb}" alt="" class="w-100 rounded-3">
                <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 ">
                    <h2>${meals[i].strMeal}</h2>
                </div>
                </div>
                </a>
            </div>
     `
   }
   document.getElementById('rowDataChildOneIngredientd').innerHTML = cartona
   }
   if ( document.getElementById('rowDataChildOneIngredientd')) {
    displaydataChildOneIngredients()
   }
// end child one Ingredients


// start child Two Ingredients
    function IngredientsChiledTwo(key){
      localStorage.setItem('dataCiledTwoIngredients',key)
  
      location.assign('childTwoIngredients.html')
      }
      async function displaydataCiledtwoIngredients(){
        $('.loading-container').fadeIn(300)
        let key = localStorage.getItem('dataCiledTwoIngredients')
        let dataCiledTwoArea =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
        let {meals} =await dataCiledTwoArea.json()
        $('.loading-container').fadeOut(100)
       let cartona=``
       
         cartona +=`
                  <div class="col-lg-4 col-md-12 ">
                  <div class="item">
                      <img src="${meals[0].strMealThumb}" alt="" class="w-100 rounded-3">
                      <h4 class="py-2 mt-2 text-danger">${meals[0].strMeal}</h4>
                  </div>
                  </div>
                  <div class="col-lg-8 col-md-12 ">
                      <h3>Instructions</h3>
                      <p class="py-1">${meals[0].strInstructions}</p>
                      <h5 class="py-2">Area:<span>${meals[0].strArea}</span></h5>
                      <h5 class="py-2">Category:<span>${meals[0].strCategory}</span></h5>
                      <h5 class="py-2 pb-4 mb-2">Tags:<span>Soup</span></h5>
                      <button type="button" class="btn btn-success mx-2">Source</button>
                      <button type="button" class="btn btn-outline-danger">Youtub</button>
                  </div>
         `
       document.getElementById('rowdDataChildTwoIngredients').innerHTML = cartona
       }
      if (document.getElementById('rowdDataChildTwoIngredients')) {
        displaydataCiledtwoIngredients()
      }

// end child Two Ingredients

//start Search
 $("#Search").click(function(){
    location.assign('search.html')
    
  })
  $('#searchByName').on('keyup', function(){ 
    $('#searchLetter').val('') 
    var searchByName = $(this).val().toLowerCase();
    if (searchByName !== "") {
      
      searchName(searchByName)
    }
    document.getElementById('rowdDataSearch').innerHTML = ``
  
    
  
  });
  async  function searchName(searchByName){
    $('.loading-container').fadeIn(300)
    let apidata =await fetch(`https:www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`)
    let {meals} =await apidata.json()
    $('.loading-container').fadeOut(100)
    if (meals) {
      let cartona=``
   
      for (let i = 0; i < meals.length; i++) {
       const element = meals[i];
   
         cartona +=` <div class="col-xl-3  col-lg-4 col-md-6">
         <a onclick="apiChiledHome('${element.strMeal}')"  id="imageHome" class="text-black"><div class="item w-100 position-relative overflow-hidden">
         <img src="${element.strMealThumb}" alt="" class="w-100 rounded-3">
         <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 "  >
             <h2>${element.strMeal}</h2>
         </div>
         </div></a>
     </div>`
      }
      document.getElementById('rowdDataSearch').innerHTML = cartona
      
    }

  }
  if (document.getElementById('searchByName')) {
    setTimeout( function(){
    if ($('#searchByName').val() !== "") {
      searchName($('#searchByName').val())
      
    }
    if ($('#searchLetter').val() !== "") {
      searchLetterapi($('#searchLetter').val())
    }
  },500)
    
  }

  


  $('#searchLetter').on('keyup', function(){ 
      $('#searchByName').val('') 
    var searchLetter = $(this).val().toLowerCase();
    if (searchLetter !== "") {
      searchLetterapi(searchLetter)
    }
    document.getElementById('rowdDataSearch').innerHTML = ``
    
    });

    async  function searchLetterapi(searchByLetter){
      $('.loading-container').fadeIn(300)
      let apidata =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter}`)
      let {meals} =await apidata.json()
      $('.loading-container').fadeOut(100)
      if (meals) {
        let cartona=``
      
        for (let i = 0; i < meals.length; i++) {
         const element = meals[i];
     
           cartona +=` <div class="col-xl-3  col-lg-4 col-md-6">
           <a onclick="apiChiledHome('${element.strMeal}')"  id="imageHome" class="text-black"><div class="item w-100 position-relative overflow-hidden">
           <img src="${element.strMealThumb}" alt="" class="w-100 rounded-3">
           <div class=" item2 bg-white w-100 h-100 d-flex align-items-center ps-2 rounded-3 opacity-75 position-absolute top-100 left-0 button-0 right-0 "  >
               <h2>${element.strMeal}</h2>
           </div>
           </div></a>
       </div>`
        }
        document.getElementById('rowdDataSearch').innerHTML = cartona
        
      }
  
    }

   //
//end Search

// start contact us
$('#Contact').click(function(){
  location.assign('ContactUs.html')
})
let namesVaild
function validationName(){
let validname =/^[a-zA-Z]{3,10}$/



if (validname.test($('#name').val()) == true) {
  // console.log(validname.test( $('#name').val() ) ,);
  
  let icontrue= $("#name").nextAll('.true')
  let iconfalse= $("#name").nextAll('.false')
  icontrue.fadeIn(500)
  iconfalse.fadeOut(500)
  namesVaild =true
  return namesVaild
}else  {
  // console.log(validname.test($('#name').val()));


  let icontrue= $("#name").nextAll('.true')
  let iconfalse= $("#name").nextAll('.false')
  iconfalse.fadeIn(500)
  icontrue.fadeOut(500)
  namesVaild=false
  return namesVaild
}
}
let emailVaild
function vaildationEmail(){
  let vaildEmail=/^[a-zA-z]{3,9}[0-9]{0,6}[a-zA-Z]{0,8}@gmail.com$/ 
  if (vaildEmail.test($('#email').val())) {
    // console.log(vaildEmail.test(email));
    
 let icontrue= $("#email").nextAll('.true')
 let iconfalse= $("#email").nextAll('.false')
 icontrue.fadeIn(500)
 iconfalse.fadeOut(500)
 emailVaild=true
 return emailVaild
  }else{
    // console.log(vaildEmail.test(email));

     let icontrue= $("#email").nextAll('.true')
 let iconfalse= $("#email").nextAll('.false')
 iconfalse.fadeIn(500)
 icontrue.fadeOut(500)
 emailVaild=false
 return emailVaild
  }
}

let phoneVaild
function validationPhone(){
let validphone =/^01(1|2|5|0){1}[0-9]{8}$/
if (validphone.test($('#phone').val()) == true) {
 let icontrue= $("#phone").nextAll('.true')
 let iconfalse= $("#phone").nextAll('.false')
 icontrue.fadeIn(500)
 iconfalse.fadeOut(500)
 phoneVaild=true
 return phoneVaild
}else{
  let icontrue= $("#phone").nextAll('.true')
 let iconfalse= $("#phone").nextAll('.false')
 iconfalse.fadeIn(500)
 icontrue.fadeOut(500)
 phoneVaild=false
 return phoneVaild
}
}

let ageVaild
function validationAge(){
  let validage =/^[1-9]{1}[0-9]{1}$/
  if (validage.test($('#age').val()) == true) {
   let icontrue= $("#age").nextAll('.true')
   let iconfalse= $("#age").nextAll('.false')
   icontrue.fadeIn(500)
   iconfalse.fadeOut(500)
   ageVaild=true
   return ageVaild
  }else{
    let icontrue= $("#age").nextAll('.true')
   let iconfalse= $("#age").nextAll('.false')
   iconfalse.fadeIn(500)
   icontrue.fadeOut(500)
   ageVaild=false
   return ageVaild
  }
  }
let passwordVaild
  function validationPassword(){
    let validpassword =/^[0-9a-zA-Z]{6,10}$/
    if (validpassword.test($('#password').val()) == true) {
     let icontrue= $("#password").nextAll('.true')
     let iconfalse= $("#password").nextAll('.false')
     icontrue.fadeIn(500)
     iconfalse.fadeOut(500)
     passwordVaild=true
     return passwordVaild
    }else{
      let icontrue= $("#password").nextAll('.true')
     let iconfalse= $("#password").nextAll('.false')
     iconfalse.fadeIn(500)
     icontrue.fadeOut(500)
     passwordVaild =false
     return passwordVaild
    }
    }
let RePasswordVaild
function vaildationRePassword(){
  
  if ($('#RePassword').val() == $('#password').val() && $('#RePassword').val()!=='') {
    let icontrue= $("#RePassword").nextAll('.true')
    let iconfalse= $("#RePassword").nextAll('.false')
    icontrue.fadeIn(500)
    iconfalse.fadeOut(500)
    RePasswordVaild=true
    return RePasswordVaild
  }else{
    let icontrue= $("#RePassword").nextAll('.true')
    let iconfalse= $("#RePassword").nextAll('.false')
    iconfalse.fadeIn(500)
    icontrue.fadeOut(500)
    RePasswordVaild =false
    return RePasswordVaild
  }
}


$('.Contact input').keyup(function (e) { 
 
 
  if (e.target.name == 'email') {
    vaildationEmail()
  }
  if (e.target.name == 'phone') {
    validationPhone()
  }
  if (e.target.name == 'age') {
    validationAge()
  }
  if (e.target.name == 'password') {
    validationPassword()
  }
  if (e.target.name == 'RePassword') {
    vaildationRePassword( )
  }
  if (e.target.name == 'name') {
    validationName()
  }
  
  if (namesVaild==true && emailVaild==true &&
    ageVaild==true && passwordVaild==true &&
    phoneVaild==true && RePasswordVaild==true ) {
      
      
  $('#buttonContact').css('pointerEvents','all')
  $('#buttonContact').css('opacity','1')
}

  
});
$('#buttonContact').click(function(){
  clearForm()
  $('#buttonContact').css('pointerEvents','none')
  $('#buttonContact').css('opacity','0.5')
  $('.true').css('display','none')
})
function clearForm(){
  $('#name').val('')
  $('#email').val('')
  $('#phone').val('')
  $('#age').val('')
  $('#password').val('')
  $('#RePassword').val('')
}