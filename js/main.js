
const active = (id = 'all') => {
      // Active class

      const active = document.getElementsByClassName('active');

      for(let i = 0; i < active.length;i++){
        active[i].classList.remove('active');
      }
     
     
      const dataId = document.getElementById(id).classList.add('active');
}

// category

const fetchCategories = () => {
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = `<div class="col-span-4 text-center my-10"><span class="loading loading-dots  loading-xl"></span></div>`

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories').then(response => response.json()).then(data => showCategories(data))
}

fetchCategories();


const showCategories = data => {

    const wrapper = document.getElementById('category-wrapper');
    
    data.categories.forEach(cat => {
        const div = document.createElement('div')
        div.innerHTML = `<button onclick="fetchByCat(${cat.category_id}),active(${cat.category_id})" id="${cat.category_id}" class="cat-btn btn btn-ghost bg-[#ddd] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `
        wrapper.append(div)
    });

}

// Show videos on home page

const fetchVideos = () => {
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = `<div class="col-span-4 text-center my-10"><span class="loading loading-dots  loading-xl"></span></div>`


    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=`).then(response => response.json()).then(data => showVideos(data));

        document.getElementById('search').addEventListener('keyup' , ()=> {
          const searchTitle = document.getElementById('search').value; 
    
          const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = `<div class="col-span-4 text-center my-10"><span class="loading loading-dots  loading-xl"></span></div>`
          fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchTitle}`).then(response => response.json()).then(data => showVideos(data));
            
        })
    
    
        
    

}

fetchVideos()

const showVideos = (data) => {
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = " ";
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
                                ${(video.authors[0].verified == true) ?
                                 '<img class="w-5 h-5" src="assets/verified.png "  alt=""></img>': "" } 
                                
                             </div>

                             <div>
                                <span class="text-gray-400 text-sm">91K views</span>
                             </div>
                          </div>
                    </div>
                <button class="btn w-full my-5" onclick="getDetail('${video.video_id}')">Video detail</button>
                </div>
            </div>
      `

        wrapper.appendChild(div)

    })
}

// Video Based On category

const fetchByCat = async (id) => {
  


    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = `<div class="col-span-4 text-center my-10"><span class="loading loading-dots  loading-xl"></span></div>`

    const fetchData = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await fetchData.json();

    wrapper.innerHTML = " ";


    if (data.category.length === 0) {
        const div = document.createElement('div');
        div.classList.add('col-span-4')
        div.innerHTML = `
        <div class="flex flex-col items-center py-10">
                    <img class="w-56" src="assets/not-found.png" alt="">
                    <h1 class="my-5 font-semibold text-2xl text-slate-600">Videos not found</h1>

                </div>
        `
        wrapper.appendChild(div);

    }

    data.category.forEach(cat => {
        div = document.createElement('div');

        div.innerHTML = `<div class="card bg-base-100  shadow-sm">
                <figure>
                    <img class="h-[150px] w-full object-cover" src="${cat.thumbnail}" alt="Shoes" />
                </figure>
                <div class="py-5 px-3">
                   
                    <div class="flex gap-3">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-[30px] h-[30px]  rounded-full ring ring-offset-2">
                              <img class="" src="${cat.authors[0].profile_picture}" />
                            </div>
                        </div>
                          <div>
                              <h3 class="text-sm font-semibold">${cat.title} </h3>
                              <div class="author flex gap-1">
                                <span class="text-sm">${cat.authors[0].profile_name}</span>
                                <img class="w-5 h-5" src="assets/verified.png" alt="">
                             </div>

                             <div>
                                <span class="text-gray-400 text-sm">91K views</span>
                             </div>
                          </div>
                    </div>

                <button class="btn w-full my-5" onclick="getDetail('${cat.video_id}')">Video detail</button>    
                   
                </div>
            </div>
      `

        wrapper.appendChild(div)
    })

}


// get video details


const getDetail = (id) => {
 
    document.getElementById('open_modal').showModal();

    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`).then(res => res.json()).then(data => showVideoDetails(data) )
   

}

const showVideoDetails = (data) => {
   "use strict"
    const mainDiv = document.getElementById('video-details');

    mainDiv.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
        <figure>
          <img
            src="${data.video.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${data.video.title}</h2>
          <p>${data.video.description}</p>
          
        </div>
      </div>
  </div>


    `

}






