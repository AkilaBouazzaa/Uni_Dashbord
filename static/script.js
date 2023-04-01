loadData();
//bouton mode nuit 
const modebtn=document.querySelector(".mode-btn");

modebtn.addEventListener('click', () =>
{
	document.body.classList.toggle('dark-mode-vars');
	modebtn.querySelector('span:nth-child(1)').classList.toggle('active');
	modebtn.querySelector('span:nth-child(2)').classList.toggle('active');
})



function update_Bars(jsonData){	
	var labels = Object.values(jsonData).map(function(e) {
		return e.specialite;
	 });
	 
	 var data = Object.values(jsonData).map(function(e) {
		return e.nb_etu;
	 });
	
	
	new Chart(document.getElementById("bar-chart"), {
		type: 'bar',
		data: {
		 
		  labels: labels,
		  datasets: [
			{
			  label: "Students",
			  backgroundColor: ["#ff7782", "#41f1b6","#ffbb55",'#111e88','#7380ec','#15D6E4','#9c2780'],
			  //data: [2478,5267,734,784,433]
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
			text: ''
		  }
		}
	});
}

function update_Bars2(jsonData){	
	var labels = Object.values(jsonData).map(function(e) {
		return e.annee;
	 });
	 
	 var data = Object.values(jsonData).map(function(e) {
		return e.moy;
	 });
	
	
	new Chart(document.getElementById("bar-chart2"), {
		type: 'bar',
		data: {
		 
		  labels: labels,
		  datasets: [
			{
			  label: "Graduated s  tudents",
			  backgroundColor: ["#ff7782", "#41f1b6","#ffbb55"],
			  //data: [2478,5267,734,784,433]
			  data: data
			}
		  ]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,	
		  legend: { display: false },
		  title: {
			display: true,
			text: ''
		  }
		}
	});
}

function update_Bar3(jsonData){
	var labels = jsonData.years;
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}	
	var data = jsonData.datasets;
			
	new Chart(document.getElementById("bar-chart3"), {
			type: 'bar',
			data: {
				labels: labels,
				datasets: data
			},
			options: {
			  responsive: false,
			  maintainAspectRatio: true,
			  title: {
				display: false,
				text: 'number of F and M students per years'
			  }
			  
			}
	});


}

function update_Lines(jsonData){
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart"), {
		type: 'line',
		data: {
			
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'Number of students per Major'
			},
			legend:{
				position:'top'
			}
		}
	});
}

function update_Lines2(jsonData){
	var labels = jsonData.years;
	
	for(d of jsonData.datasets){
		d.fill = false;				  
		d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		d.borderWidth=2;
		d.radius=1;			
	}			
	
	var data = jsonData.datasets;

	new Chart(document.getElementById("line-chart2"), {
		type: 'line',
		data: {
			
			labels: labels,
			datasets: data
		},
		options: {						
			responsive: false,
			maintainAspectRatio: true,
			title: {
				display: false,
				text: 'Number of students from each sex'
			},
			legend:{
				position:'top'
			}
		}
	});
}


function update_Pie(jsonData){
	var labels = jsonData.map(function(e) {
	   return e.specialite;
	});
	
	var data = jsonData.map(function(e) {
	   return e.nb_etu;
	});
	
	new Chart(document.getElementById("pie-chart"), {
		type: 'pie', //'doughnut' si on veut un doughnut chart
		data: {
		  labels: labels,
		  datasets: [{
			label: " nombre des etudiant",
			backgroundColor: ["#ff7782", "#41f1b6","#ffbb55",'#111e88','#7380ec','#15D6E4','#9c2780'],
			data: data
			

		  }]
		},
		options: {
		  responsive: false,
		  maintainAspectRatio: true,
		  title: {
			display: false,
			text: 'le nombre des etudiants ayant la moyenne par annee'
		  },
		  legend:{
			position:'right'
		  }
		}
	});	
}
function update_doughnut(jsonData){
	var labels = jsonData.map(function(e) {
		return e.specialite;
	 });
	 
	 var data = jsonData.map(function(e) {
		return e.nb_etu;
	 });
	 
	 new Chart(document.getElementById("pie-chart"), {
		 type: 'doughnut',
		 data: {
		   labels: labels,
		   datasets: [{
			 label: " Number of students",
			 backgroundColor: ["#ff7782", "#41f1b6","#ffbb55",'#111e88','#7380ec','#15D6E4','#9c2780'],
			 data: data
			 
 
		   }]
		 },
		 options: {
		   responsive: false,
		   maintainAspectRatio: true,
		   title: {
			 display: false,
			 text: 'le nombre des etudiants ayant la moyenne par annee'
		   },
		   legend:{
			 position:'right'
		   }
		 }
	 });	
 }




