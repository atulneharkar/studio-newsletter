self.addEventListener('fetch', function (event) {
  console.log('fetch');
});

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('installing sw');
});
