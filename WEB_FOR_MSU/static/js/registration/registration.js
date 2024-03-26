//'use strict';
//
//window.onload = function () {
//    var email = document.getElementsByClassName('email').value;
//	var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
//	var previous	= "";
//	for(i=0;i<maskedEmail.length;i++){
//		if (i<=1 || previous == "." || previous == "@"){
//			maskedEmail[i] = email[i];
//		}
//		previous = email[i];
//	}
//	return maskedEmail.join('');
//}
