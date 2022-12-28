
var $pictureFrame = document.querySelector('.picture-frame');

function changePic(event) {
  var $photoUrl = document.querySelector('.pic-input').value;
  var $newPic = $photoUrl;
  $pictureFrame.src = $newPic;

}

document.addEventListener('input', changePic);

var $form = document.querySelector('#form');

// function submitForm(event) {
//   event.preventDefault();
//   var notes = {};

// }

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
  $form.elements.photourl = 'images/placeholder-image-square.jpg';
  $form.reset();
}
);
