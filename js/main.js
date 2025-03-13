// category

const fetchCategories = () => {
    
fetch('https://openapi.programming-hero.com/api/phero-tube/categories').then(response => response.json()).then(data => showCategories(data) )
}

fetchCategories();


const showCategories = data => {
    const wrapper = document.getElementById('category-wrapper');
    data.categories.forEach(cat => {
        const div = document.createElement('div')
        div.innerHTML = `<button onclick="fetchByCat()" id="${cat.category_id}" class="cat-btn btn btn-ghost bg-[#ddd] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `
            wrapper.append(div)    
    });

}

// Show videos on home page

const fetchVideos = () => {

     fetch('https://openapi.programming-hero.com/api/phero-tube/videos').then(response => response.json()).then(data => showVideos(data));
    

}

fetchVideos()

const showVideos = (data) => {
    const wrapper = document.getElementById('video-wrapper');
    data.videos.forEach(video => {
      const div = document.createElement('div');

      div.innerHTML = `<div class="card bg-base-100  shadow-sm">
                <figure>
                    <img class="h-[150px] w-full object-cover" src="${video.thumbnail}" alt="Shoes" />
                </figure>
                <div class="py-5 px-3">
                   
                    <div class="flex gap-3">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-[30px] h-[30px]  rounded-full ring ring-offset-2">
                              <img class="" src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                          <div>
                              <h3 class="text-sm font-semibold">${video.title} </h3>
                              <div class="author flex gap-1">
                                <span class="text-sm">${video.authors[0].profile_name}</span>
                                <img class="w-5 h-5" src="assets/verified.png" alt="">
                             </div>

                             <div>
                                <span class="text-gray-400 text-sm">91K views</span>
                             </div>
                          </div>
                    </div>

                    
                   
                </div>
            </div>
      `

      wrapper.appendChild(div)

    })
}

// Video Based On category

const fetchByCat = () =>{
    const catBtn =  document.getElementById('category-wrapper');
    
   
    catBtn.addEventListener('click',(e)=> {
       console.log(e.target)
    })
   
}

