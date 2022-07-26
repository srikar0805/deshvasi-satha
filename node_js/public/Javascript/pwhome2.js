document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/pwhome')
        .then(response => response.json)
        .then(data => console.log(data));
    loadtable([]);
})


function loadtable(data) {
    const table = document.querySelector('mytable tbody');

    if (data.length == 0) {
        table.innerHTML = "<tr><td class='no data' colspan='5>No Data</td></tr>"
    }
}