document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

        });
    });

    let toggleButtonEmployee = document.getElementById('toggle-rows-employee');
    let toggleButtonDependent = document.getElementById('toggle-rows-dependent');
    let toggleButtonHourly = document.getElementById('toggle-rows-hourly-employee');
    let toggleButtonSalaried = document.getElementById('toggle-rows-salaried-employee');

    toggleButtonEmployee.addEventListener('click', function () {
        toggleRows('employee-table');
    });

    toggleButtonDependent.addEventListener('click', function () {
        toggleRows('dependent-table');
    });

    toggleButtonHourly.addEventListener('click', function () {
        toggleRows('hourly-employee-table');
    });

    toggleButtonSalaried.addEventListener('click', function () {
        toggleRows('salaried-employee-table');
    });

    function toggleRows(tableId) {
        let table = document.getElementById(tableId);
        let expandableRows = table.querySelectorAll('.expandable-tr');
        expandableRows.forEach(function (row) {
            if (!row.classList.contains('is-visible')) {
                if (row.classList.contains('is-not-visible')) {
                    row.classList.remove('is-not-visible');
                } else {
                    row.classList.add('is-not-visible');
                }
            }
        });
    }

    // Get the form and the payroll type select element
    const form = document.querySelector('form');
    const payrollTypeSelect = document.querySelector('select[name="payroll-type"]');

    // Add an event listener for the change event
    payrollTypeSelect.addEventListener('change', (event) => {
        // Update the form action based on the selected option
        if (event.target.value === 'Hourly Employee') {
            console.log('Hourly Employee: /employee/promoting-hourly');
            form.action = '/employee/promoting-hourly';
        } else if (event.target.value === 'Salaried Employee') {
            console.log('Salaried Employee: /employee/promoting-salaried');
            form.action = '/employee/promoting-salaried';
        }
    });



});
