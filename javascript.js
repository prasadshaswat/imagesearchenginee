const API_KEY = `2HIBvNpn8VAQXz669ALRDB3JTwqlBVjLbrKYsY9NrfQ`;
        const SearchForm = document.getElementById('Search-Form');
        const SearchBox = document.getElementById('Search-box');
        const ShowMoreBtn = document.querySelector('.show-morebtn');
        const SearchResult = document.querySelector('.searchresult');
        let keyword = '';
        let page = 1;

        async function getImages() {
            keyword = SearchBox.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();
           
            data.results.forEach(image => {
                const img = document.createElement('img');
                img.src = image.urls.regular;
                SearchResult.appendChild(img);
            });

            // If there are more images available, show the "Show More" button
            if (data.total_pages > page) {
                ShowMoreBtn.style.display = 'block';
            } else {
                ShowMoreBtn.style.display = 'none';
            }
        }

        SearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            page = 1;
            SearchResult.innerHTML = '';
            getImages();
        });

        ShowMoreBtn.addEventListener('click', () => {
            page++;
            getImages();
        });

        getImages();