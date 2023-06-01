// Dropdown functionality
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('change', function() {
    const selectedOption = dropdown.value;
    // Perform actions based on the selected option
    console.log(selectedOption);
});
