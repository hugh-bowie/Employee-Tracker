
////dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require("express");
require("dotenv").config();

////declarations
const app = express();
const PORT = 3001;

//use express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

////connect to mysql
const connection = mysql.createConnection({
		host: '127.0.0.1',
		port: '3306',
		user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
	)},
	console.log('Connected to the election database.')
);
////error handle connection
connection.connect(function (error) {
  if (error) {
    console.error("Cannot connect to server. Please try again");
    return;
  }
  let asciiArt = `
  
                                                                                                                                                              
                                                                                                                                                            
EEEEEEEEEEEEEEEEEEEEEE                                            lllllll                                                                                   
E::::::::::::::::::::E                                            l:::::l                                                                                   
E::::::::::::::::::::E                                            l:::::l                                                                                   
EE::::::EEEEEEEEE::::E                                            l:::::l                                                                                   
  E:::::E       EEEEEE   mmmmmmm    mmmmmmm   ppppp   ppppppppp    l::::l    ooooooooooo   yyyyyyy           yyyyyyy    eeeeeeeeeeee        eeeeeeeeeeee    
  E:::::E              mm:::::::m  m:::::::mm p::::ppp:::::::::p   l::::l  oo:::::::::::oo  y:::::y         y:::::y   ee::::::::::::ee    ee::::::::::::ee  
  E::::::EEEEEEEEEE   m::::::::::mm::::::::::mp:::::::::::::::::p  l::::l o:::::::::::::::o  y:::::y       y:::::y   e::::::eeeee:::::ee e::::::eeeee:::::ee
  E:::::::::::::::E   m::::::::::::::::::::::mpp::::::ppppp::::::p l::::l o:::::ooooo:::::o   y:::::y     y:::::y   e::::::e     e:::::ee::::::e     e:::::e
  E:::::::::::::::E   m:::::mmm::::::mmm:::::m p:::::p     p:::::p l::::l o::::o     o::::o    y:::::y   y:::::y    e:::::::eeeee::::::ee:::::::eeeee::::::e
  E::::::EEEEEEEEEE   m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o     y:::::y y:::::y     e:::::::::::::::::e e:::::::::::::::::e 
  E:::::E             m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o      y:::::y:::::y      e::::::eeeeeeeeeee  e::::::eeeeeeeeeee  
  E:::::E       EEEEEEm::::m   m::::m   m::::m p:::::p    p::::::p l::::l o::::o     o::::o       y:::::::::y       e:::::::e           e:::::::e           
EE::::::EEEEEEEE:::::Em::::m   m::::m   m::::m p:::::ppppp:::::::pl::::::lo:::::ooooo:::::o        y:::::::y        e::::::::e          e::::::::e          
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::::p l::::::lo:::::::::::::::o         y:::::y          e::::::::eeeeeeee   e::::::::eeeeeeee  
E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::pp  l::::::l oo:::::::::::oo         y:::::y            ee:::::::::::::e    ee:::::::::::::e  
EEEEEEEEEEEEEEEEEEEEEEmmmmmm   mmmmmm   mmmmmm p::::::pppppppp    llllllll   ooooooooooo          y:::::y               eeeeeeeeeeeeee      eeeeeeeeeeeeee  
                                               p:::::p                                           y:::::y                                                    
                                               p:::::p                                          y:::::y                                                     
                                              p:::::::p                                        y:::::y                                                      
                                              p:::::::p                                       y:::::y                                                       
                                              p:::::::p                                      yyyyyyy                                                        
                                              ppppppppp                                                                                                     
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
TTTTTTTTTTTTTTTTTTTTTTT                                                          kkkkkkkk                                                                   
T:::::::::::::::::::::T                                                          k::::::k                                                                   
T:::::::::::::::::::::T                                                          k::::::k                                                                   
T:::::TT:::::::TT:::::T                                                          k::::::k                                                                   
TTTTTT  T:::::T  TTTTTTrrrrr   rrrrrrrrr     aaaaaaaaaaaaa       cccccccccccccccc k:::::k    kkkkkkk    eeeeeeeeeeee    rrrrr   rrrrrrrrr                   
        T:::::T        r::::rrr:::::::::r    a::::::::::::a    cc:::::::::::::::c k:::::k   k:::::k   ee::::::::::::ee  r::::rrr:::::::::r                  
        T:::::T        r:::::::::::::::::r   aaaaaaaaa:::::a  c:::::::::::::::::c k:::::k  k:::::k   e::::::eeeee:::::eer:::::::::::::::::r                 
        T:::::T        rr::::::rrrrr::::::r           a::::a c:::::::cccccc:::::c k:::::k k:::::k   e::::::e     e:::::err::::::rrrrr::::::r                
        T:::::T         r:::::r     r:::::r    aaaaaaa:::::a c::::::c     ccccccc k::::::k:::::k    e:::::::eeeee::::::e r:::::r     r:::::r                
        T:::::T         r:::::r     rrrrrrr  aa::::::::::::a c:::::c              k:::::::::::k     e:::::::::::::::::e  r:::::r     rrrrrrr                
        T:::::T         r:::::r             a::::aaaa::::::a c:::::c              k:::::::::::k     e::::::eeeeeeeeeee   r:::::r                            
        T:::::T         r:::::r            a::::a    a:::::a c::::::c     ccccccc k::::::k:::::k    e:::::::e            r:::::r                            
      TT:::::::TT       r:::::r            a::::a    a:::::a c:::::::cccccc:::::ck::::::k k:::::k   e::::::::e           r:::::r                            
      T:::::::::T       r:::::r            a:::::aaaa::::::a  c:::::::::::::::::ck::::::k  k:::::k   e::::::::eeeeeeee   r:::::r                            
      T:::::::::T       r:::::r             a::::::::::aa:::a  cc:::::::::::::::ck::::::k   k:::::k   ee:::::::::::::e   r:::::r                            
      TTTTTTTTTTT       rrrrrrr              aaaaaaaaaa  aaaa    cccccccccccccccckkkkkkkk    kkkkkkk    eeeeeeeeeeeeee   rrrrrrr                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
                                                                                                                                                            
  `;
	console.log(asciiArt);
  	start();
});
