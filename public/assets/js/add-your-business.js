firebase.auth().useDeviceLanguage();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		//user authenticated
		document.getElementById('loaderanim').style.display = 'block';
		var userId = firebase.auth().currentUser.uid;
		firebase.database().ref('/businesscontact/' + userId + '/pnumber').once('value').then(function(snapshot) {
  			var reg = snapshot.val() || "na";
  			if (reg != "na"){
				//user has already registered
				window.location.pathname = "/dashboard";
			} else {
				window.location.pathname = "/business-registration";
			}
		});
	} else {
		//user not authenticated
		document.getElementById('loaderanim').style.display = 'none';
		console.log("sign-up failed");
	}
});

//When the signup form is submitted
document.getElementById('signlog').addEventListener('submit', submitSorm);
function submitSorm(e){
	e.preventDefault();

	document.getElementById('loaderanim').style.display = 'block';
	const email = document.getElementById('demo-email').value;
	const password = document.getElementById('demo-password').value;
	//Create New Account (Sign Up)
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(e){
		//catch signup errors
		console.log(e.code + " : " + e.message);
		alert(e.message);
	});
}