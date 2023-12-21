const btnHome=document.querySelector('button')
const search=document.querySelector('#search')
const olTag=document.querySelector('ol')
const list=document.querySelector('.list')
const aTags=document.querySelectorAll('a')
const themealdbimg=document.querySelector('#themealdbimg')

const homeUrl='https://www.themealdb.com/api/json/v1/1/search.php?f=b'
const navUrl='https://www.themealdb.com/api/json/v1/1/search.php?f='


async function getHomeMeals() {
    const res=await fetch(homeUrl)
    const hmMeals=await res.json()
    console.log(hmMeals.meals);
    showHomeMeals(hmMeals.meals)
}
getHomeMeals() 

btnHome.onclick=()=>{
    getHomeMeals()
}
themealdbimg.onclick=()=>{
    getHomeMeals()
}

function showHomeMeals(arr) {
    list.innerHTML=''
    for (const hmMeal of arr) {
        list.innerHTML+=`
        <li onclick='getMeal(${hmMeal.idMeal})'>
        <img width='300px' src='${hmMeal.strMealThumb}' />
        <h2>${hmMeal.strMeal}</h2>
        </li>`
    }
}

//-- SEARCH --//

const searchMeals='https://www.themealdb.com/api/json/v1/1/search.php?s='
const idMeals='https://www.themealdb.com/api/json/v1/1/lookup.php?i='
const imgUrl='https://www.themealdb.com/images/ingredients/'


async function getSearchMeals(name) {
    const res=await fetch(searchMeals+name)
    const srchMeals=await res.json()
    console.log(srchMeals.meals);
    showHomeMeals(srchMeals.meals)
}

search.onchange=()=>{
    getSearchMeals(search.value)
    search.value=''
}

//

async function getMeal(id) {
    const res=await fetch(idMeals+id)
    const idMeal=await res.json()
    console.log(idMeal.meals[0]);
    showMeal(idMeal.meals[0])
}
// getMeal('57224')

function showMeal(objMeal) {
    list.innerHTML=''
    const mealCard=document.createElement('div')
    list.appendChild(mealCard)

    const cardInfo=document.createElement('div')
    cardInfo.style.display='flex'
    mealCard.appendChild(cardInfo)

    let cardInst=document.createElement('div')
    mealCard.appendChild(cardInst)

    const cardImg=document.createElement('div')
    cardInfo.appendChild(cardImg)

    const cardIngr=document.createElement('div')
    cardInfo.appendChild(cardIngr)

    cardIngr.classList='cardIngr'
    cardImg.classList='cardImg'
    cardInst.classList='cardInst'
    cardInst.innerHTML=`<p>${objMeal.strInstructions}</p>
    <iframe width="560" height="315" src='${objMeal.strYoutube.replace('/watch?v=', '/embed/')}'
    
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    
    `
    // "https://www.youtube.com/embed/XKOzd2QsEC0?si=wZ0buewBGrX_YNty" title="YouTube video player"
    //https://www.youtube.com/watch?v=Vz5W1-BmOE4


    const imgTag=document.createElement('img')
    cardImg.appendChild(imgTag)
    imgTag.src=objMeal.strMealThumb
    let listIngr=''
    for(i=1; i<=20; i++) {
        const element= objMeal['strIngredient'+i]
        const strMeasure= objMeal['strMeasure'+i]
        if(element) {
            listIngr+=`
            <li onclick='CategoryMeal()'>
            <img src='${imgUrl+element}-Small.png' />
            <h3>${strMeasure}-${element}</h3>

            </li>`
        }
    }
    cardIngr.innerHTML=`
    <h2>Ingredients</h2>
    <ol>
        ${listIngr}
    </ol>
    `
   

}

aTags.forEach(aTag=>{
    aTag.onclick=async()=>{
        const res=await fetch(navUrl+aTag.innerText)
        const data=await res.json()
        showHomeMeals(data.meals)
    }
})


// const catigoria='https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood'
// // const CateimgUrl='https://www.themealdb.com/images/ingredients/Lime.png'\
// const imgUrl1=`https://www.themealdb.com/images/ingredients/`


// async function CategoryMeal() {
//     const res=await fetch(catigoria)
//     const data=await res.json()
//     console.log(data);
//     ShowCategory1(data.meals)
// }

// function ShowCategory1(arr) {
//     list.innerHTML=''
//     for (const Meal of arr) {
//         list.innerHTML+=`
//         <div class="Catigoria">
//             <div class="Catigoriaimg">
//                  <img scr='https://i1.sndcdn.com/artworks-pnzOltCAS4CZV62i-k3vchA-t500x500.jpg'/>                                                
//            </div>
           
//            <div class="Catigoriaingr">
//            <img src="${Meal.strMealThumb}"/>
//              <h3>${Meal.strMeal}</h3>
//            </div>
//         </div>
//         `
//     }
    
// }
// function ShowCategory(objCategory) {
//     list.innerHTML=''
//     const CategoryInfo=document.createElement('div')
//     list.appendChild(CategoryInfo)

//     CategoryInfo.style.display='flex'

//     const CategoryImg=document.createElement('div')
//     CategoryInfo.appendChild(CategoryImg)

//     const CategoryIngr=document.createElement('div')
//     CategoryInfo.appendChild(CategoryIngr)

//     CategoryIngr.classList='CategoryIngr'
//     CategoryImg.classList='CategoryImg'

//     // const imgTag=document.createElement('img')
//     // CategoryImg.appendChild(imgTag)
//     // // imgTag.src=objCategory.CateimgUrl
//     let listIngr=''
//     for(i=1; i<=20; i++) {
//         const element= objCategory['strMeal'+i]
//         if(element) {
//             listIngr+=`
//             <li>
//             <img src='' />
//             <h3>${element}</h3>

//             </li>`
//         }
//     }
//     CategoryIngr.innerHTML=`
//     <h2>Ingredients</h2>
//     <ol>
//         ${listIngr}
//     </ol>
//     `

// }









        // list.innerHTML=`
        // <div>
        //     <div>
        //             <div>
        //             <img src='${objMeal.strMealThumb}'/>
        //             </div>
        //             <div>
        //             ingr
        //             </div>
        //     </div>
        //     <div>
        //         Instructions
        //     </div>
        // </div>
        // `