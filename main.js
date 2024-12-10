let xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.themoviedb.org/3/trending/movie/day?api_key=2dc4f3b7280c70e5009487448e8c74f4");
xhr.send();

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        console.log(data)
        let postsContainer = document.getElementById('posts-container');
        
        postsContainer.innerHTML = '';


        function cut_short_Text(text, wordLimit) {
            let words = text.split(' ');
            if (words.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return text;
        }

    
        data.results.forEach(post => {
            const imageUrl = `https://image.tmdb.org/t/p/w500${post.poster_path}`;  
            const truncatedOverview = cut_short_Text(post.overview, 5);  
            
            const cardHTML = `
                <div class="card">
                    <img src="${imageUrl}" alt="${post.title}" class="image">
                    <h2 class="head">${post.title}</h2>
                    <p class="par">${truncatedOverview}</p>
                </div>
            `;

            postsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
};
