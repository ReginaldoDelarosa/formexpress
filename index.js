const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Configuración de middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de formulario
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});


// Ruta para procesar el formulario
app.post('/', (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, anio } = req.body;

  // Verificar que todos los campos estén presentes
  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !anio) {
    res.redirect('/error.html');
    return;
  }

  // Crear el archivo txt
  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${anio}`;
  const nombreArchivo = `id_${id}.txt`;
  const rutaArchivo = path.join(__dirname, 'data', nombreArchivo);
  fs.writeFile(rutaArchivo, contenido, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al guardar el archivo');
      return;
    }
    res.redirect('/formulario.html');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

module.exports = app;