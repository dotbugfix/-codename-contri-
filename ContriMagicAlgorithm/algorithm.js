/*
 * Contri Magic Algorithm
 * v1.2
 * Author: Omkar Ekbote
 * Editors: *
 * What's new: Corrected give/take transactions label
 * Purpose: Improve display for analysis
 * To-Do: Improve transaction() and theEnd() functions
 *
 * 14/Jul/2012 03:14AM
*/



function initialize(){
	cash=new Array();	//Array of Participants' Cash
	var i;
	for(i=0;i<7;i++){
		cash[i]=parseInt(document.getElementById('p'+(i+1)).value);
	}
	
	transactions=new Array();	//2-D array of transactions
	numTransactions=new Array();	//No. of transactions for each participant
	for(i=0;i<7;i++){
		transactions[i]=new Array();	//1-D array for each participant
		numTransactions[i]=0;	//Init to 0 transactions for all participants
	}

	/*Prepare result for writing*/
	tableElement=document.createElement("table");
	tableElement.setAttribute('id', 'resultTable');
	tableElement.setAttribute('border', '1');
	tableElement.setAttribute('cellpadding', '5');
	document.getElementById("result").appendChild(tableElement);
}

function compute(){
	initialize();
	var i=0;
	/*Write the input set*/
	inputRow=document.createElement("tr");
	inputRow.setAttribute('id','inputRow');
	document.getElementById("resultTable").appendChild(inputRow);
	for(i=0;i<7;i++){
		cell=document.createElement("td");
		cell.setAttribute('id','cell'+i);
		document.getElementById("inputRow").appendChild(cell);
		document.getElementById('cell'+i).innerHTML="P"+(i+1)+" is "+cash[i];
	}

	i=0;	//We need a counter for the displays
	while(!theEnd()){
	/*Select Min/Max Participants for transaction*/
		receiver=getMin();
		giver=getMax();

	/*Write updated values*/
		valueRow=document.createElement("tr");
		valueRow.setAttribute('id','valueRow'+i);
		document.getElementById("resultTable").appendChild(valueRow);
		for(j=0;j<7;j++){
			cell=document.createElement("td");
			cell.setAttribute('id','cell'+(i*10)+j);
			if(j==receiver)
				cell.setAttribute('style','background-color:lightgreen;');
			else if(j==giver)
				cell.setAttribute('style','background-color:red;');
			document.getElementById("valueRow"+i).appendChild(cell);
			document.getElementById('cell'+(i*10)+j).innerHTML="P"+(j+1)+" is "+cash[j];
		}

	/*Write selected participants*/
		selectedRow=document.createElement("tr");
		selectedRow.setAttribute('id','selectedRow'+i);
		document.getElementById("resultTable").appendChild(selectedRow);
		cell=document.createElement("td");
		cell.setAttribute('id','selectedCell'+i);
		cell.setAttribute('colspan','7');
		document.getElementById("selectedRow"+i).appendChild(cell);
		document.getElementById('selectedCell'+i).innerHTML='Selected Min (P'+(receiver+1)+' = '+cash[receiver]+')'+', Max (P'+(giver+1)+' = '+cash[giver]+')';

	/*Compute transaction*/
		toGive=transaction(receiver,giver);
		cash[giver]-=toGive;
		cash[receiver]+=toGive;
		transactions[giver][numTransactions[giver]++]=toGive;
		transactions[receiver][numTransactions[receiver]++]=-(toGive);
	/*Write transaction*/
		transactionRow=document.createElement("tr");
		transactionRow.setAttribute('id','transactionRow'+i);
		document.getElementById("resultTable").appendChild(transactionRow);
		cell=document.createElement("td");
		cell.setAttribute('id','transactionCell'+i);
		cell.setAttribute('colspan','7');
		document.getElementById("transactionRow"+i).appendChild(cell);
		document.getElementById('transactionCell'+i).innerHTML='P'+(giver+1)+' gives to P'+(receiver+1)+' an amount of '+toGive;

	i++;	//Update the counter
	}
	

	finalize();
	
};

function getMin(){
	minIndex=0;
	for(i=0;i<7;i++){
		if(cash[i]<cash[minIndex])
			minIndex=i;
	}
	return(minIndex);
}

function getMax(){
	maxIndex=0;
	for(i=0;i<7;i++){
		if(cash[i]>cash[maxIndex])
			maxIndex=i;
	}
	return(maxIndex);
}

function transaction(receiver,giver){
	cashValue=cash[giver];	//Simply give all that you owe
	return(cashValue);
}

function theEnd(){
	for(i=0;i<7;i++){
		if(cash[i]!=0)	//Simply compute whether everyone's cash is 0 yet
			return 0;
	}
	return 1;
}

function finalize(){
	totalTransactions=0;
	for(i=0;i<7;i++){
		totalTransactions+=numTransactions[i];
	}
	totalTransactions=totalTransactions/2;
/*Write total no. of transactions*/
	document.getElementById("result").appendChild(document.createElement('br'));
	document.getElementById("result").appendChild(document.createTextNode("Total No. of Transactions = "+totalTransactions));
	document.getElementById("result").appendChild(document.createElement('br'));
	document.getElementById("result").appendChild(document.createElement('br'));

/*Create transactions table*/	
	tableElement=document.createElement("table");
	tableElement.setAttribute('id', 'transactionsTable');
	tableElement.setAttribute('border', '1');
	tableElement.setAttribute('cellpadding', '5');
	document.getElementById("result").appendChild(tableElement);
/*Write actual list of transactions for each giver*/
	for(i=0;i<7;i++){
		transactionRow=document.createElement("tr");
		transactionRow.setAttribute('id','transactionsRow'+i);
		document.getElementById("transactionsTable").appendChild(transactionRow);
		cell=document.createElement("td");
		cell.setAttribute('id','transactionsCell'+i);
		document.getElementById("transactionsRow"+i).appendChild(cell);
		document.getElementById('transactionsCell'+i).innerHTML='Transactions for P'+(i+1);
		for(j=0;j<numTransactions[i];j++){
			cell=document.createElement("td");
			cell.setAttribute('id','transactioncell'+(i*10)+j);
			document.getElementById("transactionsRow"+i).appendChild(cell);
			if(transactions[i][j]<0)
				document.getElementById('transactioncell'+(i*10)+j).innerHTML='takes '+Math.abs(transactions[i][j]);
			else
				document.getElementById('transactioncell'+(i*10)+j).innerHTML='gives '+transactions[i][j];
		}
	}
};