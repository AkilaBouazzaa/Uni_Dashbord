from flask import Flask, render_template, request
from flask import redirect, url_for
from flask import jsonify
import json



# Step_1
from flaskext.mysql import MySQL

app = Flask(__name__)
# Step_2
mysql = MySQL()

# Step_4
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'SQLAKILA111'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

# Step_3
mysql.init_app(app)


app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')
"""	
@app.route('/api/data')
def doGetData1():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	sql1="SELECT count(*) as nbrtotal FROM resultats"
	#sql2="SELECT count(*) as f FROM resultats WHERE sexe='F'"
	#sql3="SELECT count(*) as h FROM resultats WHERE sexe='H' "
	#req=[sql1,sql2,sql3]
	cursor.execute(sql1)	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data1=[]
	for result in data:
		json_data1.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data1)
	"""
	####################################################
@app.route('/api/data')
def doGetData():
	conn1 = mysql.connect()	
	cursor1 =conn1.cursor()	
	cursor1.execute("SELECT count(*) as nbrtotal FROM resultats")	

	data1 = cursor1.fetchall()	
	row_headers1=[x[0] for x in cursor1.description]
	cursor1.close()

	conn2 = mysql.connect()	
	cursor2 =conn2.cursor()	
	#sql2="SELECT count(*) as f FROM resultats WHERE sexe='F'"
	#sql3="SELECT count(*) as h FROM resultats WHERE sexe='H' "
	cursor2.execute("SELECT count(*) as f FROM resultats WHERE sexe='F'")	
	data2 = cursor2.fetchall()	
	row_headers2=[x[0] for x in cursor2.description]
	cursor2.close()

	conn3= mysql.connect() 
	cursor3 =conn3.cursor()
	cursor3.execute("SELECT count(*) as h FROM resultats WHERE sexe='H'")
	data3 = cursor3.fetchall()
	row_headers3=[x[0] for x in cursor3.description]
	cursor3.close()

	conn4= mysql.connect() 
	cursor4 =conn4.cursor()
	cursor4.execute("SELECT count(*) as m from resultats WHERE moyenne>=10")
	data4 = cursor4.fetchall()
	row_headers4=[x[0] for x in cursor4.description]
	cursor4.close()

	json_data1=[]
	for result in data1:
		json_data1.append(dict(zip(row_headers1,result)))


	json_data2=[]
	for result in data2:
		json_data2.append(dict(zip(row_headers2,result)))


	json_data3=[]
	
	for result in data3:
		json_data3.append(dict(zip(row_headers3,result)))		

	json_data4=[]
	for result in data4:
		json_data4.append(dict(zip(row_headers4,result)))			
		
	return jsonify(json_data1,json_data2,json_data3,json_data4)
		
	



@app.route('/api/data2')
def doGetData2():
	#Specialite par annee
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	maj_tuple = cursor.fetchall()
	maj_list =  [item[0] for item in maj_tuple]
	
	for specialite in maj_list:
		cursor.execute("SELECT COUNT(*) as nb_st FROM resultats WHERE specialite='"+specialite+"'GROUP BY annee")	
		nb_st_tuple = cursor.fetchall()
		nb_st_list =  [item[0] for item in nb_st_tuple]
		data["datasets"].append({"label":specialite, "data":nb_st_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

@app.route('/api/data3')
def doGetData3():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT specialite , count(nom) as nb_etu from resultats group by specialite ")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)



@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(nom) as moy from resultats where moyenne>=10 group by annee ")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)



@app.route('/api/data5')
def doGetData5():
	#Specialite par annee
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	s_tuple = cursor.fetchall()
	s_list =  [item[0] for item in s_tuple]
	
	for s in s_list:
		cursor.execute("SELECT COUNT(*) as nb FROM resultats WHERE sexe='"+s+"'GROUP BY annee")	
		nb_tuple = cursor.fetchall()
		nb_list =  [item[0] for item in nb_tuple]
		data["datasets"].append({"label":s, "data":nb_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 




if __name__ == '__main__':
	app.run(debug=True, port=5000)
	
	