saveToLS = function(){
	//$("#theform").validate({
    //    rules: {
    //       thefield: { digits:true, required: true }
    //    },
    //    tooltip_options: {
    //       thefield: { placement: 'left' }
    //    }
    // });
	if(validateEmail($("#email").val()) && ( $("#name").val() != "" || $("#name").val() != "Enter your full name") && $("#surname").val() != "" ){
	
		if (localStorage.matrix){
			matrix = JSON.parse(localStorage.matrix)
		}else{
			matrix = new Array;
		}
		array = new Array;
		
		currentdate = new Date();
		var date =  currentdate.getDate() + "/"
					+ (currentdate.getMonth()+1)  + "/" 
					+ currentdate.getFullYear() + " @ "  
					+ currentdate.getHours() + ":"  
					+ currentdate.getMinutes() + ":" 
					+ currentdate.getSeconds();
		
		array.push(matrix.length);
		array.push(date);
		array.push($("#name").val());
		array.push($("#surname").val());
		array.push($("#email").val());
		array.push($("#tel").val());
		array.push($("#modello").val());
		array.push($("#consenso").val());
		
		matrix.push(array);
		localStorage.matrix = JSON.stringify(matrix);
		alert("Contatto #" + matrix.length + " aggiunto: " + array[2] + " " + array[3] + ". \n E' possibile inserire un nuovo contatto.");
		//window.load();
		location.reload();
		return false;
	}else if ($("#name").val() == "" || $("#name").val() == "Enter your full name"){
		alert("Campo nome obbligatorio");
		return false;
	}else if ($("#surname").val() == ""){
		alert("Campo cognome obbligatorio");
		return false;
	}else if (!validateEmail($("#email").val())){
		alert("Formato email errato");
		return false;
	}
}


invia = function(){
	
	var email = dialogBox();
	
	if (email){
	
		var addresses = email.toString();
		var body = JSON.parse(localStorage.matrix);
		var subject = "Dati da inviare";
		var href = "mailto:" + addresses + "?"
			+ "subject=" + subject + "&"
			+ "body=" + body.join('%0D%0A');
		var wndMail;
		wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
		//if(wndMail)
		//{
		//	wndMail.close();    
		//}
	}
}

function dialogBox() {
    var email = prompt("Inserire la mail a cui si desidera ricevere il DB", "claudiacassan@autmercantile.it");
    
    if (email != null) {
		return email;
    }
	else{
		return null;	
	}
}

clear = function(){
	var r = confirm("Sei davvero sicuro di iniziare un nuovo DB? Se clicchi 'OK' il DB attuale verrà cancellato. Assicurati di aver già inviato il DB corrente.");
	if (r == true) {
		localStorage.removeItem("matrix");
		alert("DB Cancellato!!");
	} else {
		//alert("DB non cancellato");
		return false;
	}
}


$( document ).ready(function() {

	$( "#invia" ).click(function() {
		invia();
	});
	
	$( "#clear" ).click(function() {
		clear();
	});
	
	$( "#send" ).click(function() {
		saveToLS();
	});

})

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
