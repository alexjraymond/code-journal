
var $pictureFrame = document.querySelector('.picture-frame');
var $picInput = document.querySelector('#picinput');

function changePic(event) {
  var $photoUrl = document.querySelector('.pic-input').value;
  $pictureFrame.src = $photoUrl;
}

$picInput.addEventListener('input', changePic);

var $form = document.querySelector('#form');
var $entryList = document.querySelector('ul');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing === null) {
    var newEntry = {
      entryId: data.nextEntryId,
      note: $form.elements.notes.value,
      link: $form.elements.photourl.value,
      title: $form.elements.title.value
    };
    data.entries.unshift(newEntry);
    document.querySelector('#default-pic').src = 'images/placeholder-image-square.jpg';
    $form.reset();
    toggleNoEntries();
    viewSwap('entries');
    var newLiReturn = renderEntry(newEntry);
    $entryList.prepend(newLiReturn);
    data.nextEntryId++;
  } else {

    var editedEntry = {
      entryId: data.editing.entryId,
      note: $form.elements.notes.value,
      link: $form.elements.photourl.value,
      title: $form.elements.title.value
    };

    var $allTheLi = document.querySelectorAll('li');
    for (var i = 0; i < $allTheLi.length; i++) {
      var individualLi = Number($allTheLi[i].getAttribute('data-entry-id'));
      if (data.editing.entryId === individualLi) {
        $allTheLi[i].replaceWith(renderEntry(editedEntry));

        data.entries[i] = editedEntry;
      }
    }
    toggleNoEntries();
    viewSwap('entries');
  }
  data.editing = null;
}
);

function renderEntry(entry) {

  var $entryLi = document.createElement('li');
  $entryLi.setAttribute('data-entry-id', entry.entryId);
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
  var $titlePencilRow = document.createElement('div');
  $titlePencilRow.setAttribute('class', 'row');
  $entryColHalfTextDiv.appendChild($titlePencilRow);
  var $entryH2Title = document.createElement('h2');
  $entryH2Title.setAttribute('class', 'col-half-always');
  var $getTitle = document.createTextNode(entry.title);
  $entryH2Title.appendChild($getTitle);
  $titlePencilRow.appendChild($entryH2Title);
  var $pencilIcon = document.createElement('i');
  $pencilIcon.setAttribute('class', 'pencil-style fa-solid fa-pencil col-half-always');
  $titlePencilRow.appendChild($pencilIcon);
  var $entryNoteP = document.createElement('p');
  var $getNote = document.createTextNode(entry.note);
  $entryNoteP.appendChild($getNote);
  $entryColHalfTextDiv.appendChild($entryNoteP);

  return $entryLi;

}

document.addEventListener('DOMContentLoaded', function (entry) {
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
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
    $entriesH1.classList.remove('hidden');
  }
}

var $entriesView = document.querySelector('.entries');
var $newEntryTitle = document.querySelector('#new-entry-title');

function viewSwap(view) {
  data.view = view;
  if (view === 'entries') {
    $form.classList.add('hidden');
    $newEntryTitle.classList.add('hidden');
    $entriesView.classList.remove('hidden');
  } else if (view === 'entry-form') {
    $form.classList.remove('hidden');
    $newEntryTitle.classList.remove('hidden');
    $entriesView.classList.add('hidden');

  }
}

var $header = document.querySelector('#entries-header');
$header.addEventListener('click', function (event) {

  viewSwap('entries');
});

var $newButton = document.querySelector('#new-button');
var $deleteButton = document.querySelector('#delete');

$newButton.addEventListener('click', function (event) {
  $form.reset();
  $newEntryTitle.textContent = 'New Entry';
  $deleteButton.classList.add('hidden');
  viewSwap('entry-form');
});

var $ul = document.querySelector('ul');
$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    var intendedLi = event.target.closest('li');
    var clickedPencil = Number(intendedLi.getAttribute('data-entry-id'));
    $deleteButton.classList.remove('hidden');
    for (var i = 0; i < data.entries.length; i++) {
      if (clickedPencil === data.entries[i].entryId) {
        data.editing = data.entries[i];
        $form.elements.title.value = data.entries[i].title;
        $form.elements.photourl.value = data.entries[i].link;
        $form.elements.notes.value = data.entries[i].note;
        changePic(data.entries[i].link);
      }

    }
    viewSwap('entry-form');
    $newEntryTitle.textContent = 'Edit Entry';
  }

});

var $modal = document.querySelector('.popup');
var $confirmModal = document.querySelector('#confirm');
var $cancelModal = document.querySelector('#cancel');
var $overlayModal = document.querySelector('.overlay');

$deleteButton.addEventListener('click', function () {
  $modal.classList.remove('hidden');
  $overlayModal.classList.remove('hidden');
})
;

$cancelModal.addEventListener('click', function () {
  $modal.classList.add('hidden');
  $overlayModal.classList.add('hidden');
});

$confirmModal.addEventListener('click', function () {
  var id = data.editing.entryId;

  var $allTheLi = document.querySelectorAll('li');
  for (var i = 0; i < $allTheLi.length; i++) {
    var individualLi = Number($allTheLi[i].getAttribute('data-entry-id'));
    if (id === individualLi) {
      $allTheLi[i].remove(individualLi);
      data.entries.splice(i, 1);

    }

  }
  $modal.classList.add('hidden');
  $overlayModal.classList.add('hidden');
  toggleNoEntries();
  viewSwap('entries');
  data.editing = null;

}
);
