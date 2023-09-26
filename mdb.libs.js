function GetEntriesLinkedTo(e, lib) {
  return libByName(lib).linksTo(e);
}

function CountEntriesLinkedTo(e,lib) {
  return GetEntriesLinkedTo(e,lib).length;
}

function HasEntriesLinkedTo(e, lib) {
  return CountEntriesLinkedTo(e,lib) > 0;
}

function SetStatusByLinked(e, lib, f, status1, status2) {

  if (HasEntriesLinkedTo(e, lib))
    e.set(f, status1);
  else
    e.set(f, status2);
}

function OpenEntryInLib(q, d) {

  var lib = libByName(d);

  if (lib == null) {
    message("❌️ OpenEntryInLib ERROR 1: Cannot find library named " + d);
    return;
  }

  var ent = lib.find(q);

  if (ent.length == 0) {
    message("❌️ OpenEntryInLib ERROR 2: Cannot find entry " + q + " in library named " + d);
    return;

  }

  ent[0].show();

  

} // OpenEntryInLib