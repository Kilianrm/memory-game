//GLOBAL VARIABLES

raisedCards=0;
lastPair="";
lastId=-1;
timer=0;
attempts=0;

var interval = setInterval( incTimer, 1000);

//Increment the counter and update the document.
function incTimer(){
    timer += 1;
    document.getElementById("tiempo").innerHTML = timer
}


//randomly calculates the original position of the cards
function initial_cards(n) {
//Pre: n is multiple of 4

	//Create base vector ( 1,1,2,2,3,3,...n/2)
	let base = []
	for ( i = 1; i <= n/2 ; i++) { 
		base.push(i)
		base.push(i)
	}

	//Move each element to a random location
	for ( i = 1; i < n ; i++) { 


		random = Math.floor(Math.random() * n )
		//Swap
		aux = base[random];
		base[random] = base[i];
		base[i] = aux
	}

	// Arrange the cards given the order of the basis vector
	for ( i = 0; i < n/4 ; i++) {  // - > Recorre filas

      		document.getElementById(`f${0 + i*4}`).innerHTML += `<img src="./multimedia/jap${base[0 + i*4]}.svg" onclick="reveal_card(f${0 + i*4},${base[0 + i*4]} )" >`;
      		document.getElementById(`f${1 + i*4}`).innerHTML += `<img src="./multimedia/jap${base[1 + i*4]}.svg" onclick="reveal_card(f${1 + i*4},${base[1 + i*4]} )" >`;
      		document.getElementById(`f${2 + i*4}`).innerHTML += `<img src="./multimedia/jap${base[2 + i*4]}.svg" onclick="reveal_card(f${2 + i*4},${base[2 + i*4]} )" >`;
      		document.getElementById(`f${3 + i*4}`).innerHTML += `<img src="./multimedia/jap${base[3 + i*4]}.svg" onclick="reveal_card(f${3 + i*4},${base[3 + i*4]} )" >`;
	}
	console.log(document.getElementById("memoryGame"));


}

/* Revel the letter*/
function reveal_card(idCard,par) {
	if (raisedCards< 2 && !idCard.classList.contains("trobada") && lastId != idCard ) { 
		idCard.classList.remove("hidden");
		raisedCards++; 

  		if(raisedCards < 2) { // --> FIRST CARD
			lastPair=par;
			lastId=idCard;
  			setTimeout(hide_card, 1000, idCard);
  		}
  		else if (lastPair == par ){ // SECOND CARD AND RIGHT
  			idCard.classList.add("trobada");
  			lastId.classList.add("trobada");
  			raisedCards--;

  			//Indicamos que hemos acabado una tirada
  			attempts+=1;
  			document.getElementById("intentos").innerHTML = attempts

  		}
  		else {
  			setTimeout(hide_card, 1000, idCard); // --> SECOND CARD AND FAILED

			// Print run finished
			attempts+=1;
  			document.getElementById("intentos").innerHTML = attempts
  		}
	}
  
}

function hide_card(idCard) {
	if (!idCard.classList.contains("trobada") ) { 
		idCard.classList.add("hidden");
		lastPair="";
		lastId=-1;
	}
	raisedCards--; 
}

function restart() {
	location.reload();
}

