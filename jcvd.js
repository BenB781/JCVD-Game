var canvas;
var posFond;//position du fond
var posJCVD;//position de JCVD
var MG, MD;//position des mechants
var posEau;//position de la bouteille d'eau
var chocG;
var chocD;
var run;
var timer;
var kickG, kickD;//coup de pied activé true/false
var score;
var v;//vitesse des mechants
var vEau;//vitesse de a bouteille d'eau
var vie;//nombre de point de vie
var posVie1, posVie2, posVie3;//positions des points de vie
var start1;//true ou false, les méchants arrivent lorsque cette variable est sur "true"

function init()
{
	canvas = new graphics('toile');

	initJeu();

	//###############initialisation des collisions#####################
	chocD = new collision(imJCVD[1],imMechantD);	
	chocG = new collision(imJCVD[1],imMechantG);
	chocEau = new collision(imJCVD[1],imEau);
	//#################################################################

	i=1;//image de JCVD reglé sur 1(position statique) de base
	v=2;//initialisation de la vitesse (2 de base)
	vEau=0;//initialisation de la vitesse de la bouteille (0 de base)
	vie=3;//initialisation des points de vie (3 de base)
	run = true;	
	kickG = false;//          			coups
	kickD = false;//   			pas enclenchés de base
	score=0;//initialisation du score (O de base)
	start1=false;//les méchants n'arrivent pas dés le debut
	timer=setInterval(repeter,20);
}

function initJeu()
{
	initJCVD();
	initMechant();
	initEau();
	initFond();
}

function initJCVD()
{
	afficheJCVD();
}

function initMechant()
{
 MG={x:-130,y:canvas.height/1.56};//-20
 MD={x:870,y:canvas.height/1.56};//850
}

function reinitMechantG()
{
	MG={x:-130,y:canvas.height/1.56};//-20
	canvas.drawImage(imMechantG,MG);
}

function reinitEau()
{
	posEau={x:canvas.width/2,y:-40};
	canvas.drawImage(imEau,posEau);
	vEau=0;
}


function reinitMechantD()
{
 	MD={x:870,y:canvas.height/1.56};//850
	canvas.drawImage(imMechantD,MD);
}

function initEau()
{
	posEau={x:canvas.width/2,y:-40};
	vEau=0;
}

function initFond()
{
	posFond={x:0, y:0};
}

function deplaceMechant()
{
		MD.x = MD.x - v;
		MG.x = MG.x + v;
		if(chocD.detection(posJCVD,MD)==true & kickD==false)
			{
				vie=vie-1;
				reinitMechantD();
			}
		//if(chocD.detection(posJCVD,MD)==true & kickD==false & vie=1)run=false;
		if(chocD.detection(posJCVD,MD)==true & kickD==true)
			{
				score=score+1;
				reinitMechantD();
			}
		if(chocG.detection(posJCVD,MG)==true & kickG==false)
			{
				vie=vie-1;
				reinitMechantG();
			}
		//if(chocG.detection(posJCVD,MG)==true & kickG==false & vie=1)run=false;
		if(chocG.detection(posJCVD,MG)==true & kickG==true)
			{
				score=score+1;
				reinitMechantG();
			}
		if(vie==0)run=false;
}

function deplaceEau()
{
	posEau.y = posEau.y + vEau;
	if(chocEau.detection(posJCVD,posEau)==true)
	{
		vie=vie+1;
		reinitEau();
	}
}

function kick(event)
{
	if (event.keyCode==37)
	{	
		chocG = new collision(imJCVD[2],imMechantG);
		chocEau = new collision(imJCVD[2],imEau);
		kickG=true;
		kickD=false;
		i=2;
	} 
	if (event.keyCode==39)
	{
		chocD = new collision(imJCVD[3],imMechantD);
		chocEau = new collision(imJCVD[3],imEau);
		kickD=true;
		kickG=false;
		i=3;
	}  

	if (event.keyCode==13)
		{
			start1=true;
			afficheJeu();
		}
}
function nonKick(event)
{
	if (event.keyCode==37)
	{
		chocG = new collision(imJCVD[1],imMechantD);
		chocEau = new collision(imJCVD[1],imEau);
		kickG=false;
		i=1;
	} 
	if (event.keyCode==39)
	{
		chocD = new collision(imJCVD[1],imMechantD);
		chocEau = new collision(imJCVD[1],imEau);
		kickD=false;
		i=1;
	}  
}

