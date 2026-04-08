//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//


window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
  
  // code to click on the card-clickable link when the click is done anywhere in the card
  const cards = document.querySelectorAll('.card--clickable');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.card__link');
      if (link) {
        link.click();
      }
    });
  });

  /////// search function for prisoner search ////////////

  document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('searchTerm');
  const table = document.getElementById('prisoner-table');
  const noResults = document.getElementById('no-results');
  const tableRows = document.querySelectorAll('#prisoner-table .govuk-table__body .govuk-table__row');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const filter = searchInput.value.toUpperCase();
    let matchesFound = 0;
    const maxResults = 10;

    // Show the table once a search is performed
    table.style.display = "table";

    tableRows.forEach(row => {
      const nameCell = row.cells[0].textContent.toUpperCase();
      const idCell = row.cells[1].textContent.toUpperCase();

      // Check if it matches AND we haven't reached the limit of 10
      if ((nameCell.includes(filter) || idCell.includes(filter)) && matchesFound < maxResults) {
        row.style.display = "";
        matchesFound++;
      } else {
        row.style.display = "none";
      }
    });

    // Handle empty states
    if (matchesFound === 0) {
      table.style.display = "none";
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  });
});

//////////////////////////

const backLink = document.getElementById('back-link');
if (backLink) {
  backLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevents the default # link behaviour
    window.history.back();
  });
}

///////////// accessible autocomplete for what court ////////////

// 1. COURT SELECT
const courtElement = document.querySelector('#choose-court');
if (courtElement) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: courtElement,
    id: 'choose-court-autocomplete', // Explicit unique ID for the new input
    displayMenu: 'overlay',
    source: (query, populateResults) => {
      const options = courtElement.querySelectorAll('option');
      const results = Array.from(options)
        .filter(opt => opt.text.toLowerCase().includes(query.toLowerCase()))
        .map(opt => opt.text.trim());
      populateResults(results);
    }
  });
}

// 2. REASON SELECT
const reasonElement = document.querySelector('#appearance-reason');
if (reasonElement) {
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: reasonElement,
    id: 'appearance-reason-autocomplete', // Different explicit unique ID
    displayMenu: 'overlay',
    source: (query, populateResults) => {
      const options = reasonElement.querySelectorAll('option');
      const results = Array.from(options)
        .filter(opt => opt.text.toLowerCase().includes(query.toLowerCase()))
        .map(opt => opt.text.trim());
      populateResults(results);
    }
  });
}



})

