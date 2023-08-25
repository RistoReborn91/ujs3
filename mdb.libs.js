function GetEntriesLinkedTo(e, lib) {

  return libByName(lib).linksTo(e);

}

function CountEntriesLinkedTo(e,lib) {
  return GetEntriesLinkedTo(e,lib).length;
}

function HasEntriesLinkedTo(e, lib) {
  return CountEntriesLinked(e,lib) > 0;
}
