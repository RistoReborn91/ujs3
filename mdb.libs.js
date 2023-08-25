function GetEntriesLinkedTo(e, lib) {

  return libByName(lib).linksTo(e);

}

function CountEntriesLinkedTo(e,lib) {
  return GetEntriesLinkedTo(e,lib).length;
}
