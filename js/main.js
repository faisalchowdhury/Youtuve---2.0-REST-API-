
const fetchCategories = () => {
    
fetch('https://openapi.programming-hero.com/api/phero-tube/categories').then(response => response.json()).then(data => showCategories(data) )
}

fetchCategories();


const showCategories = data => {
    const wrapper = document.getElementById('category-wrapper');
    data.categories.forEach(cat => {
        const div = document.createElement('div')
        div.innerHTML = `<button class="btn btn-ghost bg-[#ddd] hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
            `
            wrapper.append(div)    
    });

}