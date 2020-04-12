// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
