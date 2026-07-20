// 1. Intercept the Enter key to prevent native form submission on the search bar
window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        let isSearch = e.target.tagName === 'INPUT' && 
                       (e.target.type === 'search' || e.target.closest('.modal') || e.target.closest('form[role="search"]'));
        
        if (isSearch) {
            e.preventDefault(); // Stop the browser from reloading the page, keeping you in the modal
        }
    }
}, true);

// 2. Restore results if you click back into the search bar
window.addEventListener('click', function(e) {
    let isSearch = e.target.tagName === 'INPUT' && 
                   (e.target.type === 'search' || e.target.closest('.modal') || e.target.closest('form[role="search"]'));
                   
    // If the input is clicked and it already has text in it, re-trigger the results
    if (isSearch && e.target.value.trim() !== '') {
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
    }
}, true);