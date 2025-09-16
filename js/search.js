document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = searchForm.querySelector('input[type="search"]');

    const searchableContent = [
        {
            title: 'Sistemas',
            url: 'sistemas.html',
            keywords: ['sistemas', 'desarrollo', 'software', 'ti']
        },
        {
            title: 'Contable',
            url: 'contable.html',
            keywords: ['contable', 'financiera', 'contabilidad']
        },
        {
            title: 'Tributario',
            url: 'tributario.html',
            keywords: ['tributario', 'impuestos', 'planificacion']
        },
        {
            title: 'Legal',
            url: 'legal.html',
            keywords: ['legal', 'derecho', 'empresarial']
        }
    ];

    function search(query) {
        const lowerCaseQuery = query.toLowerCase();
        return searchableContent.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(lowerCaseQuery);
            const keywordsMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseQuery));
            return titleMatch || keywordsMatch;
        });
    }

    function displayResults(results) {
        const resultsContainer = document.createElement('div');
        resultsContainer.classList.add('search-results');
        resultsContainer.style.position = 'absolute';
        resultsContainer.style.backgroundColor = '#fff';
        resultsContainer.style.border = '1px solid #ccc';
        resultsContainer.style.width = searchInput.offsetWidth + 'px';
        resultsContainer.style.zIndex = '1000';

        if (results.length > 0) {
            results.forEach(result => {
                const resultLink = document.createElement('a');
                resultLink.href = result.url;
                resultLink.textContent = result.title;
                resultLink.style.display = 'block';
                resultLink.style.padding = '10px';
                resultLink.style.color = '#333';
                resultLink.style.textDecoration = 'none';
                resultLink.addEventListener('mouseenter', () => {
                    resultLink.style.backgroundColor = '#f0f0f0';
                });
                resultLink.addEventListener('mouseleave', () => {
                    resultLink.style.backgroundColor = '#fff';
                });
                resultsContainer.appendChild(resultLink);
            });
        } else {
            const noResults = document.createElement('div');
            noResults.textContent = 'No se encontraron resultados';
            noResults.style.padding = '10px';
            resultsContainer.appendChild(noResults);
        }

        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }

        searchForm.appendChild(resultsContainer);
    }

    searchInput.addEventListener('input', function() {
        const query = this.value;
        if (query.length > 2) {
            const results = search(query);
            displayResults(results);
        } else {
            const existingResults = document.querySelector('.search-results');
            if (existingResults) {
                existingResults.remove();
            }
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchForm.contains(event.target)) {
            const existingResults = document.querySelector('.search-results');
            if (existingResults) {
                existingResults.remove();
            }
        }
    });
});
