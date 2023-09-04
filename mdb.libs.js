function GetEntriesLinkedTo(e, lib) {
  return libByName(lib).linksTo(e);
}

function CountEntriesLinkedTo(e,lib) {
  return GetEntriesLinkedTo(e,lib).length;
}

function HasEntriesLinkedTo(e, lib) {
  return CountEntriesLinkedTo(e,lib) > 0;
}

function SetLinkedStatus(e, lib, f, status1, status2) {

  if (HasEntriesLinkedTo(e, lib))
    e.set(f, status1);
  else
    e.set(f, status2);
}