// toggles the mobile nav open/closed
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
});

const preview = document.getElementById('geo-preview');

const map = L.map('geo-preview-map', {
  zoomControl: false,
  dragging: false,
  scrollWheelZoom: false
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_32q7_1_aa81ab64bfa6fcd8ff4c6966', {
  attribution: '&copy; OpenStreetMap &copy; CARTO'
}).addTo(map);

let marker;
let hideTimer;

document.querySelectorAll('.geo').forEach(span => {
  span.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
    const rect = span.getBoundingClientRect();
    preview.style.left = rect.left + 'px';
    preview.style.top = (rect.top - 160) + 'px';
    preview.classList.add('visible');

    const lat = parseFloat(span.dataset.lat);
    const lng = parseFloat(span.dataset.lng);
    map.setView([lat, lng], 10);
    if (marker) marker.setLatLng([lat, lng]);
    else marker = L.marker([lat, lng]).addTo(map);
    requestAnimationFrame(() => map.invalidateSize());
  });

  span.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => preview.classList.remove('visible'), 100);
  });
});