function GetEntriesLinkedTo(e, lib) {
  
  var xlib = libByName(lib);

    // If entries is not null, return its length; otherwise, return 0
    if (xlib != null) {
        return xlib.linksTo(e);
    } else {
        message("GetEntriesLinkedTo() ERROR 1 ⚠ " + lib + " may be an incorrect library reference.");
		return [];
    }
} // GetEntriesLinkedTo()




function CountEntriesLinkedTo(e, lib) {
    
    var entries = GetEntriesLinkedTo(e, lib);

    // If entries is not null, return its length; otherwise, return 0
    if (entries != null) {
        return entries.length;
    } else {
        return 0;
    }
} // CountEntriesLinkedTo()

function HasEntriesLinkedTo(e, lib) {
  return CountEntriesLinkedTo(e,lib) > 0;
}


function PrintLinkedFields(e, resultField, lib, xf, linebreak) {

  let linkedEntries = GetEntriesLinkedTo(e, lib)
  let result = "";
  let delim = "\n";
  
  if (!linebreak)
	  delim = ", ";
  
  for (let index in linkedEntries) {
    result += linkedEntries[index].field(xf);
	
	// add delimiter only if this is not the last entry
    if (index < linkedEntries.length - 1) 
      result += delim;
	
  } // for

  e.set(resultField, result.trim());

} // PrintLinkedFields() 





function SetStatusByLinked(e, lib, f, status1, status2) {

  if (HasEntriesLinkedTo(e, lib))
    e.set(f, status1);
  else
    e.set(f, status2);
}

function SetStatusByLinked2(e, lib, f, condition, status1, status2) {

  if (HasEntriesLinkedTo(e, lib) && condition == true)
    e.set(f, status1);
  else
    e.set(f, status2);
} // SetStatusByLinked2()



function OpenLib(n) {

	var lib2 = libByName(n);

	if (lib2 == null) 

		message("⚠️  Cannot find " + n);
	
	else {
	
		message("✅  Opening " + n);
	
	lib2.show();
	
	}

} // OpenLib()

function OpenLibFromField(e, f) {

  OpenLib(e.field(f)[0].name);


} // OpenLibFromField



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

function CalcSumOfLinked(e, destinationField, linkedDBName, linkedField) {


var links = libByName(linkedDBName).linksTo(e);

	var totalScore = 0;

//	for (var i = 0; i < links.length; i++) {
	for (var i in links)
   totalScore += links[i].field(linkedField);
	

// var avg = totalScore / links.length;
	  
	

e.set(destinationField, totalScore);
	
}


function LoadThumb(e, fields) { 
  
 var thumb;
 var found = false; 
 var phase = 0;
  
 for (var i in fields) {

  var f = e.field(fields[i]);
  // message(f);
 
   if (f.length > 0) {
     thumb = fields[i];
     found = true;
     phase = i;
     phase++;
  }   
 } 
  
  
  if (found) 
 e.set("Thumbnail", e.field(thumb)); 

 e.set("Sketch Phase", phase);
  
 }

function LoadIcon(e, srcLibFieldName) { // DEPRECATED

var srcLibFields = e.field(srcLibFieldName); 

if (srcLibFields.length > 0)
                e.set("Icon", srcLibFields[0].field("Icon"));
        else
                message("💢 LoadIcon ERROR 1: " + srcLibFieldName + " field does not have any entries!");
} // LoadIcon()




function LoadIconFromLib2(e, destFieldName, srcLibFieldName, extFieldName) {

var srcLibFields = e.field(srcLibFieldName); 



if (srcLibFields.length > 0)
                e.set(destFieldName, srcLibFields[0].field(extFieldName));
        else
                message("💢 LoadIcon ERROR 1: " + srcLibFieldName + " field does not have any entries!");
} // LoadIcon()




function LoadIconFromLib(e, srcLibFieldName, extFieldName) {

  LoadIconFromLib2(e, "Icon", srcLibFieldName, extFieldName)

} // LoadIconFromLib()


function PlaySongByField(e, f) {

var q = e.field(f);

i = intent("android.media.action.MEDIA_PLAY_FROM_SEARCH");

i.extra("query", q);

message("Playing " + q);

i.send();


} // PlaySongByField()


function InheritField(e, dest, libfield, src) {
	
	var sourcefield = e.field(libfield);
	var xlib = sourcefield[0];

	
	if (xlib == null) {
		message("mdb.libs.InheritField() ERROR 1 ⚠️ Could not find entries in \"" + libfield + "\" field");
		return;
	}
	
	if (xlib.field(src) == null) {
		message("mdb.libs.InheritField() ERROR 2 ⚠️ Could not find \"" + src + "\" field in library from the \"" + libfield + "\" field.");
		return;
	}
	
	if (e.field(dest) == null) {
		message("mdb.libs.InheritField() ERROR 3 ⚠️ Could not find \"" + dest + "\" field.");
		return;
	}
	
	
		e.set(dest, xlib.field(src));
		
	
} // InheritLibField()


