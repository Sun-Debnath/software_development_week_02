    const showingOption =() =>{
    fetch(" https://openapi.programming-hero.com/api/videos/categories")
    .then(res => res.json())
    .then((data) => displayButton(data.data))

    loadData(1000);
  }

  var tracker = 1000;
  const displayButton = (option) => {
      const optionContainer = document.getElementById("option");

      option.forEach((option)=> {
        const card = document.createElement("div");
        card.classList.add("buttonBox");
            
        card.innerHTML = `
            <button
            onclick="loadData(${option.category_id})"
            >${option.category}</button>
        `
        optionContainer.appendChild(card);
      })
  }


  const loadData = (id) => {
    tracker = id;
      fetch(` https://openapi.programming-hero.com/api/videos/category/${id? id : 1000}`)
      .then(res => res.json())
      .then((data) => displayData(data))

  }


  const sortByViews = () => {
    fetch(` https://openapi.programming-hero.com/api/videos/category/${tracker}`)
    .then((res) => res.json())
    .then((data) => {
        data.data.sort(function(a, b) {
            var viewsA = parseInt(a.others.views);
            var viewsB = parseInt(b.others.views);

            return viewsB - viewsA; 
        });

        displayData(data);
    });
};


  const displayData = (data) => {
  
    const viewContainer = document.getElementById("view-Container");
    // console.log(data.data.length);

    if(data.data.length == 0){

      // console.log("no content");

      while(viewContainer.firstElementChild)
      viewContainer.removeChild(viewContainer.firstElementChild);

      const mainCard = document.createElement("div");
      mainCard.classList.add("box");
      
      mainCard.innerHTML = `
      <img src="Icon.png" alt="" />
      <h2>sorry, there is no content!!</h2>
      `
      viewContainer.appendChild(mainCard);
    }
    else{

      while(viewContainer.firstElementChild)
      viewContainer.removeChild(viewContainer.firstElementChild);
      data.data.forEach((data) => {
        const mainCard = document.createElement("div");
        mainCard.classList.add("box");
        console.log(data);
        
        var h = parseInt((data.others.posted_date)/3600);
        var m = Math.ceil(((data.others.posted_date)%3600)/60);
        // console.log(h);
        // console.log(m);
        var hr = "hrs ";
        var mi = "min ago";

        mainCard.innerHTML = `
          <div class"col-md-6">
          <img class="box-img" src="${data.thumbnail}" alt="" />
          <p><small>${h?h:""}${h?hr:""}${m?m:""}${m?mi:""}</small></p>
          
          </div>
          <div class="col-md-6">
        <p><b>${data.title}</b></p>
          <img class ="logo-img"src="${data.authors[0].profile_picture}" alt="" />
      
        <h6>${data.authors[0].profile_name}</h6>
          <p><small>${data.others.views}</small></p>
      </div>
        
       
        `

        viewContainer.appendChild(mainCard);
        
      })
    }
   
  }

//   const blog = () => {
//     document.getElementById("index").style.display = "none";
//     document.getElementById("blog").style.display = "block";
// };

// const back = () =>{
//   document.getElementById("index").style.display = "block";
//   document.getElementById("blog").style.display = "none"; 
// }


  showingOption();