saveToLS = function(){	
	//inializzo i tool tip
	//$("#name").tooltip("destroy");
	//$("#surname").tooltip("destroy");
	//$("#email").tooltip("destroy");
	
	if(validateEmail($("#email").val()) && ( $("#name").val() != "" || $("#name").val() != "Enter your full name here") && $("#surname").val() != "" ){
		$('#error').css("display","none");
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
		alert("Contatto #" + matrix.length + " aggiunto: " + array[2] + " " + array[3] + ".\nE' possibile inserire un nuovo contatto.");
		//window.load();
		location.reload();
		return false;
	}else if ($("#name").val() == "" || $("#name").val() == "Enter your full name here"){
		//alert("Campo nome obbligatorio");
		//$('#name').tooltip({
        //items: "#name",
        //content: "Campo nome obbligatorio"
		//});
		//$('#name').tooltip("open");
		$('#errorMessage').html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Attenzione:</strong> Campo nome obbligatorio.</p>')
		$('#error').css("display","");
		return false;
	}else if ($("#surname").val() == ""){
		//alert("Campo cognome obbligatorio");
		//$('#surname').tooltip({
        //items: "#surname",
        //content: "Campo cognome obbligatorio"
		//});
		//$('#surname').tooltip("open");
		$('#errorMessage').html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Attenzione:</strong> Campo cognome obbligatorio.</p>')
		$('#error').css("display","");
		return false;
	}else if (!validateEmail($("#email").val())){
		//alert("Formato email errato");
		//$('#email').tooltip({
        //items: "#email",
        //content: "Formato email non valido"
		//});
		//$('#email').tooltip("open");
		$('#errorMessage').html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span><strong>Attenzione:</strong> Formato email non valido.</p>')
		$('#error').css("display","");
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
    var email = prompt("Inserire la mail a cui si desidera ricevere il DB", "account@mail.com");
    
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
	//se non c'è la mail va bene
	if (email == '') return true; 
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
