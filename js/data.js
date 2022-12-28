/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function onBeforeUnload(event) {
  var dataModel = JSON.stringify(data);
  localStorage.setItem('data-model', dataModel);
  return dataModel;
}

window.addEventListener('beforeunload', onBeforeUnload);

if (localStorage.getItem('data-model') !== null) {
  var jsonObj = localStorage.getItem('data-model');
  data = JSON.parse(jsonObj);
}
