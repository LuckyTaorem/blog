// 1. Intercept the Enter key and redirect to the Search Page
window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let isSearch = e.target.tagName === 'INPUT' && 
                       (e.target.type === 'search' || e.target.closest('.modal'));
        
        if (isSearch) {
            e.preventDefault(); 
            let query = e.target.value.trim();
            if (query !== '') {
                // Redirect to the new search page with the query in the URL
                window.location.href = '/search/?q=' + encodeURIComponent(query);
            }
        }
    }
}, true);

// 2. Restore results if you click back into the search bar
window.addEventListener('click', function(e) {
    let isSearch = e.target.tagName === 'INPUT' && 
                   (e.target.type === 'search' || e.target.closest('.modal'));
                   
    if (isSearch && e.target.value.trim() !== '') {
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
    }
}, true);