
var $pictureFrame = document.querySelector('.picture-frame');
var $picInput = document.querySelector('#picinput');

function changePic(event) {
  var $photoUrl = document.querySelector('.pic-input').value;
  $pictureFrame.src = $photoUrl;
}

$picInput.addEventListener('input', changePic);

var $form = document.querySelector('#form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var notes = {
    EntryId: data.nextEntryId,
    Note: $form.elements.notes.value,
    Link: $form.elements.photourl.value,
    Title: $form.elements.title.value
  };
  data.nextEntryId++;
  data.entries.unshift(notes);
  document.querySelector('img').src = 'images/placeholder-image-square.jpg';
  $form.reset();
}
);
