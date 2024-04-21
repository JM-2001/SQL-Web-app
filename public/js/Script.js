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

    var toggleButtonEmployee = document.getElementById('toggle-rows-employee');
    var toggleButtonDependent = document.getElementById('toggle-rows-dependent');
    var toggleButton = document.getElementById('toggle-rows-hourly-employee');

    toggleButtonEmployee.addEventListener('click', function () {
        toggleRows('employee-table');
    });

    toggleButtonDependent.addEventListener('click', function () {
        toggleRows('dependent-table');
    });

    toggleButton.addEventListener('click', function () {
        toggleRows('hourly-employee-table');
    });

    function toggleRows(tableId) {
        var table = document.getElementById(tableId);
        var expandableRows = table.querySelectorAll('.expandable-tr');
        expandableRows.forEach(function (row) {
            if (row.classList.contains('is-visible')) {
                row.classList.remove('is-visible');
            } else {
                row.classList.add('is-visible');
            }
        });
    }

});

/*
document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggle-rows');

    toggleButton.addEventListener('click', function () {
        var expandableRows = document.querySelectorAll('.expandable-tr');
        expandableRows.forEach(function (row) {
            if (row.classList.contains('is-visible')) {
                row.classList.remove('is-visible');
            } else {
                row.classList.add('is-visible');
            }
        });
    });
});
*/

/*
document.addEventListener('DOMContentLoaded', function () {
    var toggleButtonEmployee = document.getElementById('toggle-rows-employee');
    var toggleButtonDependent = document.getElementById('toggle-rows-dependent');

    toggleButtonEmployee.addEventListener('click', function () {
        toggleRows('employee-table');
    });

    toggleButtonDependent.addEventListener('click', function () {
        toggleRows('dependent-table');
    });

    function toggleRows(tableId) {
        var table = document.getElementById(tableId);
        var expandableRows = table.querySelectorAll('.expandable-tr');
        expandableRows.forEach(function (row) {
            if (row.classList.contains('is-visible')) {
                row.classList.remove('is-visible');
            } else {
                row.classList.add('is-visible');
            }
        });
    }
});
*/