function afficheJeu()
{
	afficheFond();
	afficheMechant();
	afficheEau();
	afficheVie();
	afficheScore();
	afficheJCVD();
	instruction();
}

function instruction()
{
	var instruction1={x:270,y:300};
	canvas.drawFillText("Appuyez sur 'entrée' pour commencer",instruction1,10,"blue");
}

function afficheFond()
{
	canvas.drawImage(imFond,posFond);
}

function afficheJCVD()
{
	posJCVD={x: canvas.width/2, y: canvas.height/1.6};
}

function afficheEau()
{
	canvas.drawImage(imEau,posEau);
}

function afficheScore()
{
	var posScore={x:50, y:35};
	canvas.drawFillText(score,posScore,40,"white");
}

function afficheVie()
{
	posVie1={x:150, y:7};
	canvas.drawImage(imVie,posVie1);
	posVie2={x:190, y:7};
	canvas.drawImage(imVie,posVie2);
	posVie3={x:230, y:7};
	canvas.drawImage(imVie,posVie3);
}


function afficheMechant()
{
	canvas.drawImage(imMechantG,MG);
	canvas.drawImage(imMechantD,MD);
}
function difficulte()
{
	if (score>10 && score<20)v=3;
	if (score==10)vEau=1.5;
	if (score>20 && score<30)v=3.5;
	if (score==20)vEau=1.5;
	if (score>30 && score<40)v=3.8;
	if (score==30)vEau=1.5;
	if (score>40 && score<50)v=4;
	if (score==40)vEau=1.5;
	if (score>50 && score<60)v=4.3;
	if (score==50)vEau=1.5;
	if (score>60 && score<70)v=4.5;
	if (score==60)vEau=1.5;
	if (score>70 && score<80)v=4.8;
	if (score==70)vEau=1.5;
	if (score>80 && score<90)v=5;
	if (score==80)vEau=1.5;
	if (score>90 && score<100)v=5.3;
	if (score==90)vEau=1.5;
	if (score>100 && score<110)v=5.5;
	if (score==100)vEau=1.5;
	if (score>110 && score<120)v=5.8;
	if (score==110)vEau=1.5;
	if (score>120 && score<130)v=6;
	if (score==120)vEau=1.5;
	if (score>130 && score<140)v=6.3;
	if (score==130)vEau=1.5;
	if (score>140 && score<150)v=6.5;
	if (score==140)vEau=1.5;
	if (score>150 && score<160)v=6.8;
	if (score==150)vEau=1.5;
	if (score>160 && score<170)v=7;
	if (score==160)vEau=1.5;

	

	
}

function repeter()
{
	//deplaceMechant();
	deplaceEau();
	afficheJeu();
	difficulte();

	if (start1==true)deplaceMechant();

	if (vie>3)vie=3;//les points de vie ne depassent pas 3

	if (run==false) 
	{
		var posExplosion;
		posExplosion={x:300,y:300};
		canvas.drawImage(imExplosion,posExplosion);
		posJCVD={x:1666,y:1666};
		canvas.drawImage(imJCVD[i],posJCVD);
		clearInterval(timer);
		var posFatality={x:270,y:300};
		canvas.drawImage(imFatality,posFatality);
		canvas.drawImage(imNoir,posVie1);
		canvas.drawImage(imVie1,posVie1);
		canvas.drawImage(imNoir,posVie2);
		canvas.drawImage(imVie1,posVie2);
		canvas.drawImage(imNoir,posVie3);
		canvas.drawImage(imVie1,posVie3);
	}
	var c={x:70,y:70};
	if(vie==2)
	{
		canvas.drawImage(imNoir,posVie3);
		canvas.drawImage(imVie1,posVie3);
	}
	if(vie==1)
	{
		canvas.drawImage(imNoir,posVie3);
		canvas.drawImage(imVie1,posVie3);
		canvas.drawImage(imNoir,posVie2);
		canvas.drawImage(imVie1,posVie2);
	}

	canvas.drawImage(imJCVD[i],posJCVD);
	console.log(start1);
	//console.log(kickD);
}