function loadData(){	
	//requetes AJAX
	httpRequest = new XMLHttpRequest();	
	httpRequest.open('GET', '/api/data');
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			jsonData = JSON.parse(httpRequest.response);
			
		    update_cards(jsonData);			
		}
	};
	httpRequest.send();
	
	httpRequest2 = new XMLHttpRequest();	
	httpRequest2.open('GET', '/api/data2');
	httpRequest2.onreadystatechange = function () {
		if (httpRequest2.readyState === 4 && httpRequest2.status === 200) {
			jsonData2 = JSON.parse(httpRequest2.response);
			update_Lines(jsonData2);
			
		}
	};
	httpRequest2.send();
	
	httpRequest3 = new XMLHttpRequest();	
	httpRequest3.open('GET', '/api/data3');
	httpRequest3.onreadystatechange = function () {
		if (httpRequest3.readyState === 4 && httpRequest3.status === 200) {
			jsonData3 = JSON.parse(httpRequest3.response);
			update_Pie(jsonData3);
			update_Bars(jsonData3);
		}
	};
	httpRequest3.send();


	httpRequest4 = new XMLHttpRequest();	
	httpRequest4.open('GET', '/api/data4');
	httpRequest4.onreadystatechange = function () {
		if (httpRequest4.readyState === 4 && httpRequest4.status === 200) {
			jsonData4 = JSON.parse(httpRequest4.response);
			update_Bars2(jsonData4);
		}
	};
	httpRequest4.send();

	httpRequest5 = new XMLHttpRequest();	
	httpRequest5.open('GET', '/api/data5');
	httpRequest5.onreadystatechange = function () {
		if (httpRequest5.readyState === 4 && httpRequest5.status === 200) {
			jsonData5 = JSON.parse(httpRequest5.response);
			update_Lines2(jsonData5);
			update_Bar3(jsonData5);
			
			
			
			
			
		}
	};
	httpRequest5.send();
}
//Mise a jour des cartes des infos generales (general insights)
function update_cards(jsonData){	
	//var i=1;
	//for(d of jsonData){		
		insight = document.getElementById("insight1");	
		label = insight.getElementsByClassName("regionLabel")[0];
		pop = insight.getElementsByClassName("regionPop")[0];
		label.innerText = "Total Number";
		pop.innerText = jsonData[0][0]['nbrtotal'];



		insight2 = document.getElementById("insight2");	
		label2 = insight2.getElementsByClassName("regionLabel")[0];
		pop2 = insight2.getElementsByClassName("regionPop")[0];
		label2.innerText = "Female Students";
		pop2.innerText = jsonData[1][0]['f'];

		insight3 = document.getElementById("insight3");	
		label3 = insight3.getElementsByClassName("regionLabel")[0];
		pop3 = insight3.getElementsByClassName("regionPop")[0];
		label3.innerText = "Male Students";
		pop3.innerText = jsonData[2][0]['h'];

		insight4 = document.getElementById("insight4");	
		label4 = insight4.getElementsByClassName("regionLabel")[0];
		pop4 = insight4.getElementsByClassName("regionPop")[0];
		label4.innerText = "Graduated Students";
		pop4.innerText = jsonData[3][0]['m'];

	//}
}
