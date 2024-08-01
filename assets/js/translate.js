i18next
  .use(i18nextXHRBackend)
  .init({
    lng: localStorage.getItem('selectedLanguage') || 'es', // Utiliza el idioma guardado o el idioma por defecto
    backend: {
      loadPath: '/assets/lang/{{lng}}/{{lng}}.json',
    },
    fallbackLng: 'es',
    debug: true
  }, function(err, t) {
    if (err) {
      console.error('Error al inicializar i18next:', err);
      return;
    }
    updateContent();
  });

function changeLanguage(lng) {
  localStorage.setItem('selectedLanguage', lng); // Guarda el idioma seleccionado
  location.reload(); // Recarga la página
}

function updateContent() {
  $('[data-translate]').each(function() {
    var key = $(this).attr('data-translate');
    var translatedText = i18next.t(key);
    
    // Usamos .contents() para obtener los elementos hijos y preservarlos
    $(this).contents().filter(function() {
      return this.nodeType === 3; // Solo nodos de texto
    }).each(function() {
      this.nodeValue = translatedText;
    });
  });
}

$(document).ready(function() {
  updateContent();
});
