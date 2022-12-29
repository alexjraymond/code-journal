
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
    entryId: data.nextEntryId,
    note: $form.elements.notes.value,
    link: $form.elements.photourl.value,
    title: $form.elements.title.value
  };
  data.nextEntryId++;
  data.entries.unshift(notes);
  document.querySelector('img').src = 'images/placeholder-image-square.jpg';
  $form.reset();
  toggleNoEntries();
  viewSwap('entries');
  renderEntry(notes);
}
);

function renderEntry(entry) {
  var $eventUnorderList = document.querySelector('ul');
  var $entryLi = document.createElement('li');
  var $entryRowDiv = document.createElement('div');
  $entryRowDiv.setAttribute('class', 'row');
  $entryLi.appendChild($entryRowDiv);
  var $entryColHalfImgDiv = document.createElement('div');
  $entryColHalfImgDiv.setAttribute('class', 'column-half');
  $entryRowDiv.appendChild($entryColHalfImgDiv);
  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.link);
  $entryImg.setAttribute('class', 'picture-frame margin-bot-30');
  $entryColHalfImgDiv.appendChild($entryImg);
  var $entryColHalfTextDiv = document.createElement('div');
  $entryColHalfTextDiv.setAttribute('class', 'column-half');
  $entryRowDiv.appendChild($entryColHalfTextDiv);
  var $entryH2Title = document.createElement('h2');
  var $getTitle = document.createTextNode(entry.title);
  $entryH2Title.appendChild($getTitle);
  $entryColHalfTextDiv.appendChild($entryH2Title);
  var $entryNoteP = document.createElement('p');
  var $getNote = document.createTextNode(entry.note);
  $entryNoteP.appendChild($getNote);
  $entryColHalfTextDiv.appendChild($entryNoteP);
  $eventUnorderList.appendChild($entryLi);
  return $eventUnorderList;
}

document.addEventListener('DOMContentLoaded', function (entry) {
  var $entryList = document.querySelector('.entries');
  for (var i = 0; i < data.entries.length; i++) {
    var $entireEntry = renderEntry(data.entries[i]);
    $entryList.appendChild($entireEntry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries() {
  var $noEntries = document.querySelector('#no-entries');
  var $entriesH1 = document.querySelector('#entries-h1');
  if (data.entries.length === 0) {
    $noEntries.classList.add('visible');
  } else {
    $noEntries.classList.remove('visible');
    $noEntries.classList.add('hidden');
    $entriesH1.classList.remove('hidden');
  }
}

var $h1 = document.querySelector('h1');
// change to entriesView
var $entriesView = document.querySelector('.entries');

function viewSwap(view) {

  data.view = view;
  if (view === 'entries') {
    $form.classList.add('hidden');
    $h1.classList.add('hidden');
    $entriesView.classList.remove('hidden');

  } else if (view === 'entry-form') {
    $form.classList.remove('hidden');
    $h1.classList.remove('hidden');
    $entriesView.classList.add('hidden');

  }
}

var $header = document.querySelector('#entries-header');
$header.addEventListener('click', function (event) {

  viewSwap('entries');
});

var $newButton = document.querySelector('#new-button');

$newButton.addEventListener('click', function (event) {

  viewSwap('entry-form');
});
