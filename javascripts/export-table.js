document$.subscribe(function() {
  // Selecciona la tabla o tablas que quieres que sean exportables
  var tables = document.querySelectorAll("article table:not([class])"); 

  tables.forEach(function(table) {
    // 1. Crear el botón
    var button = document.createElement('button');
    button.textContent = '📥 Copiar a CSV/Excel';
    button.className = 'md-button md-button--primary'; // Usa la clase de estilo de Material

    // 2. Lógica al hacer clic
    button.addEventListener('click', function() {
      exportTableToCSV(table, 'tabla-exportada.csv');
    });

    // 3. Insertar el botón antes de la tabla
    table.parentNode.insertBefore(button, table);
  });

  // Función de ayuda para exportar a CSV
  function exportTableToCSV(table, filename) {
    var csv = [];
    var rows = table.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll('td, th');

      for (var j = 0; j < cols.length; j++) 
        // Reemplaza el contenido de la celda, quitando saltos de línea y rodeando con comillas
        row.push('"' + cols[j].innerText.replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, '""') + '"');
      
      csv.push(row.join(","));
    }
    
    // Crear el archivo y descargarlo
    var csv_string = csv.join('\n');
    var link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string);
    link.target = '_blank';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});