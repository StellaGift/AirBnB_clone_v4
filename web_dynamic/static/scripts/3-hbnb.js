function trimComma (str) {
  const string = str.trim();
  return string.replace(/^,*|,*$/g, '');
}

$(document).ready(function () {
  // Select all checkboxes
  const checkboxes = $('ul li input[type="checkbox"]');
  const selectedAmenities = {};

  // Listen for change in state of checkbox
  checkboxes.on('change', function () {
    const cb = $(this);

    if (cb.is(':checked')) {
      // add to selectedAmenities if checked
      selectedAmenities[cb.attr('data-id')] = true;

      // Modify h4 text
      $('.amenities h4').text((index, oldText) => {
        if (Object.keys(selectedAmenities).length === 1) {
          return oldText + cb.attr('data-name');
        } else {
          return oldText + ', ' + cb.attr('data-name');
        }
      });
    } else {
      // remove from selectedAmenities if unchecked
      delete selectedAmenities[cb.attr('data-id')];
      $('.amenities h4').text((index, oldText) => {
        let newText = oldText.replace(', ' + cb.attr('data-name'), '');
        newText = newText.replace(cb.attr('data-name'), '');
        return trimComma(newText);
      });
    }
  });
});

$.ajax({
  type: 'GET',
  url: 'http://0.0.0.0:5001/api/v1/status/',
  success: (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  }
});

function loadPlaces (places) {
  for (let i = 0; i < Object.keys(places).length; i++) {
    // Create a new article
    const article = $('<article>');

    // Title Section
    const titleBox = $('<div>').addClass('title_box');

    const placeName = $('<h2>');
    placeName.text(places[i].name);

    const price = $('<div>').addClass('price_by_night');
    price.html('$' + places[i].price_by_night);

    titleBox.append(placeName, price);

    // Information Section
    const info = $('<div>').addClass('information');

    const guest = $('<div>').addClass('max_guest');
    let text = places[i].max_guest + ' Guest';
    if (places[i].max_guest > 1) text = text + 's';
    guest.text(text);

    const rooms = $('<div>').addClass('number_rooms');
    text = places[i].number_rooms + ' Room';
    if (places[i].number_rooms > 1) text = text + 's';
    rooms.text(text);

    const bath = $('<div>').addClass('number_bathrooms');
    text = places[i].number_bathrooms + ' Bathroom';
    if (places[i].number_bathrooms > 1) text = text + 's';
    bath.text(text);

    info.append(guest, rooms, bath);

    // Description Section
    const desc = $('<div>').addClass('description');
    desc.html(places[i].description);

    // Append all Sections to article
    article.append(titleBox, info, desc);

    // Add article to places
    $('section.places').append(article);
  }
}

// POST Request to get all places
$(document).ready(() => {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: (data) => {
      loadPlaces(data);
    }
  });
});
