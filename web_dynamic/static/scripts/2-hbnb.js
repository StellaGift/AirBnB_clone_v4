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
