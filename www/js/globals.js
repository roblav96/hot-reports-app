//

var g_ip = "http://127.0.0.1:1337/"

function formatUname( fname, mname, lname, phone ) {
	var fname = fname.substr( 0, 1 )
	var mname = mname.substr( 0, 1 )
	var phone = phone.substr( phone.length - 4, phone.length )
	return ( fname + mname + lname + phone ).toLowerCase()
}


/**
	TODO:
	- decide wether users should be segregated by 'prop' or 'vend'
**/




//

